// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueGeolocation from 'vue-browser-geolocation'

axios.defaults.baseURL = 'https://hereisanewapp.herokuapp.com/'
Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.use(VueGeolocation)

import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load:{
    key:'AIzaSyCPMrP8fo_E-XxpNEGt5W-EwzxuYWWGrYI',
    libraries: 'places',
  },
})

import VueFab from 'vue-float-action-button'
Vue.use(VueFab,{
  iconType: 'MaterialDesign'  
})

//main.js為主要檔案
/* eslint-disable no-new */
new Vue({
  el: '#app', //el = element  讓哪個tag(id.class) 有 Vue的功能  //哪個範圍要有 vue 的功能
  router,
  components: { App },
  template: '<App/>' //樣板
  //data 掌管資料 data:{}
})

/*const vm = new Vue({
  el : '#app',
  data : {
    teachers : []
  },
  methods : {
    getAllTeacher : function() {
      let self = this;
      axios({
        methods: 'get',
        url: 'http://localhost:8080/ironSchool/teacher'
      })
      .then((resp) => {
        self.teachers = resp.data;
      });
    }
  }
});*/

// new Vue({
//   el: "#input",
//   data:{
//     mes : "this is input.",
//     score : 80
//   }
// })


//data:{
//  loading = "false"
//}

// <div v-show ="loading">ERROR</div> style = "display: none"
// <div v-if ="loaing">ERROR</div> 連F12都不會跑出來