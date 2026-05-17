import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { suggestTitle } from "@/lib/ai"
import { checkAiRateLimit, RateLimitError } from "@/lib/rate-limit"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await params;
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    try {
      await checkAiRateLimit(session.user.id);
    } catch (e) {
      if (e instanceof RateLimitError) {
        return NextResponse.json({ error: { code: 'TOO_MANY_REQUESTS', message: e.message } }, { status: 429 })
      }
      throw e;
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!note || note.userId !== session.user.id) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Note not found' } }, { status: 404 })
    }

    try {
      const { suggestedTitle, alternatives, tokensUsed } = await suggestTitle(note.content || '');
      
      const aiAction = await prisma.aiAction.create({
        data: {
          noteId: note.id,
          type: 'TITLE_SUGGESTION',
          outputResult: JSON.stringify({ suggestedTitle, alternatives }),
          modelUsed: 'llama3-8b-8192',
          tokenCount: tokensUsed,
        }
      })



      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      await prisma.dailyActivity.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: today
          }
        },
        update: {
          aiActions: { increment: 1 },
        },
        create: {
          userId: session.user.id,
          date: today,
          notesCreated: 0,
          notesEdited: 0,
          aiActions: 1
        }
      })

      return NextResponse.json({ 
        data: { 
          suggestedTitle,
          alternatives,
          tokensUsed, 
          actionId: aiAction.id 
        } 
      })
    } catch (error: any) {
      if (error.message && error.message.includes('Note is too short')) {
        return NextResponse.json({ error: { code: 'BAD_REQUEST', message: error.message } }, { status: 400 })
      }
      throw error;
    }

  } catch (error) {
    console.error('[SUGGEST_TITLE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
