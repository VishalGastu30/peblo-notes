import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { generateShareId, buildShareUrl } from "@/lib/share"
import { z } from "zod"

const shareNoteSchema = z.object({
  isPublic: z.boolean()
})

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

    const note = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!note || note.userId !== session.user.id) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Note not found' } }, { status: 404 })
    }

    const body = await request.json().catch(() => ({}))
    const validated = shareNoteSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json({ 
        error: { code: 'VALIDATION_ERROR', details: validated.error.flatten() } 
      }, { status: 422 })
    }

    const { isPublic } = validated.data
    
    // Generate shareId if making public for the first time
    const shareId = (isPublic && !note.shareId) ? generateShareId() : note.shareId;

    await prisma.note.update({
      where: { id: noteId },
      data: { 
        isPublic,
        shareId
      }
    })

    return NextResponse.json({ 
      data: { 
        isPublic, 
        shareId,
        shareUrl: shareId ? buildShareUrl(shareId) : null 
      } 
    })
  } catch (error) {
    console.error('[SHARE_NOTE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
