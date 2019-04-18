<template>
  <div class="app">
    <div class="hidden" @click="hide">
      <div class="main" @click.stop>
        <p>历史</p>
        <p>下载记录</p>
      </div>
    </div>
    <div class="head">
      <span class="hide" @click="show">...</span>
      <p>Wiki音乐</p>
      <router-link :to="{path:'search'}" style="color: #000"><span class="search">搜索</span></router-link>
    </div>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <a href=""><img :src='item.imageUrl' alt="" width="100%" height="95%"></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <hr/>
    <div class="recommed">
      <p class="head">推荐歌单</p>
      <ul>
        <li v-for="(item,index) in recomList" :key="index">
          <img :src="item.picUrl" alt="" width="100%">
          <p>{{item.name}} </p>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        bannerList:[],
        recomList:[],
      }
    },
    created(){
      this.$ajax.get('https://api.wulv5.com/music/banner')
        .then(res=>{
          this.bannerList = res.data.banners;
        }).catch();
      this.$ajax.get('https://api.wulv5.com/music/personalized').then(res=>{
        this.recomList = res.data.result;
      }).catch();
    },
    methods:{
      show(){
        let $hidden = $('.app .hidden');
        $hidden.show();
      },
      hide(){
        let $hidden = $('.app .hidden');
        $hidden.hide();
      },
    }
  }
</script>

<style scoped>
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
  }
  .app div.head{
    width: 100%;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 10px;
    z-index: 99;
  }
  .app .head p,.app .head span{
    display: inline;
  }
  .app .head span.search{
    float: right;
    margin-right: 20px;
  }
  .app .head span.hide{
    float: left;
    font-size: 20px;
  }
  .app .hidden{
    position: fixed;
    top: 0px;
    left: 0;
    width: 375px;
    height: 667px;
    background-color: rgba(233,233,233,0.5);
    z-index: 100;
    display: none;
  }
  .app .hidden .main{
    width: 70%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
  }
  .app .banner{
    margin-top: 40px;
    height: 180px;
  }
  .app hr{
    width: 375px;
    margin: 10px 0 0 -10px;
  }
  .app .recommed p.head{
    height: 20px;
    text-align: left;
    text-indent: 10px;
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  .app .recommed ul{

  }
  .app .recommed ul li{
    float: left;
    height: 220px;
    width: 160px;
    margin-left: 13px;
  }
  .app .recommed ul li p{
    width: 100%;
    font-size: 14px;
  }
</style>
