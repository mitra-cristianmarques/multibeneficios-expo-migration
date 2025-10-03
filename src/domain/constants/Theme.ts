import CustomAppTheme from '../models/theme/CustomAppTheme'

// 1. Define your theme structures
export const defaultLightTheme: CustomAppTheme = {
  dark: false,
  colors: {
    primary: '#0075EE',
    primaryDark: '#024283',
    primaryLight: '#1E90FF',

    accent: '#4A90A4',
    accentDark: '#007AFF', // Não definida no app
    accentLight: '#5AC8FA', // Não definida no app

    secondary: '#5856D6',
    secondaryDark: '#2C2BFF', // Não definida no app
    secondaryLight: '#AF52DE', // Não definida no app

    // Background and papers colors
    background: 'white',
    card: '#F5F5F5',

    border: '#c7c7cc',

    text: '#212121',
    textDisabled: '#BDBDBD', //Não definida no app
    textSecondary: '#757575', //Não definida no app

    // feedback colors
    success: '#34C759',
    error: '#FF3B30',
    notification: '#FF3B30',

    info: '#007AFF', // Não definida no app
    warning: '#FFCC00', // Não definida no app
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    },
  },
}

export const defaultDarkTheme: CustomAppTheme = {
  ...defaultLightTheme,
  colors: {
    ...defaultLightTheme.colors,
    background: '#121212',
    card: '#212121',
    text: 'white',
  },
  dark: true,
}
