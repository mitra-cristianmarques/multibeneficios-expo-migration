import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Button, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'src/hooks/useTheme'

export default function Index() {
  const { t } = useTranslation(['labels'])
  const router = useRouter()
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View>
        <Text style={{ color: theme.colors.text }}>Theme Example</Text>
        <Text style={{ color: theme.colors.text }}>
          Edit app/index.tsx to edit this screen.
        </Text>
        <Text style={{ color: theme.colors.text }}>{t('Common.test')}</Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={{ color: theme.colors.primary }}>Press me</Text>
        </Pressable>
        <Pressable
          style={{ paddingTop: 16 }}
          onPress={() => router.push('/(app)/home')}
        >
          <Text style={{ color: theme.colors.primary }}>Go to home</Text>
        </Pressable>
        <Button
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onPress={toggleTheme}
          color={theme.colors.primary}
        />
      </View>
    </SafeAreaView>
  )
}
