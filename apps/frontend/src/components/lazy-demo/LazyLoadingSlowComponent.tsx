import { Suspense, useState } from 'react'
import { Spinner, Center } from '@chakra-ui/react'
import { lazyWithDelay } from '../../utils/lazyWithDelay'

import styles from '../counter/Counter.module.css'

export const LoadingSpinner = () => {
  return (
    <Center h="50vh">
      <Spinner size="xl" color="teal.500" thickness="4px" speed="0.65s" />
    </Center>
  )
}

const LazySlowComponent = lazyWithDelay(() => import('./SlowComponent'), 3000)

const LazyLoadingSlowComponent = () => {
  const [state, setState] = useState<string | undefined>()

  return (
    <div className={styles.container}>
      <h1>Demo: Suspense + Lazy</h1>
      <h2>Click the button after 5 seconds and you can find LazySlowComponent suspended previously</h2>
      {state && <Suspense fallback={<LoadingSpinner />}><LazySlowComponent /></Suspense>}
      {!state && <button className={styles.button} onClick={() => setState('show_LazySlowComponent')} >Show it</button>}
    </div>
  )
}

export default LazyLoadingSlowComponent
