import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

export type ThemeContextType = {
    theme: string
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({children} : { children: ReactNode}) =>  {
    const [theme, setTheme] = useState('light')

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }, [])


    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const values = useContext(ThemeContext)

    if(!values) {
        throw new Error('useTheme must be used with a provider')
    }

    return values
}
