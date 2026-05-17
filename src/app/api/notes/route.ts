import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getNotesQuerySchema, createNoteSchema } from "@/lib/validations"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams)
    
    const validated = getNotesQuerySchema.safeParse(query)
    if (!validated.success) {
      return NextResponse.json({ 
        error: { code: 'VALIDATION_ERROR', details: validated.error.flatten() } 
      }, { status: 422 })
    }

    const { search, tags, archived, sort, sortOrder, cursor, limit } = validated.data
    const tagIds = tags ? tags.split(',').filter(Boolean) : []
    const isArchived = archived === 'true'

    const orderBy = {
      updated: { updatedAt: sortOrder },
      created: { createdAt: sortOrder },
      title:   { title: sortOrder },
    }[sort]

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        isArchived,
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ]
        }),
        ...(tagIds.length > 0 && {
          tags: { some: { tagId: { in: tagIds } } }
        }),
      },
      include: {
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
        category: { select: { id: true, name: true } },
      },
      orderBy,
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    })

    const hasMore = notes.length > limit
    const items = hasMore ? notes.slice(0, -1) : notes

    // Map to a consistent presentation shape
    const formattedItems = items.map(note => {
      const cleanContent = note.content ? note.content.replace(/<[^>]*>?/gm, '') : ''
      const wordCount = cleanContent.split(/\s+/).filter(Boolean).length

      return {
        id: note.id,
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
        createdAt: note.createdAt,
        isArchived: note.isArchived,
        isPublic: note.isPublic,
        shareId: note.shareId,
        readTime: Math.max(1, Math.ceil(wordCount / 200)),
        tags: note.tags.map(t => t.tag),
        category: note.category,
      }
    })

    return NextResponse.json({
      data: formattedItems,
      meta: {
        nextCursor: hasMore ? items[items.length - 1].id : null,
        total: formattedItems.length,
      }
    })
  } catch (error) {
    console.error('[GET_NOTES_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const validated = createNoteSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json({ 
        error: { code: 'VALIDATION_ERROR', details: validated.error.flatten() } 
      }, { status: 422 })
    }

    const { title, categoryId, tagIds } = validated.data

    const note = await prisma.note.create({
      data: {
        userId: session.user.id,
        title: title || 'Untitled Note',
        content: '',
        categoryId,
        ...(tagIds && tagIds.length > 0 && {
          tags: {
            create: tagIds.map(tagId => ({ tagId }))
          }
        })
      },
      include: {
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
        category: { select: { id: true, name: true } },
      }
    })

    // Upsert DailyActivity
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
        notesCreated: { increment: 1 }
      },
      create: {
        userId: session.user.id,
        date: today,
        notesCreated: 1,
        notesEdited: 0,
        aiActions: 0
      }
    })

    const formattedNote = {
      id: note.id,
      title: note.title,
      content: note.content,
      updatedAt: note.updatedAt,
      createdAt: note.createdAt,
      isArchived: note.isArchived,
      isPublic: note.isPublic,
      shareId: note.shareId,
      readTime: 1,
      tags: note.tags.map(t => t.tag),
      category: note.category,
    }

    return NextResponse.json({ data: formattedNote }, { status: 201 })
  } catch (error) {
    console.error('[POST_NOTES_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
