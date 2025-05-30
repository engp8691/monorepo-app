import { ActionDispatch, createContext, ReactNode, useCallback, useContext, useReducer, useState } from 'react'

export type ThemeContextType = {
    theme: string
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const values = useContext(ThemeContext)

    if (!values) {
        throw new Error('useTheme must be used with a provider')
    }

    return values
}

enum ACIONS {
    INCREASE = 'increase',
    DECREASE = 'decrease',
    RESET = 'reset'
}

type StateType = {
    count: number
    name: string
}

export const reducer = (initialState: StateType, action: { type: ACIONS, payload?: number }) => {
    switch (action.type) {
        case ACIONS.INCREASE:
            return { ...initialState, count: initialState.count + 1 }
        case ACIONS.DECREASE:
            return { ...initialState, count: initialState.count - 1 }
        case ACIONS.RESET:
            return { ...initialState, count: action.payload || 0 }
        default:
            throw new Error('Wrong Action')
    }
}

type ContextType = {
    state: StateType
    dispatch: ActionDispatch<[action: {
        type: ACIONS;
        payload?: number;
    }]>
}

export const CountContext = createContext<ContextType | undefined>(undefined)
export const CountProvider = ({ children }: { children: ReactNode }) => {
    const initialState: StateType = { count: 0, name: 'total students' }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (<CountContext.Provider value={{ state, dispatch }}>
        {children}
    </CountContext.Provider>)
}

export const useCountContext = ()=>{
    const value = useContext(CountContext)

    if(!value) {
        throw new Error('useCountContext need to be within CountProvider')
    }

    return value
}

type User = {
    name: string
    email: string
} | null

type AuthContextType = {
    user: User
    login: (user: { name: string; email: string }) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null)

    const login = (newUser: { name: string; email: string }) => {
        setUser(newUser)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
