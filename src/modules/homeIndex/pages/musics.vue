<template>
   <content-box>
      <div class="songTypeMain">
        <div class="search_input">
            <p @click="search"><img src="../../../assets/images/musics/search.png" /><span>搜索</span></p>
        </div>
        <div class="search_swiper">
          <swiper :list="swiperList" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div class="musicsType">
           <div class="musicsType_content" v-for="(item,index) in musicsTypeList" @click="musicType(index)">
             <p><img :src="item.img" /><span>{{item.text}}</span></p>
           </div>
        </div>
      </div>
   </content-box>
</template>
<script>
import { Swiper, SwiperItem } from 'vux'
  const swiperImg = [
      require('../../../assets/images/musics/timg.jpg'),
      require('../../../assets/images/musics/timg01.jpg'),
      require('../../../assets/images/musics/timg02.jpg'),
      require('../../../assets/images/musics/timg03.jpg'),
      require('../../../assets/images/musics/timg04.jpg'),
    ]
  const swiperImgList = swiperImg.map((one, index) => ({
    url: 'javascript:',
    img: one
  }))
export default {
  name:'songType',
  data() {
      return {
        swiperList:swiperImgList,
        musicsTypeList:[{
          "img":require('../../../assets/images/musics/singer.png'),
          "text":"歌手"
        },{
          "img":require('../../../assets/images/musics/ranking.png'),
          "text":"排行"
        },{
          "img":require('../../../assets/images/musics/type.png'),
          "text":"分类"
        },{
          "img":require('../../../assets/images/musics/video.png'),
          "text":"视频"
        },{
          "img":require('../../../assets/images/musics/receiver.png'),
          "text":"电台"
        }]
      }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    search(){
      this.$router.push({name:'search'})
    },
    musicType(index){
        if(index == 0){
          this.$router.push({name:'listen'})
          //  this.$router.push({name:'singers'})
        }else if(index == 1){
          this.$router.push({name:'listen'})
          // this.$router.push({name:'ranking'})
        }else if(index == 2){
          this.$router.push({name:'songType'})
        }else if(index == 3){
          this.$router.push({name:'listen'})
          // this.$router.push({name:'receiver'})
        }else{
          this.$router.push({name:'listen'})
          // this.$router.push({name:'video'})
        }
    }
  }
}
</script>
<style lang="scss">
  .songTypeMain{
     .search_input{
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        opacity: .5;
        margin: .5rem 0;
        border-radius: 0.3rem;
        p{
          align-items: center;
          display: flex;
          margin: .3rem !important;
          img{
             width: 1.3rem;
             height: 1.3rem;
          }
          span{
            margin-left: .3rem;
          }
        }
     }
     .search_swiper{
       height: 10rem;
       img{
         height: 10rem;
       }
       .vux-slider{
         width: 100% !important;
       }
     }
     .musicsType{
        margin: 2.7rem 1rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
       .musicsType_content{
         padding: 0 1rem;
         p{
           display: flex;
           align-items: center;
           font-size: 1.1rem;
           color: white;
           img{
             width: 1.7rem;
             height: 1.7rem;
           }
           span{
             margin-left: .2rem;
           }
         }
       }
     }
  }
</style>
