<template>
  <content-box>
    <div class="listenMain">
      <div class="listenList">
        <p @click="like"><span><img src="../../../assets/images/listen/like.png"></span><span>我喜欢</span></p>
        <p @click="songList"><span><img src="../../../assets/images/listen/list.png"></span><span>歌单</span></p>
        <p @click="downLoad"><span><img src="../../../assets/images/listen/download.png"></span><span>下载</span></p>
        <p @click="cancel"><span><img src="../../../assets/images/listen/delete.png"></span><span>已删歌曲</span></p>
      </div>
      <div class="borderImg01"></div>
      <div class="musicLocation" @click="localMusic">
        <p><span><img src="../../../assets/images/listen/music.png"></span><span>本地音乐</span></p>
        <p>
          <span><countup :start-val="1" :end-val="Number(count)" :duration="2"></countup>首</span>
          <span style="margin-top: .2rem; margin-right: 0">
             <img src="../../../assets/images/listen/to_right.png" />
          </span>
        </p>
      </div>
      <div class="borderImg02"></div>
      <div class="collect">
        <p><span style="background: yellow"><img src="../../../assets/images/listen/collect.png"></span><span>我的收藏</span></p>
        <p><span style="background: cornflowerblue"><img src="../../../assets/images/listen/toast.png"></span><span>试听记录</span></p>
      </div>
      <div class="borderImg01"></div>
    </div>
  </content-box>
</template>

<script type="text/ecmascript-6">
  import {Group, Cell, Countup } from 'vux'
  export default {
    name:'listen',
    data() {
      return {
        count:''
      }
    },
    components: {
      Group,
      Cell,
      Countup
    },
    methods: {
      like(){
        this.$router.replace({name:'like'})
      },
      songList(){
        this.$router.push({name:'lists'})
      },
      downLoad(){
        this.$router.push({name:'downLoad'})
      },
      cancel(){
        this.$router.push({name:'cancel'})
      },
      localMusic(){
        this.$router.push({name:"songs"})
      }
    },
    created(){
      console.log(this.$store.getters.getUserInfo)
      $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/localMusic",
        headers: {"Content-Type": "application/json"},
        success: res => {
          this.count = res.musicsList.length
        },
        error: res => {
          alert("error");
        }
    });
    }
  }
</script>

<style lang="scss">
  .listenList{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: .3rem 0;
    p{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      span img{
        width: 2rem;
      }
    }
  }
  .borderImg01{
    height: 1px;
    margin: 0 1rem;
    opacity: 0.6;
    background: #cfc6c6;
  }
  .borderImg02{
    height: 1px;
    opacity: 0.6;
    background: #cfc6c6;
  }
  .musicLocation{
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    p{
      align-items: center;
      display: flex;
      span {
        margin-right: 1rem;
        img{
          width: 1.5rem;
        }
      }
      &:nth-child(2){
        span:nth-child(1){
          margin-right: .3rem;
        }
      }
    }
  }
  .collect{
    display: flex;
    padding: 0 .5rem;
    margin: .3rem 0;
    p{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      span{
        padding: .3rem .5rem;
        border-radius: 100%;
        &:nth-child(1){
           opacity: 0.6;
         }
              img{
                width: 2.2rem;
              }
      }
    }
  }
</style>
