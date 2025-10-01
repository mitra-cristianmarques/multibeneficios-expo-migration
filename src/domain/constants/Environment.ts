import Constants from 'expo-constants'

const env = Constants.expoConfig?.extra

class Env {
  static INSTANCE = new Env()
  private constructor() {}

  public readonly ApiMulti: string = env?.APP_MULTI_BENEFITIS_API_URL || ''
  public readonly ApiAuth: string = env?.APP_AUTHENTICATION_API_URL || ''
  public readonly ApiConfigHeader: string =
    env?.APP_API_CONFIG_HEADER_PARAMETERS || ''
  public readonly SslDomain: string = env?.APP_SSL_DOMAIN || ''
  public readonly SslHashes: string = env?.APP_SSL_HASHES || ''

  get isDevelopment() {
    return __DEV__
  }
}
const Environment = Env.INSTANCE
export default Environment
