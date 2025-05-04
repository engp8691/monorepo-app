import { lazy } from 'react'

export const lazyWithDelay = (factory: () => Promise<any>, delay: number) => {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => {
        setTimeout(resolve, delay)
      }),
    ]).then(([moduleExports]) => moduleExports),
  )
}
