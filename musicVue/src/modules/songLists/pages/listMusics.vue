<template>
  <content-box>
     <my-head
     title="我的歌单"
     >
     </my-head>
     <div class="songListsMain">
		<div class="songListsContent" v-for="(item,index) in listMusics" @click.stop="musicClick(index)">
      <div class="songLeft">
          <p><img src="../../../assets/images/searchSong/add.png" /></p>
          <p>
            <span>{{item.title}}</span>
            <span>{{item.name}}</span>
          </p>
      </div>
      <div class="songRight">
          <p><img src="../../../assets/images/musicDetails/more.png" /></p>
      </div>
		</div>
  </div>
  </content-box>
</template>

<script>
import {mapMutations} from 'vuex'
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  name:'listMusics',
  data() {
    return {
      listMusics:[]
    }
  },
    directives: {
    TransferDom
  },
  components:{
     Confirm
  },
  methods: {
    ...mapMutations({setMusicList:'setMusicList',setCurrentMusicIndex:'setCurrentMusicIndex',setMusicUrlId:'setMusicUrlId'}),
    musicClick(index){
      this.setCurrentMusicIndex(index)
      console.log(this.listMusics[index])
      let musicId = this.listMusics[index].url.substring(9)
      this.setMusicUrlId(musicId)
    }
  },
  created(){
    console.log(this.$route.params.word)
    let word = this.$route.params.word
      $.ajax({
      type:'POST',
      url:'http://127.0.0.1:3000/listen/listMenuSearch?word='+word,
      headers: {"Content-Type": "application/json"},
      success:res => {
        console.log(res)
        this.listMusics = res.listMenuSearch
      },
      error: res => {
        alert("error");
      }
    })
  }
}
</script>

<style lang="scss">
  .songListsMain{
    height: 88vh;
    overflow: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
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
						display: flex;
						flex-direction: column;
						float: left;
						text-align: -webkit-left;
						span{
						  margin: .1rem 0;
						}
          }
      }
    }
		.songRight{
			img{
				width: 1.5rem;
        height: 1.5rem;
			}
	   }
		}
  }
</style>
