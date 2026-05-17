import useSWRInfinite from 'swr/infinite'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export interface NoteFilters {
  search?: string
  tags?: string[]
  archived?: boolean
  sort?: 'updated' | 'created' | 'title'
}

export function useNotes(filters: NoteFilters) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.meta?.nextCursor) return null // Reached the end
    
    const params = new URLSearchParams()
    if (filters.search) params.append('search', filters.search)
    if (filters.tags?.length) params.append('tags', filters.tags.join(','))
    if (filters.archived !== undefined) params.append('archived', String(filters.archived))
    if (filters.sort) params.append('sort', filters.sort)
    if (previousPageData?.meta?.nextCursor) params.append('cursor', previousPageData.meta.nextCursor)
    params.append('limit', '50')

    return `/api/notes?${params.toString()}`
  }

  const { data, error, isLoading, isValidating, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false }
  )

  const notes = data ? data.flatMap(page => page.data) : []
  const hasMore = data?.[data.length - 1]?.meta?.nextCursor != null
  const isRefreshing = isValidating && data && data.length === size

  const loadMore = () => {
    if (hasMore) {
      setSize(size + 1)
    }
  }

  return { 
    notes, 
    error, 
    isLoading, 
    isRefreshing,
    hasMore, 
    loadMore, 
    mutate 
  }
}
