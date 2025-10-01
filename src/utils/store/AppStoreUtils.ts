import Application from 'expo-application'
import Constants from 'expo-constants'
import * as StoreReview from 'expo-store-review'
import { Platform } from 'react-native'

class AppStoreUtilsImpl {
  static INSTANCE = new AppStoreUtilsImpl()
  private constructor() {}

  getStoreUrl() {
    const { APP_APPLE_APP_STORE_ID } = Constants.expoConfig?.extra || {}

    return Platform.select<string>({
      android: `market://details?id=${Application.applicationId}`,
      ios: `itms-apps://apps.apple.com/app/id${APP_APPLE_APP_STORE_ID}`,
    }) as string
  }

  showStoreReviewWithTimeout(timeout: number = 100) {
    return new Promise<void>((res, reject) => {
      setTimeout(() => {
        StoreReview.requestReview().then(res).catch(reject)
      }, timeout)
    })
  }

  async isStoreReviewAvailable() {
    const hasAction = await StoreReview.hasAction()
    const available = await StoreReview.isAvailableAsync()
    return hasAction && available
  }
}

const AppStoreUtils = AppStoreUtilsImpl.INSTANCE

export default AppStoreUtils
