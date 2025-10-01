import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { LocalResourcesBackend } from './locales'

// Get device locale (e.g., 'en-US' → 'en')
const deviceLocale = Localization.getLocales()[0]?.languageCode || 'pt'

// Chain: Cache first (offline), then HTTP (remote S3)
i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    lng: deviceLocale, // Start with device lang
    fallbackLng: 'pt', // Always fallback to Portuguese
    ns: ['buttons', 'messages', 'labels', 'common', 'errors'], // Default namespace
    defaultNS: 'translation',
    debug: __DEV__, // Enable logs in dev
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    backend: {
      backends: [
        // AsyncStorageBackend, // Primary: Load from cache
        HttpBackend, // Fallback: Fetch from S3
        LocalResourcesBackend, // Last fallback: Load from local files
      ],
      backendOptions: [
        {
          // Cache options
          expirationTime: 24 * 60 * 60 * 1000, // 24 hours TTL
          storeKey: `i18n_res_{{lng}}_{{ns}}`, // Cache key per lang/namespace
          versions: {}, // Optional: Versioning to invalidate cache
        },
        {
          // S3 remote options
          loadPath:
            'https://your-bucket.s3.amazonaws.com/locales/{{lng}}/{{ns}}.json',
          addPath: undefined, // No saving to remote
          requestOptions: {
            mode: 'cors', // For S3 CORS
            cache: 'no-cache', // Avoid browser cache; use i18next cache instead
          },
        },
        {},
      ],
    },
    react: {
      useSuspense: true, // Enable Suspense for loading states
    },
  })

// Optional: Persist user lang choice
i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem('userLng', lng)
})

// On init, load persisted lang if available
const initI18n = async () => {
  const savedLng = await AsyncStorage.getItem('userLng')
  if (savedLng) {
    i18n.changeLanguage(savedLng)
  }
}

initI18n()

export default i18n
