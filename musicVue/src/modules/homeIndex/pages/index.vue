<template>
  <content-box>
    <div class="homeMian">
    <div class="homeHead">
      <div class="kg" @click="kgClick">
        <p>K</p>
      </div>
      <div class="tabItem">
        <tab>
          <tab-item selected @on-item-click="onItemClick">听</tab-item>
          <tab-item @on-item-click="onItemClick">音乐馆</tab-item>
          <tab-item @on-item-click="onItemClick">唱</tab-item>
        </tab>
      </div>
      <div class="kg" @click="search">
        <img src="../../../../static/images/homeIndex/search_black.png">
      </div>
    </div>
    <div>
    </div>
    <router-view></router-view>
    <div class="popupRegistar" v-if="showPopup" @click="clickPopup">
      <div class="popupContent">
         <div class="popupContent_body">
            <div class="popupContent_body_fit">
              <p><img src="../../../assets/images/homeIndex/bgImg.jpg"/></p>
              <p v-if="loading" @click="loaded">
                <span>{{username}}  ID:{{userid}}</span>
              </p>
              <p v-if="!loading" @click="registar">登录/注册</p>
            </div>
            <div class="popupMain">
              <p><span>启动问候声</span></p>
              <p><span>皮肤中心</span></p>
              <p><span>关于爽我音乐</span></p>
            </div>
         </div>
      </div>
    </div>
        </div>
  </content-box>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem} from 'vux'
  export default {
    name:'homeIndex',
    data() {
      return {
        showPopup:false,
      }
    },
    components: {
      Tab,
      TabItem
    },
    computed:{
      username(){
        return this.$store.getters.getUserInfo?this.$store.getters.getUserInfo.userInfo[0].userName:''
      },
      userid(){
        return this.$store.getters.getUserInfo?this.$store.getters.getUserInfo.userInfo[0].id:''
      },
      loading(){
        return this.$store.getters.getUserInfo?this.$store.getters.getUserInfo.flag:''
      }
    },
    methods:{
      onItemClick(index){
        console.log(index)
        if(index == 0){
          this.$router.push({name: 'listen'})
        }else if(index == 1) {
          this.$router.push({name: 'musics'})
        }else{
          this.$router.push({name: 'sing'})
        }
      },
      kgClick(){
        this.showPopup = true
      },
      search(){
        this.$router.push({name: 'song'})
      },
      clickPopup(){
        this.showPopup = false
      },
      registar(){
        this.$router.push({name: 'registar'})
      },
      loaded(){
        
      }
    },
    created(){
      this.$router.push({name: 'listen'})
      console.log(this.userState)
      let userState = this.userState
      if(userState){ //已登录
        this.loading = true
      }else{
        this.loading = false
      }
    }
  }
</script>

<style lang="scss">
 @import '../scss/index.scss';
</style>
