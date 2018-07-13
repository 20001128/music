<template>
  <div class="songListsMain">
    <scroller lock-x height="85vh" ref="scrollerEvent">
      <div>
		<div class="songListsContent" v-for="(item,index) in musicLists">
      <div class="songLeft">
          <p @click="add(index)"><img src="../../../assets/images/searchSong/add.png" /></p>
          <p @click.stop="musicClick(index)">
            <span>{{item.title}}</span>
            <span>{{item.name}}</span>
          </p>
      </div>
      <div class="songRight" @click="operation(index)">
          <p><img src="../../../assets/images/musicDetails/more.png" /></p>
      </div>
		</div>
      </div>
    </scroller>
    <div id="addImg" class="addMylike" v-if="addStatus">
      <img src="../../../assets/images/musicDetails/liked.png" />
    </div>
    <div class="popup" v-if="showPopup">
        <div class="empty" @click="clickPopup">
        </div>
       <div class="popupContent">
          <div class="popupContent_body">
            <p>歌曲：{{title}}</p>
            <p @click="lastone"><span><img src="../../../assets/images/listen/lastOne.png"/></span><span>上一曲</span></p> 
            <p @click="download"><span><img src="../../../assets/images/listen/load.png"/></span><span>下载到本地</span></p> 
            <p @click="nextone"><span><img src="../../../assets/images/listen/nextOne.png"/></span><span>下一曲</span></p>
            <p><span><img src="../../../assets/images/listen/singerInfo.png"/></span><span>歌手:{{singer}}</span></p>
            <p @click="deletedone"><span><img src="../../../assets/images/listen/doDelete.png"/></span><span>删除</span></p>
          </div>
       </div>
    </div>
    <toast v-model="downloadToast" :text="dowloadText" type="text"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
import { Scroller, Toast} from 'vux'
    export default {
        data() {
            return {
              lyric:[],
              addStatus:false,
              showPopup:false,
              border:'border',
              downloadToast:false,
              dowloadText:'正在下载'
          }
        },
				props:{
					musicLists:Array
				},
        components: {
          Scroller,
          Toast
        },
        computed: {
          title(){
            return this.$store.getters.getCurrentMusic?this.$store.getters.getCurrentMusic.title:''
          },
          singer(){
            return this.$store.getters.getCurrentMusic?this.$store.getters.getCurrentMusic.name:''
          }
        },
				methods: {
         ...mapMutations({setCurrentMusicIndex:'setCurrentMusicIndex',setMusicList:'setMusicList',setMusicUrlId:'setMusicUrlId',setLyric:'setLyric'}),
         musicClick(index){
           //点击某一歌曲     
           console.log(this.musicLists[index])      
           this.setCurrentMusicIndex(index)
           let musicId = this.musicLists[index].url.substring(9)
           this.setMusicUrlId(musicId)
           this.setMusicList(this.musicLists)
           this.$store.commit('play')
            $.ajax({ 
              type : "get",  
              dataType: 'text',
              jsonp: "callback",
              jsonpCallback:"jsonpCallback",
              url: "https://api.hibai.cn/music/Music/Music?id="+musicId+"&type=lrc",
              success: res => {
                this.lyric = res.split('\n')
                this.setLyric(this.lyric)
              }
          });
         },
         add(index){
            let title = this.musicLists[index].title
            let name = this.musicLists[index].name
            let url = this.musicLists[index].url 
            $.ajax({
              type:'POST',
              url: "http://127.0.0.1:3000/search/add?title="+title+'&name='+name+'&url='+url,
              headers: {"Content-Type": "application/json"},
              success: res => {
                // console.log(res)
                if(res.insert == "0"){
                   this.addStatus = true
                   $("#addImg").show(300).delay(1000).hide(300);                   
                }
                if(res.insert == "1"){
                  this.added = true
                }
              },
              error: res => {
                alert("error");
              }
            })
         },
         operation(index){
           this.showPopup = true
           let url = this.musicLists[index].url
          //  console.log(url)
         },
         clickPopup(){
           this.showPopup = false
         },
         lastone(){
            this.showPopup = false
            this.$store.commit('playPrev')
         },
         download(){
            this.showPopup = false
            let currentMusic = this.$store.getters.getCurrentMusic
            let title = currentMusic.title
            let name = currentMusic.name
            let url = currentMusic.url 
            $.ajax({
              type:'POST',
              url: "http://127.0.0.1:3000/listen/insert?title="+title+'&name='+name+'&url='+url,
              headers: {"Content-Type": "application/json"},
              success: res => {
                // console.log(res)
                this.downloadToast =true
              },
              error: res => {
                alert("error");
              }
            })
         },
         nextone(){
           this.showPopup = false
           this.$store.commit('playNext')
         },
         deletedone(){
           this.showPopup = false
           let index = this.$store.getters.getCurrentIndex
            let musicLists = this.musicLists
            let url = musicLists[index].url
            let title = musicLists[index].title
            let name = musicLists[index].name
            $.ajax({
              type: 'POST',
              url: "http://127.0.0.1:3000/listen/delete?url="+url+"&title="+title+"&name="+name,
              headers: {"Content-Type": "application/json"},
              success: res => {
                if(res.status == '200'){
                  musicLists.splice(index,1)
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
  .songListsMain{
		.songListsContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 .5rem;
		border-bottom: 1px solid #d4cfcf;
    margin: 0 .5rem;
    .songLeft{
      width: 90%;
      display: flex;
      align-items: center;
      p{
          img{
						width: 1.5rem;
						height: 1.5rem;
          }
          &:nth-child(1){
						margin: 0 .5rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          &:nth-child(2){
            width: 88%;
						display: flex;
						flex-direction: column;
						float: left;
						text-align: -webkit-left;
						span{
						  margin: .1rem 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
						}
          }
      }
    }
		.songRight{
      width: 10%;
      display: flex;
      justify-content: center;
			img{
				width: 1.5rem;
        height: 1.5rem;
			}
	   }
		}
    .addMylike{
      position: absolute;
      top: 40%;
      left: 40%;
      img{
        width: 5rem;
        height: 5rem;
      }
    }
  .popup{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    outline: 0;
    -webkit-overflow-scrolling: touch;
    filter: alpha(opacity=60);  
    background-color: rgba(0, 0, 0, 0.6); 
    z-index: 1000;
    .empty{
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 50%;
      z-index: 9999;
    }
    .popupContent{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      background-color: #eee;
      z-Index: 9999;
      .popupContent_body{
        p{
          display: flex;
          align-items: center;
          margin: 0 !important;
          border-bottom: 1px solid #d0c6c6;
          padding: .5rem 0;
          &:nth-child(1){
            border-bottom: none !important;
          }
          img{
            width: 1.5rem;
            height: 1.5rem;
            margin-right: .3rem;
          }
        }
      }
    }
   }
  }
</style>
