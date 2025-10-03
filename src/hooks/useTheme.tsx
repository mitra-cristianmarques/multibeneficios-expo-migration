import { ThemeProvider as NavThemeProvider } from '@react-navigation/native'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { defaultDarkTheme, defaultLightTheme } from '../domain/constants/Theme'
import CustomAppTheme from '../domain/models/theme/CustomAppTheme'

// 2. Create the Theme Context
const ThemeContext = createContext<{
  theme: CustomAppTheme
  isDark: boolean
  toggleTheme: () => void
  changeTheme: (lightTheme?: CustomAppTheme, darkTheme?: CustomAppTheme) => void
}>({
  theme: defaultLightTheme,
  isDark: false,
  toggleTheme: () => console.warn('ThemeProvider not found'),
  changeTheme: () => console.warn('ThemeProvider not found'),
})

// 3. Create the ThemeProvider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme()
  // Keep state of the current theme, defaulting to system preference
  const [isDark, setIsDark] = useState(colorScheme === 'dark')
  const [lightTheme, setLightTheme] =
    useState<CustomAppTheme>(defaultLightTheme)
  const [darkTheme, setDarkTheme] = useState<CustomAppTheme>(defaultDarkTheme)

  const toggleTheme = () => {
    setIsDark((previousState) => !previousState)
  }

  const activeTheme = isDark ? darkTheme : lightTheme

  const changeTheme = (
    newLightTheme: CustomAppTheme = defaultLightTheme,
    newDarkTheme: CustomAppTheme = defaultDarkTheme,
  ) => {
    setLightTheme(newLightTheme)
    setDarkTheme(newDarkTheme)
  }

  // Integrate with React Navigation's theme
  const navigationTheme = useMemo(() => {
    const navTheme = isDark ? darkTheme : lightTheme
    return {
      ...navTheme,
      colors: {
        ...navTheme.colors,
        primary: activeTheme.colors.primary,
        background: activeTheme.colors.background,
        card: activeTheme.colors.card,
        text: activeTheme.colors.text,
        border: activeTheme.colors.border,
      },
    }
  }, [isDark, activeTheme])

  return (
    <ThemeContext.Provider
      value={{ theme: activeTheme, isDark, toggleTheme, changeTheme }}
    >
      <NavThemeProvider value={navigationTheme}>{children}</NavThemeProvider>
    </ThemeContext.Provider>
  )
}

// 4. Create the custom hook to use the theme
export const useTheme = () => useContext(ThemeContext)
