/**
 * Nuxt.js 配置文件
 */
module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home')
              },
              {
                path: 'login',
                name: 'login',
                component: resolve(__dirname, 'pages/login')
              },
              {
                path: 'register',
                name: 'register',
                component: resolve(__dirname, 'pages/login')
              },
              {
                path: 'profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile')
              },
              {
                path: 'settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings')
              },
              {
                path: 'editor/:slug?',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor')
              },
              {
                path: 'article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article')
              }
            ]
          }
        ]
      )
    }
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
    '~/plugins/message.js'
  ],

  // 跨域配置（解决vercel部署为https站点，请求http接口失败的问题）
  // modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  // proxy: {
  //   '/api': 'http://realworld.api.fed.lagounews.com'
  // },

  // 服务端环境配置
  server: {
    // 默认localhost 只能本地访问
    // 若想要对外访问，要配置为 0.0.0.0
    host: '0.0.0.0',
    // nuxtjs 默认 3000
    // vercel 默认80
    port: 3000
  }
}
