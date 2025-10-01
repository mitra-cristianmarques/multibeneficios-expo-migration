import AsyncStorage from '@react-native-async-storage/async-storage'
import AppStoreUtils from '../utils/store/AppStoreUtils'

class AppReviewServiceImpl {
  static INSTANCE = new AppReviewServiceImpl()

  private countThreshold = 5
  private storageKey = 'review_count'

  private constructor() {}

  async reviewApp(waitTime: number = 10000) {
    try {
      const canShowReview = await this.validateShowReview()

      if (canShowReview) {
        await AppStoreUtils.showStoreReviewWithTimeout(waitTime)
        await this.clearAppOpenedCount()
      }
      console.log('Review Show status', true)
    } catch (error) {
      console.log('Erro review: ', error)
    }
  }

  async incrementAppOpenedCount() {
    try {
      const appOpenedCount = Number(
        (await AsyncStorage.getItem(this.storageKey)) || 0,
      )
      let newValue = appOpenedCount + 1

      await AsyncStorage.setItem(this.storageKey, newValue.toString())
    } catch (error) {
      console.error('Could not update app opened count')
    }
  }

  private async validateShowReview() {
    const appOpenedCount = Number(
      (await AsyncStorage.getItem(this.storageKey)) || 0,
    )

    console.log('review threshold', this.countThreshold)
    console.log('opened count', appOpenedCount)

    if (appOpenedCount >= this.countThreshold) {
      return AppStoreUtils.isStoreReviewAvailable()
    }
    return false
  }

  private async clearAppOpenedCount() {
    return AsyncStorage.setItem(this.storageKey, '0')
  }
}

const AppReviewService = AppReviewServiceImpl.INSTANCE
export default AppReviewService
