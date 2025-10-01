import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, Text, View } from 'react-native'

export default function Index() {
  const { t } = useTranslation(['labels'])
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{t('Common.test')}</Text>
      <Pressable onPress={() => router.push('/login')}>
        <Text>Press me</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/home')}>
        <Text>Go to home</Text>
      </Pressable>
    </View>
  )
}
