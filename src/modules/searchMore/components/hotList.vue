<template>
  <div>
  <div class="hotMain">
    <scroller lock-x height="85vh" ref="scrollerEvent">
      <div>
		<div class="hotMainContent" v-for="(item,index) in musicLists">
      <div class="hotLeft">
          <p @click="add(index)"><img src="../../../assets/images/searchSong/add.png" /></p>
          <p @click.stop="musicClick(index)">
            <span>{{item.title}}</span>
            <span>{{item.name}}</span>
          </p>
      </div>
      <div class="hotRight" @click="currentClick(index)">
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
       <div class="popupContent" @click="download">
          <div class="popupContent_body">
            <p><span>下 载 到 本 地</span></p> 
          </div>
       </div>
        <div class="emptybottom" @click="clickPopup">
        </div>
    </div>
    <toast v-model="added" :text="tip" type="text"></toast>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { Scroller,Panel,Toast } from 'vux'
    export default {
        name:'hotList',
        data() {
            return {
              lists: [],
              play:'',
              addStatus:false,
              added:false,
              flag:0,
              tip:'',
              showPopup:false,
              currentMusicSelect:[]
          }
        },
				props:{
					musicLists:Array,
          keyword:String
				},
        components: {
          Scroller,
          Panel,
          Toast
        },
				methods: {
          ...mapMutations({setMusicUrlId:'setMusicUrlId',setMusicList:'setMusicList',setCurrentMusicIndex:'setCurrentMusicIndex'}),
          musicClick(index){
            this.setMusicList(this.musicLists)
            let url = this.musicLists[index].url
            let id = url.substring(9)
            this.setMusicUrlId(id)
            this.setCurrentMusicIndex(index)
            this.$store.commit('play')
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
                console.log(res)
                if(res.insert == "0"){
                   this.addStatus = true
                   $("#addImg").show(300).delay(1000).hide(300);                   
                }
                if(res.insert == "1"){
                  this.addStatus = false
                  this.added = true
                  this.tip = '已添加'
                }
              },
              error: res => {
                alert("error");
              }
            })
          },
          clickPopup(){
            this.showPopup = false
          },
          download(){
            let currentMusic = this.currentMusicSelect
            let title = currentMusic.title
            let name = currentMusic.name
            let url = currentMusic.url 
            $.ajax({
              type:'POST',
              url: "http://127.0.0.1:3000/listen/insert?title="+title+'&name='+name+'&url='+url,
              headers: {"Content-Type": "application/json"},
              success: res => {
                console.log(res)
                  this.showPopup = false
                  this.added = true
                  this.tip = '已添加'
              },
              error: res => {
                alert("error");
              }
            })
          },
          currentClick(index){
            console.log(this.musicLists[index])
            this.showPopup = true
            let currentMusic = this.musicLists[index]
            this.currentMusicSelect = currentMusic
          }
				},
				created (){

				}
    }
</script>

<style lang="scss">
  .hotMain{
		height: 100vh;
    overflow: hidden;
		opacity: .8;
		.hotMainContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 .5rem;
		border-bottom: 1px solid #d4cfcf;
    margin: 0 .5rem;
    .hotLeft{
      width: 92%;
      display: flex;
      align-items: center;
      p{
          img{
						width: 1.5rem;
						height: 1.5rem;
          }
          &:nth-child(1){
						margin: 0 .5rem;
          }
          &:nth-child(2){
            width: 88%;
						display: flex;
						flex-direction: column;
						float: left;
						text-align: -webkit-left;
						span{
						  margin: .1rem 0;
              &:nth-child(1){
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
						}
          }
      }
    }
		.hotRight{
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
    .popupContent{
    position: absolute;
    width: 93% !important;
    height: 8vh !important;
    margin-left: .8rem;
    border-radius: .3rem;
    top: 43% !important;
    background-color: #eee;
    z-Index: 9999;
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    line-height: 1rem;
    }
    .emptybottom{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 51%;
        z-index: 9999;
    }
  }
</style>
