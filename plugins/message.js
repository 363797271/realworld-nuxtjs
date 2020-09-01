import Vue from 'vue'
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

// Vue.prototype.$message
Vue.use(Message)

// Vue.prototype.$error
Vue.prototype.$error = arg => {
  let options = {
    type: 'error',
    showClose: true,
    position: 'top-right'
  }
  if (typeof arg === 'string') {
    options.message = arg
  } else {
    options = Object.assign(arg, options)
  }
  Vue.prototype.$message(options)
}
