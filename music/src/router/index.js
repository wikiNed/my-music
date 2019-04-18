import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import search from '../components/search'

Vue.use(Router)

//调用Axios请求数据
import Axios from 'axios';
// axios.defaults.baseURL = 'https://api.wulv5.com/';
Vue.prototype.$ajax = Axios;


// Vue.prototype.dataURL = function (file,title) {
//   return file+title;
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },

  ]
})
