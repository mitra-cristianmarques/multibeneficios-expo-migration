import i18n from '@/i18n'
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { router } from 'expo-router'
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning'
import Environment from '../../domain/constants/Environment'
import { ApiServiceError } from '../../domain/models/dto/common/ApiError'
import ApiResponseDto from '../../domain/models/dto/common/ApiResponseDto'

const authHeaders = JSON.parse(Environment.ApiConfigHeader || '{}')

class ApiServiceImpl {
  static INSTANCE = new ApiServiceImpl()
  sslPinningInitialized = false
  private constructor() {}

  initializePinning() {
    return initializeSslPinning({
      [Environment.SslDomain]: {
        includeSubdomains: true,
        publicKeyHashes: Environment.SslHashes.split(';'),
      },
    })
      .then(() => {
        console.log('SSL pinning initialized successfully')
        this.sslPinningInitialized = true
        return true
      })
      .catch((error) => {
        console.error('Error initializing SSL pinning:', error)
        this.sslPinningInitialized = false
        return false
      })
  }

  async registerRequestInterceptor(config: InternalAxiosRequestConfig<any>) {
    // add logs and other config here
    if (!this.sslPinningInitialized) {
      const response = await this.initializePinning()
      if (!response) {
        return Promise.reject(
          new ApiServiceError(
            i18n.t('messages:Errors.Api.ssl.title'),
            i18n.t('messages:Errors.Api.ssl.message'),
          ),
        )
      }
    }
    return config
  }

  registerRejectInterceptor(error: AxiosError) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      router.replace('/login' as any)
      return Promise.reject(
        new ApiServiceError(
          i18n.t('messages:Errors.Api.unauthorized.title'),
          i18n.t('messages:Errors.Api.unauthorized.message'),
        ),
      )
    }

    return Promise.reject(error)
  }

  registerResponseSuccessInterceptor(
    response: AxiosResponse<ApiResponseDto<any>>,
  ) {
    if (response.data.dados.apiResultado === 'E') {
      return Promise.reject(
        new ApiServiceError(
          response.data.dados.apiMensagemUsuario,
          response.data.dados.apiMensagemSuporte,
        ),
      )
    }
    return response
  }
}

const ApiService = ApiServiceImpl.INSTANCE

export const apiMultiBenefits = axios.create({
  baseURL: Environment.ApiMulti,
  headers: {
    ...authHeaders,
  },
})

export const apiAuth = axios.create({
  baseURL: Environment.ApiAuth,
  headers: {
    ...authHeaders,
  },
})

apiMultiBenefits.interceptors.request.use(ApiService.registerRequestInterceptor)
apiMultiBenefits.interceptors.response.use(
  ApiService.registerResponseSuccessInterceptor,
  ApiService.registerRejectInterceptor,
)

apiAuth.interceptors.request.use(ApiService.registerRequestInterceptor)
apiAuth.interceptors.response.use(
  ApiService.registerResponseSuccessInterceptor,
  ApiService.registerRejectInterceptor,
)

export default ApiService
 