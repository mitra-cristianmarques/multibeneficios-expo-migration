import * as SecureStore from 'expo-secure-store'
import { createContext, useContext, useEffect, useState } from 'react'

const SessionContext = createContext<{
  signIn: (session: string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function useSession() {
  const value = useContext(SessionContext)
  if (__DEV__) {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const session = await SecureStore.getItemAsync('session')
      setSession(session)
      setIsLoading(false)
    }
    getSession()
  }, [])

  const signIn = async (session: string) => {
    await SecureStore.setItemAsync('session', session)
    setSession(session)
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync('session')
    setSession(null)
  }

  return (
    <SessionContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  )
}
