import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'

Vue.config.productionTip = false
// 設定通用域名
// axios.defaults.baseURL = "https://hereisanewapp.herokuapp.com/";
axios.defaults.baseURL = "http://localhost:3000/";

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
