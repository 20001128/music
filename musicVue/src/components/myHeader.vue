<template>
  <div class="header">
    <div class="headerContent">
      <slot name="left"></slot>
      <slot name="middle"></slot>
      <slot name="right"></slot>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    }
  }
</script>

<style lang="scss">

  #app{
    margin: 0px;
    padding: 0px;
  }
  a{
    flex: 1;
    text-align: center;
    text-decoration: none !important;
  }
  .active{
    text-decoration: none !important;
    color: white !important;
    font-weight: bold;
    text-shadow: 0 0 10px #fff;
  }
</style>
