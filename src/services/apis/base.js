import { ElMessage } from 'element-plus'
import axios from 'axios'
import md5 from 'crypto-js/md5'
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_API_URL
if (!baseURL) {
  throw new Error('VITE_API_URL is not defined')
}
const $fetch = axios.create({ baseURL })

const COOKIE_TOKEN = 'sso-t'
const COOKIE_DOMAIN = 'rct.ai'
const authToken = Cookies.get(COOKIE_TOKEN)
export const STORAGE_TOKEN = 'fancybird-admin/user/token'

export const logout = () => {
  Cookies.remove(COOKIE_TOKEN)
  Cookies.remove(COOKIE_TOKEN, {
    domain: COOKIE_DOMAIN
  })
}

const rejectResError = (error) => {
  const message = error?.message
  if (message) {
    ElMessage.error(`SERVER ERROR: ${message}`)
  }
  return Promise.reject(error?.data || error)
}

// 统一处理返回值
$fetch.interceptors.response.use(
  (res) => {
    if (res.status < 200 || res.status >= 300) {
      if (res.status === 401) {
        logout()
      }
      return rejectResError(res)
    }

    // SSO 接口需要单独处理
    if (res.config.url === '/auth/info') {
      return res.data?.data || res.data
    }

    // 后端约定 code 为 0 时表示成功
    if (res.data?.code !== 0) {
      return rejectResError(res.data)
    }
    return res.data?.data || res.data
  },
  (error) => rejectResError(error.response)
)

// 后端指定的安全性字段
// "kind": "bird", //固定字符串
// "secret": "tuz!TI+@ThZd!K5", //secret 固定字符串
// "timestamps": 1650942374,//客户端当前unix时间戳
// "sign": "7ddf796450fab535",//对 "${timestamps}_${kind}_saltbird66" 做md5 取前64位
const generateExtraConfig = () => {
  const kind = 'bird'
  const secret = 'tuz!TI+@ThZd!K5'
  const timestamps = Date.now()
  const sign = md5(`${timestamps}_${kind}_saltbird66`).toString()
  return { kind, secret, timestamps, sign }
}

$fetch.interceptors.request.use((config) => {
  if (config.url === '/auth/info') {
    return config
  }

  // 目前和后端约定，该项目中只用 POST 方法
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      ...generateExtraConfig()
    }
  }
  // config.headers['X-SSO-Token'] = this.authToken
  config.url = `${config.url}?ssotoken=${authToken}`
  return config
})

export default class BaseAPI {
  constructor() {
    this.request = $fetch
    this.authToken = authToken
  }

  get(url, params = {}, config = {}) {
    return this.request.get(url, {
      params,
      ...config
    })
  }

  delete(url, params = {}, config = {}) {
    return this.request.delete(url, {
      params,
      ...config
    })
  }

  post(url, params = {}, config) {
    return this.request.post(url, params, config)
  }

  put(url, params = {}, config) {
    return this.request.put(url, params, config)
  }
}
