import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
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
    setIsFetching(true)
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
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}

export const useEvent = <T extends (...args: any[]) => any>(fn: T): T => {
  const ref = useRef(fn)

  // Always update the ref to the latest function
  ref.current = fn

  // Return a stable function that always calls the latest version of `fn`
  return useCallback(((...args) => ref.current(...args)) as T, [])
}

export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
}: {
  items: T[]
  itemHeight: number
  containerHeight: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleCount = useMemo(
    () => Math.ceil(containerHeight / itemHeight),
    [containerHeight, itemHeight],
  )
  const [startOffset, setStartOffset] = useState(0)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0
      const newStartIndex = Math.floor(scrollTop / itemHeight)
      setStartIndex(newStartIndex)
      setStartOffset(newStartIndex * itemHeight)
    }

    const container = containerRef.current
    container?.addEventListener('scroll', onScroll)

    return () => container?.removeEventListener('scroll', onScroll)
  }, [itemHeight])

  // const endIndex = Math.min(startIndex + visibleCount.current + 1, items.length)
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length)
  const visibleItems = items.slice(startIndex, endIndex)

  return {
    containerRef,
    totalHeight: items.length * itemHeight,
    visibleItems,
    offsetY: startOffset,
  }
}

export function useViewportSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// function type alias
type PostRequest<D, R> = (
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<R>>

export function useCancellableAxiosPost<D, R>() {
  const controllerRef = useRef<AbortController | null>(null)

  const post: PostRequest<D, R> = useCallback(async (url, data, config) => {
    // Cancel any previous request
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    // Create a new controller
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const response = await axios.post<R>(url, data, {
        ...config,
        signal: controller.signal,
      })

      return response
    } catch (err) {
      const error = err as Error
      if (error.name === 'CanceledError') {
        console.warn('Request canceled')
      }
      throw error
    }
  }, [])

  const cancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
      controllerRef.current = null
    }
  }

  return { post, cancel }
}

type Validator<V> = (value: V) => true | string
type Validators<T> = { [K in keyof T]: Validator<T[K]> }

export function useForm<T>(params: {
  initialValues: T
  validators: Validators<T>
}) {
  const { initialValues, validators } = params

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    const result = validators[key](value)
    setErrors((prev) => ({
      ...prev,
      [key]: result === true ? undefined : result,
    }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}

    for (const key in validators) {
      const result = validators[key](values[key])
      if (result !== true) {
        newErrors[key] = result
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    values,
    errors,
    handleChange,
    validate,
  }
}

/////

export const useThrottleSet = <T>(
  setFn: Dispatch<SetStateAction<T>>,
  delay: number,
) => {
  const lastCallRef = useRef(0)

  return (value: T) => {
    const currentTime = Date.now()
    if (currentTime - lastCallRef.current > delay) {
      setFn(value)
      lastCallRef.current = currentTime
    }
  }
}
