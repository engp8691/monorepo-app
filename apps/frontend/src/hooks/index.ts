import { useCallback, useEffect, useState } from 'react'

export type QueryResult<T> = {
    data: T | null
    isFetching: boolean
    error: Error | null
    refetch: () => void
}

export const useQuery = <T>(url: string): QueryResult<T> => {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = useCallback(()=>{
        setIsFetching(false)
        setError(null)

        fetch(url).then((response)=>{
            if(!response.ok) {
                throw new Error(`Http error ${response.statusText}`)
            }
            return response.json()
        }).then((data) => {
            setData(data)
        }).catch(err => {
            setError(err)
        }).finally(()=>{
            setIsFetching(false)
        })

    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, isFetching, error, refetch: fetchData }
}
