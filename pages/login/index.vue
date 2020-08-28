<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">
              Need an account?
            </nuxt-link>
            <nuxt-link v-else to="/login">
              Have an account?
            </nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'LoginIndex',
  middleware: 'notauth',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      user: {
        username: '', // zyd
        email: '', // zyd001@qq.com
        password: '' // 12345678
      },
      errors: {} // 错误信息
    }
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({
              user: this.user
            })
          : await register({
              user: this.user
            })

        // console.log(data)
        // TODO：保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失，需要把数据持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // console.dir(err.response)
        const { data = {} } = err.response || {}
        const { errors = {} } = data
        this.errors = errors

        // 有的电脑realworld接口跨域报错
        const data2 = {
          user: {
            id: 111794,
            email: 'zyd001@qq.com',
            createdAt: '2020-08-26T13:36:56.938Z',
            updatedAt: '2020-08-26T13:58:28.189Z',
            username: 'zyd',
            bio: null,
            image:
              'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2418038695,2643261011\u0026fm=26\u0026gp=0.jpg',
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTExNzk0LCJ1c2VybmFtZSI6Inp5ZCIsImV4cCI6MTYwMzcwMDIyOH0.VDdnDg6mF-CLRDHT8SLOaOn_xfe3X7u5CUiRpvvtu4U'
          }
        }
        this.$store.commit('setUser', data2.user)
        Cookie.set('user', data2.user)
      }
    }
  }
}
</script>

<style></style>
