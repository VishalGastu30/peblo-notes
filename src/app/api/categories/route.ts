import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { notes: { where: { userId: session.user.id } } }
        }
      },
      orderBy: { name: 'asc' }
    })

    // Only return categories that are either global or created by this user
    // Assuming categories are global in this schema since there's no userId on Category,
    // but the counts are scoped to the user.
    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error('[GET_CATEGORIES_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
