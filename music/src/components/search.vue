<template>
    <div id="search">
      <div class='search'>
        <mt-header>
          <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <mt-search v-model="value"  placeholder="大家都在搜" @keyup.enter.native="search()" cancel-text=""></mt-search>
      </div>
      <div class="hot">
        <p class="head">热门搜索</p>
        <ul>
          <li v-for="(item,index) in hots" @click="search(item.first)" :key="index">
            <mt-badge size="large" color="#888">{{item.first}}</mt-badge>
          </li>
        </ul>
      </div>
      <div class="history">
        <p class="head">搜索历史记录</p>
        <ul>
          <li v-for="(value,index) in history" :key="index">
            <mt-badge size="large" color="#888">{{value}}</mt-badge>
          </li>
        </ul>
      </div>
      <div class="result">
        <p class="head">搜索结果</p>
        <hr>
        <ul>
          <li @click="getSrc(item)" v-for="(item,index) in result" :key="index">
            <span>{{item.name}}</span>
            <span>{{item.artists[0].name}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    export default {
        name: 'search',
        data(){
          return{
            value:'',
            hots:[],
            history:[],
            result:[],
          }
        },
        methods:{
          ...Vuex.mapActions(['getSrc']),
          search(title) {
            this.history.push(title?title:this.value);
            this.$ajax.get(`https://api.wulv5.com/music/search?keywords= ${title?title:this.value}`)
              .then(res=>{
                this.result = res.data.result.songs;
              });
            this.value = '';
          },

          // research() {
          //   this.$ajax.get(`https://api.wulv5.com/music/search?keywords= ${}`)
          //     .then(res=>{
          //       this.result = res.data.result.songs;
          //     })
          // }
        },
        created(){
          this.$ajax.get('https://api.wulv5.com/music/search/hot')
            .then(res=>{
              this.hots = res.data.result.hots;
            })
        }
    }
</script>

<style scoped>
#search .search{
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d9d9d9;
}
#search .mint-header{
  width: 40px;
  line-height: 52px;
  background-color: #d9d9d9;
  color: #000;
  font-size: 20px;
  display: inline-block;
}
#search .mint-search{
  width: 335px;
  height: 52px;
  margin-left: -10px;
  float: right;
}
#search .hot{
  margin-top: -30px;
}
#search  p.head{
  height: 20px;
  text-align: left;
  text-indent: 10px;
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
}
#search .hot{
  margin-top: 60px;
  overflow: hidden;
}
#search .hot ul{
  height: 80px;
}
#search .hot ul li{
  float: left;
  margin: 0 5px 5px 8px;
  height: 25px;
}
#search .hot ul li span{
  font-size: 14px;
}
#search .history{

}
#search .history ul{
}
#search .history ul li{
  display: inline-block;
  padding: 5px;
  height: 30px;
}
#search .result{
  overflow: scroll;
}
#search .result ul{
  overflow: scroll;
}
#search .result ul li{
  /*height: 40px;*/
  border-bottom: 1px solid #111;
}
#search .result ul li span{
  padding: 8px;
  display: block;
  text-indent: 10px;
}
</style>
