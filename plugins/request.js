/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

export const request = axios.create({
  // baseURL: 'https://realworld-nuxtjs-five.vercel.app', // vercel 部署站点地址
  baseURL: 'https://conduit.productionready.io',
  // baseURL: 'http://realworld.api.fed.lagounews.com',
  timeout: 5000
})

// 通过插件机制获取上下文对象（query、params、req、res、app、store）
// 插件导出函数必须作为 default 陈成员
export default ({ store }) => {
  // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  // 可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
  request.interceptors.request.use(
    function(config) {
      // 请求就会经过这里
      // Do something before request is sent

      const { user } = store.state

      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }

      // 返回 config 请求配置对象
      return config
    },
    function(error) {
      // 如果请求失败（此时请求还没有发出去），就会进入这里
      // Do something with request error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  request.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      return Promise.reject(error)
    }
  )
}
