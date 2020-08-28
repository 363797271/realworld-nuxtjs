// 仅在服务端加载 cookieparser 包
const cookieparser = process.server ? require('cookieparser') : undefined
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },

  // 退出登录
  logOut(state) {
    state.user = null
    Cookie.remove('user')
  }
}

export const actions = {
  // 该方法会在服务端渲染时自动运行
  // 客户端渲染期间，不会传入第二个参数
  // 作用：初始化state，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null

    // 判断请求头中是否有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转化为对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }

    commit('setUser', user)
  }
}
