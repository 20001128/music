<template>
   <content-box>
       <my-head
       title="登录/注册"
       >
       </my-head>
       <div class="loginMain">
           <div class="loginContent">
               <div class="loginInfo">
                 <p><x-input title="用户名" v-model="userName" placeholder="请输入用户名或ID号" @on-change="userNameChange"></x-input></p>
                 <p><x-input title="密码" type="password" v-model="password" placeholder="请输入密码" @on-change="passwordChange"></x-input></p>
                 <x-button @click.native="loading" type="warn">登  录</x-button>
               </div>
               <div class="noRegistar">
                 <p @click="registar">还没注册？点我注册</p>
               </div>
           </div>
           <toast v-model="showToast" :text="tip" type="text"></toast>
       </div>
   </content-box>
</template>

<script>
import { mapMutations } from 'vuex'
import { XInput, XButton, Toast } from 'vux'
export default {
  data() {
    return {
        userName:'',
        password:'',
        showToast:false,
        tip:''
    }
  },
  components:{
    XInput,
    XButton,
    Toast
  },
  methods: {
    ...mapMutations({setUserInfo:'setUserInfo'}),
    userNameChange(val){
      this.userName = val
    },
    passwordChange(val){
      this.password = val
    },
    loading(){
      let userName = this.userName
      let password = this.password
      if(userName == '0' || userName == 'undefinded'){
        this.showToast = true
        this.tip = '用户名不能为空'
      }else if(password == '' || password == 'undefinded'){
        this.showToast = true
        this.tip = '密码不能为空'
      }else{
        $.ajax({
          type:'POST',
          dataType: 'json',
          url:'http://127.0.0.1:3000/login/loading?userName='+userName+'&password='+password,
          headers: {"Content-Type": "application/json"},
          success: res => {
            console.log(res)
            this.operation(res.text)
            if(res.flag == true){
              this.$router.push({name: 'listen'})
              this.setUserInfo(res)
            }
          }
        })
      }
    },
    operation(text){
      this.showToast = true
      this.tip = text
    },
    registar(){
      this.$router.push({name:'userInfo'})
    }
  },
  created(){

  }
}
</script>

<style lang="scss">
  .loginInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5rem;
    p{
      margin-left: 4rem;
      border-bottom: 1px solid #e6e6e6;
    }
    .weui-cell__hd{
      width: 4rem;
    }
    .weui-btn{
      width: 70%;
      margin-top: 3rem;
    }
  }
    .noRegistar{
      display: flex;
      justify-content: center;
      color: #0788e7;
    }
</style>
