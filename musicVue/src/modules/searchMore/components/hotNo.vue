<template>
  <div>
  <div class="hotMain">
     <div class="hotNo">
        <div class="hotNoImg">
            <img src="../../../assets/images/searchSong/none.png" />
            <p>没有找到你想要的结果</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

          }
        },
        created (){

        }
    }
</script>

<style lang="scss">
.hotMain{
  .hotNo{
    .hotNoImg{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 7rem;
      color: #111707;
      img{
        width: 10rem;
        height: 10rem;
      }
    }
  }
}
</style>
