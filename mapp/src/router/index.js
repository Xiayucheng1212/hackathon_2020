import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hello from '@/components/hello'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello', //html的路徑名
      name: 'hello', //好像還沒用到
      component: hello //template裡面的 id (在hello.vue可以找到)
    }
    
  ]
})
