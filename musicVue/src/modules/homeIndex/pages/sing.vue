<template>
  <content-box>
    <div class="singMain">
      <div class="singSwiper">
         <swiper :list="swiperList" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
      </div>
      <div class="sing_content">
         <div class="singImg">
            <p><img src="../../../assets/images/sing/singing.png" /><span>我要唱</span></p>
         </div>
      </div>
      <div class="singList">
        <div class="singList_content">
          <p><img src="../../../assets/images/sing/singing.png"/></p>
          <p>
            <span>我唱的歌</span>
            <span>共 {{sum}} 首</span>
          </p>
        </div>
      </div>
    </div>
  </content-box>
</template>

<script type="text/ecmascript-6">
import { Swiper, SwiperItem } from 'vux'
const swiperImg = [
    require('../../../assets/images/sing/sing01.jpg'),
    require('../../../assets/images/sing/sing02.jpg'),
    require('../../../assets/images/sing/sing03.jpg')
  ]
const swiperImgList = swiperImg.map((one, index) => ({
  url: 'javascript:',
  img: one
}))
  export default {
    data() {
      return {
        swiperList:swiperImgList,
        sum:0
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style lang="scss">
  .singMain{
    margin: .5rem;
    .singSwiper{
      .vux-slider{
        width: 100% !important;
      }
    }
    .sing_content{
      display: flex;
      justify-content: center;
      margin: 2rem;
      .singImg{
        width: 7rem;
        height: 7rem;
        border-radius: 100%;
        background: red;
        opacity: .5;
        padding: .6rem;
        display: flex;
        justify-content: center;
        p{
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          flex-direction: column;
          img{
            width: 5rem;
            height: 5rem;
          }
        }
      }
    }
    .singList{
      .singList_content{
        display: flex;
        align-items: center;
        color: white;
        border-top: 1px solid #e6e6e6;
        padding: .5rem;
        background: #232316;
        opacity: .5;
        p:nth-child(1){
          background: #d6acb7;
          display: flex;
          align-items: center;
          padding: .3rem;
          img{
            width: 2rem;
            height: 2rem;
          }
        }
        p:nth-child(2){
          margin: 0 !important;
          margin-left: .4rem !important;
          display: flex;
          flex-direction: column;
          span:nth-child(1){
            margin: .2rem 0;
          }
        }
      }
    }
  }
</style>
