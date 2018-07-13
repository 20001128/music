<template>
  <content-box>
     <my-head
     title="我的歌单"
     >
     </my-head>
     <div class="songListMain">
        <div class="songList">
          <div class="songList_head">
             <p @click="build"><img src="../../../assets/images/songLists/add.png" /><span>新建</span></p>
          </div>
          <div class="songList_text">
            <p>自建的歌单({{listSum}})</p>
          </div>
        <div class="songList_body">
           <div class="songList_body_child" v-for="(item,index) in lists" @click="clickLists(index)">
              <div class="songList_body_child_left">
                 <p><img src="../../../assets/images/musicDetails/bmg.jpg"></p>
                 <p>
                    <span>{{item.list}}</span>
                    <span>共 {{lists.length}} 首</span>
                 </p>
              </div>
              <div class="songList_body_child_right" @click="cancel(index)">
                 <p :class="index == 0?'hidden':''"><img src="../../../assets/images/songLists/cancel.png"></p>
              </div>
           </div>
        </div>
      </div>
     </div>
     <confirm v-model="showConfirm"
      show-input
      ref="confirm5"
      title="新建歌单"
      placeholder="新建歌单"
      confirm-text="确定"
      cancel-text="取消"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      >
      </confirm>
  </content-box>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  data() {
    return {
      showConfirm:false,
      text:'新建歌单',
      listSum:0,
      lists:[],
      songList:[],
      listMenu:[]
    }
  },
    directives: {
    TransferDom
  },
  components:{
     Confirm
  },
  methods: {
    build(){
      this.showConfirm = true
    },
    onCancel(){
      console.log('取消了')
    },
    onConfirm(val) {
      console.log(1111)
      if(val.length){
         
      }
      console.log(this.lists)
    },
    editor(){
      this.$router.push({name:'editor',params:{lists:this.lists}})
    },
    clickLists(index){
      console.log(index)
      let word = this.lists[index].list
      console.log(word)
      this.$router.push({name:'listMusics',params:{word:word}})
    },
    cancel(index){
      console.log(index)
    }
  },
  created(){
    $.ajax({
      type:'GET',
      url:'http://127.0.0.1:3000/listen/songList',
      headers: {"Content-Type": "application/json"},
      success:res => {
        console.log(res)
        this.lists = res.songList
      },
      error: res => {
        alert("error");
      }
    })
      $.ajax({
      type:'GET',
      url:'http://127.0.0.1:3000/listen/listMenu',
      headers: {"Content-Type": "application/json"},
      success:res => {
        console.log('歌单列表')
        console.log(res)
        this.listMenu = res.listMenu
      },
      error: res => {
        alert("error");
      }
    })
  }
}
</script>

<style lang="scss">
  .songListMain{
    height: 88vh;
    overflow-y: hidden;
    background: url('../../../assets/images/homeIndex/bgImg.jpg') no-repeat;
    background-size: cover;
    opacity: 0.8;
    background-position: center center;
    .songList{
      .songList_head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5rem;
        box-shadow: 0 1px #e6e6e6;
        p{
          img{
            width: 1rem;
            height: 1rem;
          }
          span{
            margin-left: .3rem;
            color:#1250de;
          }
        }
      }
      .songList_text{
        background: #eef3f3;
        padding: .3rem;
        p{
          margin: 0 !important;
        }
      }
      .songList_body{
        padding: 0 .5rem;
        .weui-cell{
          padding: 0;
        }
        .songList_body_child{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 .5rem;
          box-shadow: 0 2px #e6e6e6;
          .songList_body_child_left{
            display: flex;
            align-items: center;
            p:nth-child(1){
              img{
                width: 3rem;
                height: 3rem;
              }
            }
            p:nth-child(2){
              display: flex;
              flex-direction: column;
              margin-left: .5rem;
              span{
                margin: .2rem 0
              }
            }
          }
          .songList_body_child_right{
            margin-right: .3rem;
            img{
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        }
      }
    }
    .hidden{
      display: none
    }
  }
</style>
