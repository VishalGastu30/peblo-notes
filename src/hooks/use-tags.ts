import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export interface Tag {
  id: string
  name: string
  color: string
  _count?: { notes: number }
}

export function useTags() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/tags',
    fetcher,
    { revalidateOnFocus: false }
  )

  const tags: Tag[] = data?.data || []

  return { tags, error, isLoading, mutate }
}
