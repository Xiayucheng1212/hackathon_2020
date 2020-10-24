// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Create from './Create'
import router from './router'
import axios from 'axios'
import qs from 'qs'

Vue.use(ElementUI)
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://hereisanewapp.herokuapp.com/'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Create },
  template: '<Create/>'
})