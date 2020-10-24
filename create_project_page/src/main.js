import Vue from 'vue'
import App from './App.vue'
import router from './router'
import liff from '@line/liff';
import axios from 'axios';
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs';

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://hereisanewapp.herokuapp.com/'
// axios.defaults.baseURL = "http://localhost:3000/"
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;


new Vue({
  router,
  mounted: function () {
    // liff.init({
    //   liffId: "1655093964-KkjXqJQA"
    // })
    //   .then(function () {
    //     console.log('LIFF init');

    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     }
        
          
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  },
  render: h => h(App),

}).$mount('#app')
