import { Button } from '@chakra-ui/react'
import React, {
  createContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'

type MyContextType = {
  a: number
  b: number
  setB: React.Dispatch<React.SetStateAction<number>>
}

const MyContext = createContext<MyContextType | null>(null)

let currentValue: MyContextType
const subscribers = new Set<() => void>()

function notify() {
  for (const fn of subscribers) fn()
}

function useContextSelector<T>(selector: (ctx: MyContextType) => T): T {
  const subscribe = (callback: () => void) => {
    subscribers.add(callback)
    return () => subscribers.delete(callback)
  }

  return useSyncExternalStore(subscribe, () => selector(currentValue))
}

const A = React.memo(function A() {
  const a = useContextSelector((ctx) => ctx.a)
  console.log('A rendered')

  return <div>Value of A: {a}</div>
})

const B = React.memo(() => {
  const b = useContextSelector((ctx) => ctx.b)
  const setB = useContextSelector((ctx) => ctx.setB)
  console.log('B rendered')
  
  return (
    <div>
      <div>Value of B: {b}</div>
      <Button onClick={() => setB((prev) => prev + 1)}>Increment B</Button>
    </div>
  )
})

export const SelectorContextDemo = () => {
  const [a, setA] = useState(1)
  const [b, setB] = useState(1)

  const contextValue = useMemo(() => {
    const val: MyContextType = { a, b, setB }
    currentValue = val
    notify()
    return val
  }, [a, b])

  return (
    <MyContext.Provider value={contextValue}>
      <A />
      <B />
      <Button onClick={() => setA((prev) => prev + 1)}>Increment A</Button>
    </MyContext.Provider>
  )
}

