import { useCallback, useEffect, useRef, useState } from 'react'
import * as _ from 'lodash'

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

  const fetchData = useCallback(() => {
    setIsFetching(false)
    setError(null)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Http error ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isFetching, error, refetch: fetchData }
}

export type Reducer = <S, A>(state: S, action: A) => S

export const useMyReducer = <S, A>(reducer: Reducer, initialState: S) => {
  const [state, setState] = useState(initialState)

  const dispatch = useCallback(
    (action: A) => {
      setState((prevState) => reducer(prevState, action))
    },
    [reducer],
  )

  return [state, dispatch]
}

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useCustomEffect = (
  callback: () => void | (() => void),
  deps: unknown[],
) => {
  const prevDeps = useRef<unknown[]>(deps)

  useEffect(() => {
    if (!_.isEqual(prevDeps.current, deps)) {
      const cleanup = callback()
      prevDeps.current = _.cloneDeep(deps)
      return cleanup
    }
  }, [callback, deps])
}

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
