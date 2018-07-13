<template>
  <content-box>
		<div class="footerMain">
		<div class="fleg-img">
		</div>
			<div class="footerHead">
				<ul>
					<li><span @click="goBack"><img src="../../../../static/images/musicDetails/left.png"/></span</li>
					<li>
						<p v-if="title.length<15">{{title}}</p>
						<p v-else><marquee direction=left scrollamount=3>{{title}}</marquee></p>
						<p v-if="name.length<15">{{name}}</p>
						<p v-else><marquee direction=left scrollamount=3>{{name}}</marquee></p>
					</li>
					<li><img src="../../../../static/images/musicDetails/shape.png"/></li>
				</ul>
			</div>
			<!--<div class="borderStyle"></div>-->
			<div class="footerBody" v-if="!showLyric">
				<div class="footerBodyBorder" @click="lyric">
					<img :src="musicImg"/>
				</div>
			</div>
			<div class="footerBodyLyric" v-if="showLyric" @click="hiddenLyric"  ref="lrc" :scroll-top.prop="scrollTop">
				<scroller lock-x height="65vh" ref="scrollerEvent">
					<div>
					<div class="showLyric" ref="divlrc">
						<p v-for="(item,index) in lyricList" :data-index="index" :class="lrcIndex === index ? 'musiclrc' : ''" :data-timeid="lyricList[index].substring(0,11)">{{item.substring(11)}}</p> 
					</div>
					</div>
				</scroller>
			</div>
			<div class="footerBottom">
				<div class="footerBottomOperation">
					<ul>
						<li><span @click="like"><img :src="likeImg" /></span></li>
						<li><span @click="download"><img src="../../../assets/images/musicDetails/download.png" /></span></li>
						<li><span><img src="../../../assets/images/musicDetails/comments.png" /></span></li>
						<li><span><img src="../../../assets/images/musicDetails/more.png" /></span></li>
					</ul>
				</div>
					<div class="footerBodyRange">
						<range></range>
					</div>
					<div class="footerBodyPlayer">
						<div class="footerBodyPlayer_ower">
							<ul>
								<li><span @click="playType"><img :src="playTypeImg" /></span></li>
								<li><span @click="lastPlay"><img src="../../../assets/images/footer/last.png" /></span></li>
								<li><span @click="play"><img :src="playImg" /></span></li>
								<li><span @click="nextPlay"><img src="../../../assets/images/footer/next.png" /></span></li>
								<li><span @click="showList"><img src="../../../assets/images/footer/lists.png" /></span></li>
				    	</ul>
						</div>
					</div>
			</div> 
			<div class="popup" v-if="showPopup">
      <div class="empty" @click="clickPopup">
        </div>
      <div class="popupContent">
         <div class="popupContent_head">
            <p>顺序播放({{mun}})</p>
            <p @click="deleteAll"><img src="../../../assets/images/footer/delete.png" /></p>
         </div>
          <scroller lock-x height="45vh" ref="scrollerEvent">
            <div>
            <div class="popupContent_body">
                <div class="popupContent_body_list" v-for="(item,index) in popupList">
                  <div class="popupContent_left">
                    <p @click="popupListClick(index)">
                      <span :class="currentIndex == index?'showListening':'listening'"><img src="../../../assets/images/footer/listening.png" /></span>
                      <span :class="currentIndex == index?'showListening':''">{{item.title}}</span>
                    </p>
                    <p @click="deleted(index)"><img src="../../../assets/images/footer/delete01.png" /></p>
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
		<toast v-model="added" :text="addtext" type="text"></toast>
		</div>
  </content-box>
</template>

<script type="text/ecmascript-6">
import {mapState,mapMutations} from 'vuex'
import range from '../component/range.vue'
import { Scroller, Confirm, Toast} from 'vux'
  export default {
    name:'footer-bar',
    data() {
      return {
				playImg:require('../../../assets/images/footer/play.png'),
				showLyric:false,
				scrollTop: 0,
				currentLrcIndex: 0,
				showPopup:false,
				mun:0,
				popupList:[],
				currentIndex: 0,
				showConfirm:false,
				tip:'确定清空播放列表吗?',
				added:false,
				addtext:''
			}
    },
		components: {
			range,
			Scroller,
			Confirm,
			Toast
		},
		computed:{
			currentTime(){
				return this.$store.getters.getCurrentTime?this.$store.getters.getCurrentTime:''
			},
			lyricList(){
				return this.$store.getters.getCurrentMusicLyric?this.$store.getters.getCurrentMusicLyric:''
			},
			lrcIndex () {
				return this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
			},
			likeImg(){
				let status = this.$store.getters.getLikeType
				let Img = ''
				if(status == 0){
           Img = require('../../../assets/images/musicDetails/liked.png')
				}else{
					Img = require('../../../assets/images/musicDetails/like.png')
				}
				return Img
			},
			playTypeImg(){
				let status = this.$store.getters.getPlayType
				let bmg = ''
				switch(status){
					case 1:
						bmg = require('../../../assets/images/footer/listsRout.png')
						break;
					case 2:
					  bmg = require('../../../assets/images/footer/random.png')
						break;
					case 3:
					  bmg = require('../../../assets/images/footer/rout.png')
				}
				return bmg
			},
			musicImg(){
				return this.$store.getters.getCurrentMusic ? 'https://api.hibai.cn/music/Music/Music?id='+this.$store.getters.getCurrentMusic.url.substring(9)+'&type=pic' : ''
			},
			title(){
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.title : ''
			},
			name(){
        return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.name : ''
			}		
		},
		watch: {
			lrcIndex: function (newisPlay, oldisPlay) {
				this.currentLrcIndex = newisPlay
				if (document.getElementsByClassName('musiclrc')[newisPlay]) {
					let height = this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[newisPlay].offsetTop
					this.scrollTop = top - height / 2
				}
			}
		},
		mounted () {
			let _this = this
			setInterval(function () {
				if (_this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[_this.currentLrcIndex]) {
					let height = _this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[_this.currentLrcIndex].offsetTop
					_this.scrollTop = top - height / 2
				}
			}, 2000)
		},
		methods: {
			...mapMutations({setFlag:'setFlag',setMusicUrlId:'setMusicUrlId',setLyric:'setLyric',setMusicList:'setMusicList',setCurrentMusicIndex:'setCurrentMusicIndex'}),
			goBack(){
				this.$router.go(-1)
			},
			playType(){
				this.$store.commit('playStatus')
			},
			lastPlay(){

			},
			play(){
				this.$store.commit('togglePlay')
				if(this.$store.getters.getIsPlaying == true){
				   this.playImg = require('../../../assets/images/footer/stop.png')
				}else{
				  this.playImg = require('../../../assets/images/footer/play.png')
				}
			},
			//下一曲
			nextPlay(){
				this.playImg = require('../../../assets/images/footer/stop.png')
				this.$store.commit('playNext')
				let id = this.$store.getters.getMusicUrlId
				 $.ajax({ 
					type : "get",  
					dataType: 'text',
					jsonp: "callback",
					jsonpCallback:"jsonpCallback",
					url: "https://api.hibai.cn/music/Music/Music?id="+id+"&type=lrc",
					success: res => {
					this.lyric = res.split('\n')
					this.setLyric(this.lyric)
					}
				});
			},
			lastPlay(){
				this.playImg = require('../../../assets/images/footer/stop.png')
				this.$store.commit('playPrev')
				let id = this.$store.getters.getMusicUrlId
				 $.ajax({ 
					type : "get",  
					dataType: 'text',
					jsonp: "callback",
					jsonpCallback:"jsonpCallback",
					url: "https://api.hibai.cn/music/Music/Music?id="+id+"&type=lrc",
					success: res => {
					this.lyric = res.split('\n')
					this.setLyric(this.lyric)
					}
				});
			},
			lyric(){
				this.showLyric = true
			},
			hiddenLyric(){
				this.showLyric = false
			},
			like(){
				let currentMusic = this.$store.getters.getCurrentMusic
				let title = currentMusic.title
				let name = currentMusic.name
				let url = currentMusic.url 
				$.ajax({
					type:'POST',
					url: "http://127.0.0.1:3000/search/add?title="+title+'&name='+name+'&url='+url,
					headers: {"Content-Type": "application/json"},
					success: res => {
						console.log(res)
						  this.added = true
							this.addtext = '已添加'
					},
					error: res => {
						alert("error");
					}
				})
			},
			download(){
        let currentMusic = this.$store.getters.getCurrentMusic
				let title = currentMusic.title
				let name = currentMusic.name
				let url = currentMusic.url 
				$.ajax({
					type:'POST',
					url: "http://127.0.0.1:3000/listen/insert?title="+title+'&name='+name+'&url='+url,
					headers: {"Content-Type": "application/json"},
					success: res => {
						console.log(res)
							this.added = true
							this.addtext = '已加入下载列表'
					},
					error: res => {
						alert("error");
					}
				})
			},
			showList(){
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
			clickPopup(){
				this.showPopup = false
			},
			 popupListClick(index){
            console.log(index)
              if(index >= 0){
                this.currentIndex = index
              }else{
                this.currentIndex = 1000
              }
							let id = this.popupList[index].url.substring(9)
						 $.ajax({ 
								type : "get",  
								dataType: 'text',
								jsonp: "callback",
								jsonpCallback:"jsonpCallback",
								url: "https://api.hibai.cn/music/Music/Music?id="+id+"&type=lrc",
								success: res => {
								this.lyric = res.split('\n')
								this.setLyric(this.lyric)
								}
							});
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
			let status = this.$store.getters.getIsPlaying
			let currentMusic = this.$store.getters.getCurrentMusic
			if(status){
					this.playImg = require('../../../assets/images/footer/stop.png')
			}else{
				this.playImg = require('../../../assets/images/footer/play.png')
			}
		}
  }
</script>

<style lang="scss">
  @import '../scss/footer.scss';
</style>
