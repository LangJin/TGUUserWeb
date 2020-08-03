import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Message from 'ant-design-vue/es/message'
import { getToken } from './auth'
import { baseURL, TokenKey } from '@/config'

export default (setings) => {
    const service = axios.create({
        baseURL,
        timeout: 30000
    })
    service.interceptors.request.use(config => {        
        // 请求头携带参数
        if (store.getters.token) {
            config.headers[TokenKey] = getToken()
        }
        return config
    }, error => {
        Promise.reject(error)
    })
    service.interceptors.response.use(response => {
        const res = response.data
        // 非200
        if (response.status !== 200) {
            const message = res.message || '服务出错'
            Message.error(message)
            return Promise.reject('服务出错')
        }

        return res
    }, error => {
        const response = error.response
        if (!response) {
            if (error && error.message === 'cancel') {
                // 手动取消情况下的处理
                return Promise.reject(error)
            }
            Message.error('服务请求超时！')
            return Promise.reject(error)
        }
        // token过期
        if (response.status === 401) {
            Message.error({ content: '用户身份过期,请重新登录！', key: '401' })
            store.commit('DELETE_USERINFO') // 清除登录信息
            router.push({ path: '/logout', replace: true }) // 跳转登录页
            return Promise.reject(401)
        }
        if (response.status >= 500) {
            Message.error('后端服务异常，请联系管理员！')
            return Promise.reject(error)
        }
        const message = response.data.message || '请求出错！'
        Message.error(message)
        return Promise.reject(error)
    })
    return service(setings)
}
