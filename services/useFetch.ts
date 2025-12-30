import { useEffect, useState } from 'react'

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await fetchFunction()
      setData(result)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [])

  return { data, error, loading: isLoading, refetch: fetchData, reset }
}

export default useFetch
