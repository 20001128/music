<template>
   <content-box>
       <my-head
       title="本地音乐"
       >
       </my-head>
       <div class="songsMain">
           <song-list :musicLists="lists"></song-list>
       </div>
   </content-box>
</template>

<script>
import songList from './../../like/components/songLists.vue'
export default {
  data() {
    return {
        lists:[]
    }
  },
  components: {
      songList
  },
  activated(){
        $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/localMusic",
        headers: {"Content-Type": "application/json"},
        success: res => {
          this.lists = res.musicsList
        },
        error: res => {
          alert("error");
        }
    });
  }
}
</script>

<style>
  .songsMain{
    height: 88vh;
    overflow: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
  }
</style>
