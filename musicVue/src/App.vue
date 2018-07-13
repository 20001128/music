<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <audio id="audio" ref="audio" autoplay="autoplay" controls="controls" preload="auto"
     :src="musicUrl" @playing="musicOnPlaying" @timeupdate="musicTimeUpdate" @ended="musicEnded" @canplay="musicCanPlay" @pause="musicOnPause">
     </audio>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import store from './store'
export default {
  name: 'app',
  data() {
    return {
      isPlay:false
    }
  },
  computed:{
    musicUrl(){
      console.log('http://music.163.com/song/media/outer/url?id='+this.$store.getters.getMusicUrlId+'.mp3')
      return 'http://music.163.com/song/media/outer/url?id='+this.$store.getters.getMusicUrlId+'.mp3'
    }
  },
  methods:{
    ...mapMutations({setLyricIndex:'setLyricIndex',setMusicList:'setMusicList',setAudio:'setAudio',setMusicTimeUpdate:'setMusicTimeUpdate',setMusicDuration:'setMusicDuration'}),
    //audio.currentTime和audio.duration分别表示当前播放时间和音频总时间
    //音乐播放结束时播放下一首
    musicEnded(){
      let index = 0
      this.$store.commit('endPlayStatus')
      this.setLyricIndex(index)
    },
    // 音乐播放时间更新事件
    musicTimeUpdate(){
      this.setMusicTimeUpdate(Math.floor(this.$refs.audio.currentTime))
    },
    // 可以播放事件canplay
    musicCanPlay(){
      this.setMusicDuration(this.$refs.audio.duration)
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      this.$store.commit('play')
    },
    // 音乐处于暂停状态pause
    musicOnPause () {
      this.$store.commit('pause')
    }
  },
  created(){
    $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/localMusic",
        headers: {"Content-Type": "application/json"},
        success: res => {
          console.log(res)
          this.setMusicList(res.musicsList)
          this.setAudio(this.$refs.audio)
        },
        error: res => {
          alert("error");
        }
    });
  }
}
</script>

<style>
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
  #audio{
    display: none
  }
</style>
