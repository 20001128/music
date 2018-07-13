<template>
  <div class="appheader">
    <div class="header">
      <!--头部左边-->
      <!--<div class="header-left">-->
        <!--<slot name="header-left-slot">{{leftOptions}}</slot>-->
      <!--</div>-->
      <!--头部中间-->
      <div class="header-middle">
      <p class="img" @click="goback"><img src="../assets/images/musicDetails/left.png"></p>
      <p class="header-middle-title">{{title}}</p>
      </div>
      <!--头部右边-->
      <div class="header-right">
        <slot name="header-right-slot">{{rightOptions}}</slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let headerData = ({title,leftOptions,rightOptions,alpha = 1, display = true}) => {
    return {
      title,
      leftOptions,
      rightOptions,
      alpha,
      display
    }
  };
    export default {
    name: 'myHead',
      data() {
        return {
          isNative: process.env.NODE_ENV !== 'development'
        }
      },
      props: {
        alpha: {
          type: Number,
          default: 1
        },
        display: {
          type: Boolean,
          default: true
        },
        title: {
          type: String,
          default: ''
        },
        leftOptions: {
          type: String,
          default: ''
        },
        rightOptions: {
          type: String,
          default: ''
        }
      },
      methods: {
        goback(){
          this.$router.go(-1)
        }
      }
  }
</script>

<style lang="scss">
  .header-middle{
    display: flex;
    flex: 1;
    width: 100%;
    font-weight: 400;
    justify-content: center;
  }
  .header-middle .img{
    position: absolute;
    top: 0px;
    left: 10px;
  }
  .header-middle p img{
    width:25px;
    height: 20px;
    margin-top: -.2rem;
  }
  .header-middle .header-middle-title{
   margin-top: 16px;
  }
  .appheader{
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
  }
  .header{
    height: 3rem;
    background: #cbcab3 !important;
    color: white;
    text-shadow:0 0 0.2em #ffffff,
    -0 -0 0.2em #ffffff !important;
    line-height: 1rem;
    font-size: 1.1rem;
  }
</style>
