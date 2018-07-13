<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'contentBox',
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
  .main{
    width: 100%;
  }
</style>
