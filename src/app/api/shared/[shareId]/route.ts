import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params;
    const note = await prisma.note.findUnique({
      where: { shareId },
      include: {
        user: { select: { name: true } },
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
      }
    })

    if (!note || !note.isPublic) {
      return NextResponse.json({ error: { code: 'NOT_FOUND', message: 'Note not found' } }, { status: 404 })
    }

    // Safe subset only
    const formattedNote = {
      title: note.title,
      content: note.content,
      authorName: note.user.name ? note.user.name.split(' ')[0] : 'Someone', // First name only
      updatedAt: note.updatedAt,
      readTime: Math.max(1, Math.ceil((note.content?.split(' ').length || 0) / 200)),
      tags: note.tags.map(t => t.tag)
    }

    return NextResponse.json({ data: formattedNote })
  } catch (error) {
    console.error('[GET_SHARED_NOTE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
