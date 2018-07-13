<template>
   <content-box>
       <my-head
       title="登录/注册"
       >
       </my-head>
       <div class="userInfoMain">
          <div class="userInfoContent">
            <p><x-input title="用户名" v-model="userName" @on-change="userNameChange" placeholder="请输入用户名或ID号"></x-input></p>
            <p><x-input title="新密码" type="password" v-model="password" @on-change="passwordChange" placeholder="请输入密码"></x-input></p>
            <p><x-input title="确认密码" type="password" v-model="firmPassword" @on-change="firmPasswordChange" placeholder="确认新密码"></x-input></p>
            <x-button @click.native="registar" type="warn">确  定</x-button>
          </div>
          <toast v-model="showToast" :text="tip" type="text"></toast>
       </div>
   </content-box>
</template>

<script>
import { XInput, XButton, Toast } from 'vux'
export default {
  data() {
    return {
        userName:'',
        password:'',
        firmPassword:'',
        showToast:false,
        tip:''
    }
  },
  components:{
    XInput,
    XButton,
    Toast
  },
  methods:{
    userNameChange(val){
      this.userName = val
    },
    passwordChange(val){
      this.password = val
    },
    firmPasswordChange(val){
      this.firmPassword = val
    },
    registar(){
      let userName = this.userName
      let password = this.password
      let firmPassword = this.firmPassword
      if(userName == '' || userName == 'undefinded'){
         this.showToast = true
         this.tip = '用户名不能为空'
      }else if(password == '' || password == 'undefinded'){
        this.showToast = true
        this.tip = '请输入新密码'
      }else if(firmPassword == '' || firmPassword == 'undefinded'){
        this.showToast = true
        this.tip = '请输入确认密码'
      }else if(password != firmPassword){
        this.showToast = true
        this.tip = '您两次输入的密码不一致，请重新输入'
      }else{
         $.ajax({
          type:'POST',
          dataType: 'json',
          url:'http://127.0.0.1:3000/login/insert?userName='+userName+'&password='+password,
          headers: {"Content-Type": "application/json"},
          success: res => {
            this.$router.push({name:'registar'}) 
            this.setUserInfo(res)
          }
        })
      }
    },
  },
  created(){

  }
}
</script>

<style lang="scss">
.userInfoMain{
    .userInfoContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 .4rem;
        margin-top: 5rem;
        p{
            margin-left: 4rem;
            border-bottom: 1px solid #e6e6e6;
        }
        .weui-cell__hd{
            width: 5rem;
        }
        .weui-btn{
            width: 70%;
            margin-top: 3rem;
        }
  }
}
</style>
