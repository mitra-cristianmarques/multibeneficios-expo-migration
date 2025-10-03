import { useSession } from '@/src/hooks/useSession'
import { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen() {
  const {signOut} = useSession()
  useEffect(() => {
    signOut()
  }, [])
  return (
    <View>
      <Text>Opções Screen</Text>
    </View>
  )
}
