import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
})

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const body = await request.json()
    const validated = updateProfileSchema.safeParse(body)
    
    if (!validated.success) {
      return NextResponse.json({ 
        error: { code: 'VALIDATION_ERROR', details: validated.error.flatten() } 
      }, { status: 422 })
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: validated.data,
      select: { id: true, name: true, email: true, image: true }
    })

    return NextResponse.json({ data: user })
  } catch (error) {
    console.error('[UPDATE_PROFILE_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
