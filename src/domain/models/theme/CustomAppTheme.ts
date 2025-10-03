export default interface CustomAppTheme extends ReactNavigation.Theme {
  colors: {
    primary: string
    primaryDark: string
    primaryLight: string

    secondary: string
    secondaryDark: string
    secondaryLight: string

    accent: string
    accentDark: string
    accentLight: string

    // Background and papers colors
    background: string
    card: string
    border: string

    // Text colors
    text: string
    textSecondary: string
    textDisabled: string

    // Feedback colors
    notification: string
    success: string
    error: string
    warning: string
    info: string
  }
  spacing: {
    s:number
    m: number
    l: number
    xl: number
  }
}
