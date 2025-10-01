import i18n from '@/i18n'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Text, View } from 'react-native'
import '../i18n'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Merriweather-Regular': require('../assets/fonts/Merriweather-Regular.ttf'),
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-BoldItalic': require('../assets/fonts/Raleway-BoldItalic.ttf'),
    'Raleway-Italic': require('../assets/fonts/Raleway-Italic.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }
      >
        <Stack />
      </Suspense>
    </I18nextProvider>
  )
}
