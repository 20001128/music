<template>
  <content-box>
     <my-head
     title="已删歌曲"
     >
     </my-head>
     <div class="deleteMain">
     <song-lists :musicLists="lists"></song-lists>
     </div>
  </content-box>
</template>

<script>
import songLists from '../../like/components/songLists.vue'
export default {
  data() {
    return {
      lists:[]
    }
  },
  components: {
      songLists
  },
  mounted(){

  },
  activated(){
       $.ajax({
        type: 'GET',
        url: "http://127.0.0.1:3000/listen/deleted",
        headers: {"Content-Type": "application/json"},
        success: res => {
          console.log(res)
          if(res.deleteList.length){
            this.lists = res.deleteList
          }
        },
        error: res => {
          alert("error");
        }
    });
  }
}
</script>

<style>
 .deleteMain{
    height: 88vh;
    overflow: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
 }
</style>
