import { createContext, ReactNode, useContext, useReducer } from 'react'

export type State = {
  name: string
  count: number
}

export enum TYPES {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SETNAME = 'SETNAME'
}

export type Action = { type: TYPES, payload?: { name: string, count: number } }

export type StoreContextType = {
  state: State;
  dispatch: React.ActionDispatch<[action: Action]> 
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 }
    case 'DECREASE':
      return { ...state, count: state.count - 1 }
    case 'SETNAME':
      if(action.payload) {
        return { ...state, name: action.payload.name, count: action.payload.count }
      }
      throw new Error('Setname without a payload')
    default:
      throw new Error('Wrong action')
  }
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = { count: 0, name: 'Initial Name' }
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const value = useContext(StoreContext)

  if (!value) {
    throw new Error('useStore must be within the provider')
  }

  return value
}