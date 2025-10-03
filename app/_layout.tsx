import { SessionProvider, useSession } from '@/src/hooks/useSession'
import { ThemeProvider } from '@/src/hooks/useTheme'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../i18n'
import i18n from '../i18n'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function MainStack() {
  const { session, isLoading } = useSession()
  const segments = useSegments()
  const router = useRouter()
  const { t } = useTranslation(['labels'])

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === '(app)'

    if (session && !inAuthGroup) {
      router.replace('/home')
    } else if (!session && inAuthGroup) {
      router.replace('/')
    }
  }, [session, isLoading, segments, router])

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
          name="(app)"
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
    <ThemeProvider>
      <SessionProvider>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <Suspense
              fallback={
                <View>
                  <Text>Loading...</Text>
                </View>
              }
            >
              <MainStack />
            </Suspense>
          </SafeAreaProvider>
        </I18nextProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
