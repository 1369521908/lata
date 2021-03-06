import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import '@/styles/index.scss' // global css

// vant 主题定制
// 引入全部样式
// import 'vant/lib/index.less'

import App from './App'
import store from './store'
import router from './router'

import axios from 'axios'
import qs from 'qs.js'
import _ from 'lodash'

import '@/icons' // icon
import '@/permission' // permission control

import Vant from 'vant'
import 'vant/lib/index.css'

// import Vconsole from 'vconsole'

// const vConsole = new Vconsole()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}*/

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(Vant)

// Vue.use(vConsole)

// 全局注册，使用方法为:this.$axios
Vue.prototype.$axios = axios
// 全局注册，使用方法为:this.qs
Vue.prototype.qs = qs
// 全局注册，使用方法为:this._
Vue.prototype._ = _

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
