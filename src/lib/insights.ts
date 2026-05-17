import { prisma } from "@/lib/prisma"

export function buildWeeklySummary(notesThisWeek: number, trend: number): string {
  let summary = `You've created ${notesThisWeek} notes this week`;
  if (trend > 0) summary += `, a ${trend}% increase from last week.`;
  else if (trend < 0) summary += `. You were slightly more active last week.`;
  else summary += `, maintaining your pace from last week.`;
  return summary;
}
export async function getUserInsights(userId: string) {
  const now = new Date()
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(now.getDate() - 30)

  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 7)

  const fourteenDaysAgo = new Date(now)
  fourteenDaysAgo.setDate(now.getDate() - 14)

  const [
    totalNotes,
    archivedNotes,
    publicNotes,
    aiActionsList,
    mostUsedTagsRaw,
    recentlyEditedNotes,
    dailyActivityLast30Days,
    dailyActivityLast7Days,
    dailyActivityPrev7Days,
    activeNotes,
  ] = await Promise.all([
    // Total active notes
    prisma.note.count({ where: { userId, isArchived: false } }),
    
    // Archived notes
    prisma.note.count({ where: { userId, isArchived: true } }),
    
    // Public notes
    prisma.note.count({ where: { userId, isPublic: true } }),
    
    // AI Actions count grouped by type
    prisma.aiAction.groupBy({
      by: ['type'],
      where: { note: { userId } },
      _count: { type: true }
    }),
    
    // Most used tags
    prisma.tag.findMany({
      where: { notes: { some: { note: { userId } } } },
      include: {
        _count: {
          select: { notes: true }
        }
      },
      orderBy: {
        notes: {
          _count: 'desc'
        }
      },
      take: 10
    }),
    
    // Recently edited notes with AI actions
    prisma.note.findMany({
      where: { 
        userId,
        aiActions: { some: {} }
      },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        updatedAt: true,
      }
    }),
    
    // Last 30 days activity
    prisma.dailyActivity.findMany({
      where: { 
        userId,
        date: { gte: thirtyDaysAgo }
      },
      orderBy: { date: 'asc' }
    }),

    // Last 7 days activity
    prisma.dailyActivity.findMany({
      where: { 
        userId,
        date: { gte: sevenDaysAgo }
      }
    }),

    // Previous 7 days activity (for trend)
    prisma.dailyActivity.findMany({
      where: { 
        userId,
        date: { gte: fourteenDaysAgo, lt: sevenDaysAgo }
      }
    }),

    // Get active notes to calculate word count
    prisma.note.findMany({
      where: { userId, isArchived: false },
      select: { content: true }
    })
  ])

  // Process AI Breakdown
  const aiBreakdown = {
    summaries: aiActionsList.find(a => a.type === 'SUMMARY')?._count.type || 0,
    actionItems: aiActionsList.find(a => a.type === 'ACTION_ITEMS')?._count.type || 0,
    titles: aiActionsList.find(a => a.type === 'TITLE_SUGGESTION')?._count.type || 0,
  }
  const totalAiActions = aiBreakdown.summaries + aiBreakdown.actionItems + aiBreakdown.titles

  // Process Most Used Tags
  const mostUsedTags = mostUsedTagsRaw.map(t => ({
    name: t.name,
    color: t.color,
    count: t._count.notes
  }))

  // Process Weekly Activity
  const notesThisWeek = dailyActivityLast7Days.reduce((sum, d) => sum + d.notesCreated, 0)
  const notesPrevWeek = dailyActivityPrev7Days.reduce((sum, d) => sum + d.notesCreated, 0)
  const trend = (notesPrevWeek === 0 && notesThisWeek === 0) ? 0 : notesPrevWeek === 0 ? 100 : Math.round(((notesThisWeek - notesPrevWeek) / notesPrevWeek) * 100)
  
  const aiActionsThisWeek = dailyActivityLast7Days.reduce((sum, d) => sum + d.aiActions, 0)
  
  // Calculate average words from active notes
  const totalWords = activeNotes.reduce((sum, note) => {
    const cleanContent = note.content ? note.content.replace(/<[^>]*>?/gm, '') : ''
    return sum + cleanContent.split(/\s+/).filter(Boolean).length
  }, 0)
  const avgNoteLength = activeNotes.length > 0 ? Math.round(totalWords / activeNotes.length) : 0

  let mostProductiveDayStr = "No activity yet"
  if (dailyActivityLast7Days.length > 0) {
    const mostProductive = [...dailyActivityLast7Days].sort((a, b) => b.notesEdited - a.notesEdited)[0]
    if (mostProductive && mostProductive.notesEdited > 0) {
      mostProductiveDayStr = mostProductive.date.toLocaleDateString('en-US', { weekday: 'long' })
    }
  }

  // Generate an AI-like summary string
  let summary = buildWeeklySummary(notesThisWeek, trend)

  // Process Activity Trend (fill missing days with 0)
  const activityTrend = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    d.setHours(0, 0, 0, 0)
    
    const record = dailyActivityLast30Days.find(r => new Date(r.date).getTime() === d.getTime())
    
    activityTrend.push({
      date: d.toISOString().split('T')[0],
      notesCreated: record?.notesCreated || 0,
      notesEdited: record?.notesEdited || 0,
      aiActions: record?.aiActions || 0
    })
  }

  return {
    totalNotes,
    archivedNotes,
    publicNotes,
    totalAiActions,
    aiBreakdown,
    mostUsedTags,
    recentlyEdited: recentlyEditedNotes,
    weeklyActivity: {
      summary,
      notesThisWeek,
      aiActionsThisWeek,
      avgNoteLength,
      mostProductiveDay: mostProductiveDayStr,
      trend
    },
    activityTrend
  }
}
