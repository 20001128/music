<template>
  <content-box>
      <my-head
       title="我 喜 欢"
      >
      </my-head>
      <div class="likeMain">
      <song-lists v-if="showList" :musicLists="lists" @musicPlay="musicParams"></song-lists>
      <div class="likeContent" v-if="!showList">
         <p><img src="../../../assets/images/searchSong/none.png" /></p>
         <p>列表暂还未有歌曲，赶快去添加吧！</p>
      </div>
      </div>
  </content-box>
</template>

<script type="text/ecmascript-6">
import songLists from '../components/songLists.vue'
import { mapMutations } from 'vuex'
  export default {
    name:'like',
    data() {
      return {
        lists:[],
        data:[],
        showList:true
      }
    },
    components: {
      songLists
    },
    methods: {
      ...mapMutations({}),
      musicParams(e){

       }
    },
    created(){
       $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/mylike",
        headers: {"Content-Type": "application/json"},
        success: res => {
          // console.log(res)
          if(res.musicsList.length){
            this.showList = true
            this.lists = res.musicsList
          }else{
            this.showList = false
          }
        },
        error: res => {
          alert("error");
        }
    });
  },
      activated(){
      $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/mylike",
        headers: {"Content-Type": "application/json"},
        success: res => {
          if(res.musicsList.length){
            this.showList = true
            this.lists = res.musicsList
          }else{
            this.showList = false
          }
        },
        error: res => {
          alert("error");
        }
    });
    }
  }
</script>

<style lang="scss">
  .likeMain{
    height: 88vh;
    overflow: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
    .likeContent{
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-top: 7rem;
      align-items: center;
      color: #9c9f93;
      img{
        width: 10rem;
        height: 10rem;
      }
    }
  }
</style>
