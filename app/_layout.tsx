import i18n from '@/i18n'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import '../i18n'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function MainStack() {
  const { t } = useTranslation(['labels'])

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: t('Navigation.Titles.login'),
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

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
        <MainStack />
      </Suspense>
    </I18nextProvider>
  )
}
