<template>
  <div class="footer">
    <div class="footer_main">
      <div class="footer_contentLeft" @click="musicDetail">
        <div class="footer_contentLeft_img">
         <img :src="currentImg" alt="">
         </div>
         <div class="footer_contentLeft_songName">
           <p><marquee direction="left" scrollamount="3">{{title}}</marquee></p>
           <p v-if="name.length<10">{{name}}</P>
           <p v-else><marquee direction=left scrollamount=3>{{name}}</marquee></p>
         </div>
      </div>
      <div class="footer_contentRight">
        <div class="footer_contentRight_menu"> 
          <p @click="play"><img :src="isPlay"/></p>
          <p @click="next"><img :src="isNext"/></p>
          <p @click="lists"><img :src="isLists"/></p>
        </div>
      </div>
    </div>
    <div class="popup" v-if="showPopup">
      <div class="empty" @click="clickPopup">
        </div>
      <div class="popupContent">
         <div class="popupContent_head">
            <p>顺序播放({{mun}})</p>
            <p @click="deleteAll"><img src="../assets/images/footer/delete.png" /></p>
         </div>
          <scroller lock-x height="45vh" ref="scrollerEvent">
            <div>
            <div class="popupContent_body">
                <div class="popupContent_body_list" v-for="(item,index) in popupList">
                  <div class="popupContent_left">
                    <p @click="popupListClick(index)">
                      <span :class="currentIndex == index?'showListening':'listening'"><img src="../assets/images/footer/listening.png" /></span>
                      <span :class="currentIndex == index?'showListening':''">{{item.title}}</span>
                    </p>
                    <p @click="deleted(index)"><img src="../assets/images/footer/delete01.png" /></p>
                  </div>
                </div>
            </div>
            </div>
          </scroller>
          <confirm v-model="showConfirm"
            title="操作提示"
            confirm-text="确定"
            cancel-text="取消"
            @on-confirm="onConfirm"
            >
            <p style="text-align:center;">{{tip}}</p>
         </confirm>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Scroller,Confirm} from 'vux'
import {mapState,mapMutations} from 'vuex'
import store from '../store'
  export default {
        data() {
            return {
              isNext:require('../../static/images/footer/next.png'),
              isLists:require('../../static/images/footer/lists.png'),
              showPopup:false,
              mun:0,
              popupList:[],
              currentIndex: 0,
              showConfirm:false,
              tip:'确定清空播放列表吗?',
              maxLength:'maxLength'
            }
        },
        components:{
          Scroller,
          Confirm
        },
        computed:{
          isPlay(){
            let type = this.$store.getters.getIsPlaying
            let bmg = ''
            if(type){
              bmg = require('../../static/images/footer/stop.png')
            }else{
              bmg = require('../../static/images/footer/play.png')
            }
            return bmg
          },
          currentImg(){
            return this.$store.getters.getCurrentMusic ? 'https://api.hibai.cn/music/Music/Music?id='+this.$store.getters.getCurrentMusic.url.substring(9)+'&type=pic' : ''
          },
          title(){
            return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.title : ''
          },
          name(){
            return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.name : ''
          }
        },
        methods: {
          ...mapMutations({setMusicUrlId:'setMusicUrlId',setMusicList:'setMusicList',setCurrentMusicIndex:'setCurrentMusicIndex',likeStatus:'likeStatus'}),
           play(){
            this.$store.commit('togglePlay')
          },
          next(){
            this.$store.commit('playNext')
            let index = this.$store.getters.getCurrentIndex
            let id = this.$store.getters.getCurrentMusic.url.substring(9)
            this.setMusicUrlId(id)
          },
          lists(){
            this.showPopup = true
            $.ajax({
              type: 'GET',
              url: "http://127.0.0.1:3000/listen/localMusic",
              headers: {"Content-Type": "application/json"},
              success: res => {
                this.popupList = res.musicsList
                this.mun = res.musicsList.length
                this.setMusicList(this.popupList)
              },
              error: res => {
                alert("error");
              }
          });
          },
          musicDetail(){
            let currentMusic = this.$store.getters.getCurrentMusic
            // console.log(currentMusic.url)
            let flag = ''
            let arr = []
            $.ajax({
              type: 'GET',
              url: "http://127.0.0.1:3000/listen/mylike",
              headers: {"Content-Type": "application/json"},
              success: res => {
                console.log(res.musicsList)
                for(let i = 0;i<res.musicsList.length;i++){
                  if(res.musicsList[i].url == currentMusic.url){
                    arr.push(res.musicsList[i])
                  }
                }
              }  
            });
            this.likeStatus(arr)
            this.$router.push({name:'musicDetails'})
          },
          clickPopup(){
            this.showPopup = false
          },
          popupListClick(index){
            // console.log(index)
              if(index >= 0){
                this.currentIndex = index
              }else{
                this.currentIndex = 1000
              }
              let id = this.popupList[index].url.substring(9)
              this.setCurrentMusicIndex(index)
              this.setMusicUrlId(id)
          },
          deleted(index){
            console.log(index)
            let popupList = this.popupList
            let url = popupList[index].url
            let title = popupList[index].title
            let name = popupList[index].name
            $.ajax({
              type: 'POST',
              url: "http://127.0.0.1:3000/listen/delete?url="+url+"&title="+title+"&name="+name,
              headers: {"Content-Type": "application/json"},
              success: res => {
                if(res.status == '200'){
                  popupList.splice(index,1)
                }
              }  
            });
          },
          deleteAll(){
            this.showConfirm = true
          },
          onConfirm(){
            let popupList = this.popupList
            $.ajax({
              type: 'GET',
              url: "http://127.0.0.1:3000/listen/deleteAll",
              headers: {"Content-Type": "application/json"},
              success: res => {
                console.log(res)
                if(res.status == '200'){
                  popupList.splice()
                  this.showPopup = false
                }
              }  
            });
          }
      },
      created(){

       }
    }
</script>

<style lang="scss">
   @import './scss/myfooter.scss';
</style>
