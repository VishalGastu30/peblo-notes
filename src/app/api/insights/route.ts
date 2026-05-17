import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { getUserInsights } from "@/lib/insights"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
    }

    const insights = await getUserInsights(session.user.id)

    return NextResponse.json({ data: insights })
  } catch (error) {
    console.error('[GET_INSIGHTS_ERROR]', error)
    return NextResponse.json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } }, { status: 500 })
  }
}
