import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const tags = await prisma.tag.findMany({
      where: {
        notes: { some: { note: { userId: session.user.id } } }
      },
      include: {
        _count: {
          select: { notes: true }
        }
      },
      orderBy: {
        notes: { _count: 'desc' }
      }
    })

    return NextResponse.json({ data: tags })
  } catch (error) {
    console.error('[GET_TAGS_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
