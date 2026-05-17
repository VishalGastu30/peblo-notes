import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useInsights() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/insights',
    fetcher,
    { 
      revalidateOnFocus: false,
      dedupingInterval: 5 * 60 * 1000 // 5 minutes
    }
  )

  return {
    insights: data?.data,
    isLoading,
    error,
    mutate
  }
}
