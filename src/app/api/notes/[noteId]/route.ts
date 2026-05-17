import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { updateNoteSchema } from "@/lib/validations"

export async function GET(
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
      where: {
        id: noteId,
      },
      include: {
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
        category: { select: { id: true, name: true } },
        aiActions: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!note || note.userId !== session.user.id) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Note not found' } }, { status: 404 })
    }

    // Strip HTML to count words
    const cleanContent = note.content ? note.content.replace(/<[^>]*>?/gm, '') : ''
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length

    const formattedNote = {
      ...note,
      tags: note.tags.map(t => t.tag),
      readTime: Math.max(1, Math.ceil(wordCount / 200)),
    }

    return NextResponse.json({ data: formattedNote })
  } catch (error) {
    console.error('[GET_NOTE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> }
) {
  try {
    const { noteId } = await params;
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    // Verify ownership first
    const existingNote = await prisma.note.findUnique({
      where: { id: noteId }
    })

    if (!existingNote || existingNote.userId !== session.user.id) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Note not found' } }, { status: 404 })
    }

    const body = await request.json().catch(() => ({}))
    const validated = updateNoteSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json({ 
         error: { code: 'VALIDATION_ERROR', details: validated.error.flatten() } 
      }, { status: 422 })
    }

    const { title, content, tagIds, categoryId, isArchived } = validated.data

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (categoryId !== undefined) updateData.categoryId = categoryId
    if (isArchived !== undefined) updateData.isArchived = isArchived

    if (tagIds !== undefined) {
      updateData.tags = {
        deleteMany: {}, // Clear existing
        create: tagIds.map(tagId => ({ tagId }))
      }
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: updateData,
      include: {
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
        category: { select: { id: true, name: true } },
      }
    })

    // Upsert DailyActivity if content changed
    if (content !== undefined) {
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
          notesEdited: { increment: 1 }
        },
        create: {
          userId: session.user.id,
          date: today,
          notesCreated: 0,
          notesEdited: 1,
          aiActions: 0
        }
      })
    }

    const cleanContent = updatedNote.content ? updatedNote.content.replace(/<[^>]*>?/gm, '') : ''
    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length

    const formattedNote = {
      ...updatedNote,
      tags: updatedNote.tags.map(t => t.tag),
      readTime: Math.max(1, Math.ceil(wordCount / 200)),
    }

    return NextResponse.json({ data: formattedNote })
  } catch (error) {
    console.error('[PATCH_NOTE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}

export async function DELETE(
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

    if (!note.isArchived) {
      return NextResponse.json({ 
        error: { code: 'FORBIDDEN', message: 'Can only delete archived notes' } 
      }, { status: 403 })
    }

    await prisma.note.delete({
      where: { id: noteId }
    })

    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    console.error('[DELETE_NOTE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
