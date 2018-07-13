<template>
   <content-box>
     <my-head
       title="分类"
       >
       </my-head>
      <div class="songTypeSingerMain">
        <scroller lock-x height="85vh" ref="scrollerEvent" v-if="showScroller">
            <div>
                <div class="songTypeSingerContent" v-for="(item,index) in singerList" @click="singerListClick(index)">
                    <p><span>{{item.name}}</span></p>
                </div>
            </div>
         </scroller>
        <song-lists v-if="showList" :musicLists="lists"></song-lists>
        <hot-no v-if="!showList"></hot-no>
      </div>
   </content-box>
</template>
<script>
import songLists from '../../like/components/songLists.vue'
import hotNo from '../../searchMore/components/hotNo.vue'
import { Scroller} from 'vux'
export default {
  name:'songTypeSinger',
  data() {
      return {
          singerList:[],
          lists:[],
          showScroller:true,
          showList:false
      }
  },
    components: {
       Scroller,
       songLists,
       hotNo
    },
    methods:{
      singerListClick(index){
        let name = this.singerList[index].name
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "http://127.0.0.1:3000/singer/song?name="+name,
            headers: {"Content-Type": "application/json"},
            success: res => {
                console.log(res)
                if(res.singerList.length){
                    this.showList = true
                    this.showScroller = false
                    this.lists = res.singerList
                }else{
                    this.showList = false
                    this.showScroller = false
                }
            },
            error: res => {
            alert("error");
            }
        })
      }
    },
    created(){
      this.singerList = this.$route.params.singerList
  },
  
}
</script>
<style lang="scss">
  .songTypeSingerMain{
    height: 85vh;
    overflow: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
     .songTypeSingerContent{
        display: flex;
        align-items: center;
        color: white;
        padding-left: .5rem;
        border-bottom: 1px solid #bdb0b0;
        p{
            margin: .7rem .4rem !important;
        }
     }
  }
</style>
