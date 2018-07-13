<template>
  <content-box>
    <div class="searchMain">
        <div class="fleg-img">
		    </div>
      <div class="search">
        <span @click="goBack"><img src="../../../assets/images/musicDetails/left.png" /></span>
        <x-input style="width:100%" placeholder="大家都在搜 易烊千玺" v-model="value" @on-change="searchChange"></x-input>
        <span class="submit" @click.stop="searchSongs">搜索</span>
      </div>
    <div class="showHot" v-if="showHot">  
    <div class="hot">
      <div class="hotList">
        <p v-for="(item,index) in searchHot" @click ="searcClick(index)">{{item.key}}</p>
      </div>
    </div>
    <div class="explation">
      <divider>{{explation}}</divider>
    </div>
    <div class="history">
        <div class="historyList">
          <p></p>
          <p></p>
        </div>
      </div>
     </div>
      <hot-list v-if="musicList" :musicLists="lists" :keyword="word"></hot-list>
      <hot-no v-if="hotNo"></hot-no>
    </div>
  </content-box>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { XInput,Group, XButton, Divider } from 'vux'
import hotList from '../components/hotList.vue'
import hotNo from '../components/hotNo.vue'
    export default {
        name:'search',
        data() {
            return {
              explation:'历史搜索',
              showHot:true,
              value:'',
              word:'',//搜索关键字
              searchHot:[{
                "key":"易烊千玺"
              },{
                "key":"张学友"
              },{
                "key":"后来的我们"
              },{
                "key":"Dick Lee"
              },{
                "key":"后来"
              },{
                "key":"你的名字"
              },{
                "key":"林俊杰"
              },{
                "key":"男孩"
              },{
                "key":"回忆总想哭"
              },{
                "key":"华晨宇"
              }],
              lists:[],
              musicList:false,
              hotNo:false
            }
        },
        components: {
          XInput,
          Group, 
          XButton,
          Divider,
          hotList,
          hotNo 
        },
        methods: {
          ...mapMutations({setMusicList:'setMusicList'}),
          goBack(){
            this.value = ''
            this.musicList = false
            this.hotNo = false
            this.showHot = true
            this.$router.push({name:'listen'})
          },
          searchChange(e){
            this.value = e
          },
          searchSongs(){
            console.log('开始搜索')
             if(this.value == '' || this.value == 'undefined'){
                this.showHot = true
              }else{
                this.showHot = false
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: "http://127.0.0.1:3000/search/keyword?keyword="+this.value,
                    headers: {"Content-Type": "application/json"},
                    success: res => {
                      console.log(res)
                      if(res.musicsList.length != 0){
                        this.showHot = false
                        this.musicList = true
                        this.lists = res.musicsList
                      }else{
                        this.showHot = false
                        this.musicList = false
                        this.hotNo = true
                      }
                    },
                    error: res => {
                      alert("error");
                    }
                });
              }
          },
          searcClick(index){       
            console.log(this.searchHot[index])     
            let searchHot = this.searchHot
            let keyword = searchHot[index].key
            this.value = keyword
            this.word = keyword
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: "http://127.0.0.1:3000/search/keyword?keyword="+this.value,
                headers: {"Content-Type": "application/json"},
                success: res => {
                  console.log(res)
                  this.showHot = false
                  this.musicList = true
                  this.lists = res.musicsList
                },
                error: res => {
                  this.showHot = true
                  alert("error");
                }
            });
          }
        },
        created(){

        }
    }
</script>

<style lang="scss">
  .searchMain{
    height: 100vh;
    overflow: hidden;
    .fleg-img{
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      transition: all 0.5s;
      right: 0;
      z-index: -1;
      background-image: url('../../../assets/images/homeIndex/bgImg.jpg');
      filter: blur(35px);
      background-size: cover;
      background-position: center center;
		}
    .search{
      background: #adcc57;
      display: flex;
      align-items: center;
      height: 3rem;
      img{
        width: 1.5rem;
        height: 1.5rem;
      }
      span:nth-child(1){
          padding: 0 .4rem;
      }
      .submit{
        width: 4rem;
        padding: 0 .3rem 0 .8rem;
       }
    }
    .explation{
      margin: .5rem;
    }
    .hot{
      .hotList{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        p{
          flex: auto;
          width: auto;          
          height: 2rem;
          text-align: center;
          justify-content: center;
          align-items: center;
          display: flex;
          line-height: 2rem;
          font-size: 1rem;
          margin: 0 .5rem;
          margin-top: .9rem;
          padding: 0 .5rem !important;
          border: 1px solid #bebcbc;
          border-radius: .3rem;
        }
      }
    }
    .weui-cells{
      margin-top: 0 !important;
    }
    .weui-cell{
      padding: 0 !important;
    }
    .weui-input{
      padding: .3rem;
      background: white;
      border-radius: .2rem;
    }
    .weui-btn{
      padding: 0 !important;
    }
    .weui-icon-clear{
      display: none !important;
    }
  }
  .hotMainContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 .5rem;
		border-bottom: 1px solid #d4cfcf;
    margin: 0 .5rem;
    .hotLeft{
      display: flex;
      align-items: center;
      p{
          img{
						width: 1.5rem;
						height: 1.5rem;
          }
          &:nth-child(1){
						margin: 0 .5rem;
          }
          &:nth-child(2){
						display: flex;
						flex-direction: column;
						float: left;
						text-align: -webkit-left;
						span{
						  margin: .1rem 0;
						}
          }
      }
    }
		.hotRight{
			img{
				width: 1.5rem;
        height: 1.5rem;
			}
	   }
		}
</style>
