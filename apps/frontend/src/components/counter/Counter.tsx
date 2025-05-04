import { FC, useRef, useState } from 'react'
import { StoreProvider, useStore, Action, TYPES } from '../../context/store'
import { usePrevious } from '../../hooks'

import styles from './Counter.module.css'

export const Display: React.FC = () => {
  const { state } = useStore()
  const prevState = usePrevious(state)

  return (
    <div>
      <div className={styles.ageDisplay}>{state.name} has value {state.count}</div>
      <div className={styles.ageDisplay}>Its prevValue is {prevState?.name} and {prevState?.count} </div>
    </div>
  )
}

export const Controller: React.FC<Action> = ({ type, payload }) => {
  const { dispatch } = useStore()

  return (
    <button className={styles.button} onClick={(e) => dispatch({ type, payload } as Action)}>{type}</button>
  )
}


export const ControlledComponent: FC = () => {
  const [value, setValue] = useState('')

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />)
}

export const UnControlledComponent: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <input
      type="text"
      ref={inputRef}
    />)
}

export const Counter: React.FC = () => {
  return (
      <StoreProvider>
        <div className={styles.container}>
          <Display />
          <div className={styles.buttonGroup}>
            <Controller type={TYPES.DECREASE} />
            <Controller type={TYPES.INCREASE} />
            <Controller type={TYPES.SETNAME} payload={{ name: 'Age', count: 21 }} />
          </div>
        </div>
      </StoreProvider>
  )
}

