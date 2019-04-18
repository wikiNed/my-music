<template>
  <div id="app">
    <router-view></router-view>
    <div class="play">
      <audio :src="songDetail.url" autoplay controls loop></audio>
      <p>{{songDetail.name}}--{{songDetail.author}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  // created(){
  //   this.songDetail = this.item;
  // },
  computed:{
    ...mapState(['item']),
    songDetail(){
      return this.item
    }
    // item(){
    //   return this.$store.state.item
    // }
  },

}
</script>

<style>
  #app{
    position: relative;
  }
  #app .play{
    width: 100%;
    height: 50px;
    background-color: #f1f3f4;
    position: fixed;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  #app .play p{
    width: 300%;
    margin-top: -36px;
    text-indent: 10px;
    font-size: 14px;
    float: left;
    display: inline-block;
    color: black;
    animation: go 5s linear infinite;
  }
  @keyframes go {
    0%{margin-left: 85px}
    100%{margin-left:-85px}
  }
  #app .play audio{
    width: 80%;
    border: none;
    float: right;
    display: inline-block;
  }
</style>
