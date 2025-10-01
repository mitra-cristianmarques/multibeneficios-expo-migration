import { ConfigContext, ExpoConfig } from 'expo/config'
import { getAppDetails, getTenantFileUrls } from './scripts/getTenantFileUrls'

const assets = getTenantFileUrls(
  process.env.EAS_BUILD_PROFILE as string,
  process.env.BASE_URL as string,
  process.env.TENANT_ID as string,
)
const appDetails = getAppDetails(process.env.EAS_BUILD_PROFILE as string)

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appDetails.name,
  slug: appDetails.name.replace('+', ''),
  version: appDetails.version,
  orientation: 'portrait',
  icon: assets.appLogoPath,
  scheme: 'appmultibeneficios',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    buildNumber: `${appDetails.buildNumber}`,
    bundleIdentifier: appDetails.package,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    version: appDetails.version,
    package: appDetails.package,
    versionCode: appDetails.buildNumber,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        image: 'assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000',
        },
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
        recordAudioAndroid: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
})
