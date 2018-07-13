<template>
   <content-box>
     <my-head
       title="分类"
       >
       </my-head>
      <div class="songTypeMain">
        <div class="singerTypeContent">
        <div class="singerSearch">
          <x-input style="width:100%" placeholder="你想搜啥？" v-model="value" @on-change="searchChange"></x-input>
          <span class="submit" @click.stop="searchSongs">搜索</span>
        </div>
        <div class="songContent" v-if="List">
          <div class="china">
           <div class="chinaSinger" v-for="(item,index) in chinaSinger" @click="chinaClick(chinaSinger,index)">
              <p><span>{{item.name}}</span><span><img src="../../../assets/images/listen/to_right.png" /></span></p>
            </div>
          </div>                        
          <div class="Jepan">
            <div class="JepanSinger" v-for="(item,index) in JepanSing" @click="JepanSingClick(JepanSing,index)">
               <p><span>{{item.name}}</span><span><img src="../../../assets/images/listen/to_right.png" /></span></p>
            </div>
          </div>
          <div class="OuMei">
            <div class="OuMeiSinger" v-for="(item,index) in ouMei" @click="ouMeiClick(ouMei,index)">
               <p><span>{{item.name}}</span><span><img src="../../../assets/images/listen/to_right.png" /></span></p>
            </div>
          </div>
          <div class="hanguo">
            <div class="hanguoSinger" v-for="(item,index) in hanguo" @click="hanguoClick(hanguo,index)">
               <p><span>{{item.name}}</span><span><img src="../../../assets/images/listen/to_right.png" /></span></p>
            </div>
          </div>
        </div>
        </div>
        <song-lists v-if="showList" :musicLists="lists"></song-lists>
      </div>
   </content-box>
</template>
<script>
import { XInput } from 'vux'
import songLists from '../../like/components/songLists.vue'
import hotList from '../../searchMore/components/hotList.vue'
export default {
  name:'songType',
  data() {
      return {
        chinaSinger:[{
          "name":"华语女歌手"
        },{
          "name":"华语男歌手"
        },{
          "name":"华语组合/乐队"
        }],
        JepanSing:[{
          "name":"日本女歌手"          
        },{
          "name":"日本男歌手"
        },{
          "name":"日本组合/乐队"
        }],
        ouMei:[{
          "name":"欧美女歌手"
        },{
          "name":"欧美男歌手"
        },{
          "name":"欧美男歌手"
        }],
        hanguo:[{
          "name":"韩国女歌手"
        },{
          "name":"韩国男歌手"
        },{
          "name":"日本组合/乐队"
        }],
        value:'',
        List:true,
        showList:false
      }
  },
  components:{
    XInput,
    hotList,
    songLists
  },
  methods:{
    chinaClick(chinaSinger,index){
     this.getSingerList(chinaSinger,index)
  },
  JepanSingClick(JepanSing,index){
    this.getSingerList(JepanSing,index)
  },
  ouMeiClick(ouMei,index){
     this.getSingerList(ouMei,index)
  },
  hanguoClick(hanguo,index){
    console.log(index)
     this.getSingerList(hanguo,index)
  },
  getSingerList(items,index){
    let name = items[index].name
    console.log(name)
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "http://127.0.0.1:3000/singer/name?name="+name,
        headers: {"Content-Type": "application/json"},
        success: res => {
          if(res.singerList.length != 0){
            this.$router.push({name:'songTypeSinger',params:{singerList:res.singerList}})
          }
        },
        error: res => {
          alert("error");
        }
    })
  },
    searchChange(val){
      this.value = val
    },
    searchSongs(){
      if(this.value.length){
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "http://127.0.0.1:3000/search/keyword?keyword="+this.value,
        headers: {"Content-Type": "application/json"},
        success: res => {
          if(res.musicsList.length != 0){
            this.List = false
            this.showList = true
            this.lists = res.musicsList
          }
        },
        error: res => {
          alert("error");
        }
    });
      }
    }
  },
  activated() {  
    this.List = true
    this.showList = false
  } 
}
</script>
<style lang="scss">
@import '../scss/index.scss';
</style>
