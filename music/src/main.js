// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'

Vue.use(Mint);
Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    item:{}
  },
  mutations:{
    setSrc(state,{url,name,author}){
      state.item.url = url;
      state.item.name = name;
      state.item.author = author;
      // console.log(state.item.url);
    }
  },
  actions:{
    getSrc({commit,dispatch},song){
      $.ajax({
          url:`https://api.wulv5.com/music/song/url?id=${song.id}`,
          success(res){
            console.log(res,song);
            commit('setSrc',{url:res.data[0].url,name:song.name,author:song.artists[0].name})
          }
        });
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  Mint,
  router,
  components: { App },
  template: '<App/>'
})
