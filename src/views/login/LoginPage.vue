<script>
import { message } from 'ant-design-vue'

export default {
  name: 'LoginPage',
  inject: ['$axios'],
  data () {
    return {
      login: {
        phone: '',
        password: ''
      },
      register: {
        username: '',
        password: '',
        phone: ''
      },
      loginLoading: false,
      registerLoading: false,
      isRegister: false
    }
  },
  methods: {
    async userRegister () {
      this.registerLoading = true
      await this.$axios.post('/sign-up', this.register).then(res => {
        message.info('注册成功！')
        this.isRegister = false
      }).catch(err => {
        message.error('注册失败！')
        console.log(err)
      }).finally(() => {
        this.registerLoading = false
      })
    },
    async userLogin () {
      this.$store.dispatch('login', this.login).then(res => {
        message.info('登录成功！')
        this.$router.push({ name: 'Home' })
      }).catch(err => {
        message.error('登录失败！')
        console.log(err)
      }).finally(() => {
        this.loginLoading = false
      })
    }
  }
}
</script>

<template>
  <div style="height: 100%; width: 100%">
    <div class="main">

      <!--登陆界面-->
      <div class="info" v-if="!isRegister">
        <div style="font-size: 2em;color: #3e3e3e;width: 100%">用户登录</div>
        <div style="width: 80%;margin-top: 30px">
          <a-input v-model:value="login.phone" placeholder="输入手机号" style="margin-bottom: 20px"/>
          <a-input-password v-model:value="login.password" placeholder="输入密码"/>
        </div>
        <div style="width: 100%">
          <a-button type="primary" style="width: 100px"
                    :disabled="login.password.length === 0 || login.phone.length === 0"
                    @click="userLogin" :loading="loginLoading">登录</a-button>
        </div>
        <div class="register" style="width: 100%;display: flex;flex-direction: row;">
          <a-button type="link" style="display: inline;padding-right: 45px;border-right: 1px solid #e3e3e3" @click="isRegister = true">立即注册</a-button>
          <a-button type="link" style="display: inline;padding-left: 45px">忘记密码</a-button>
        </div>
      </div>

      <div class="ad" :style="{margin: `0 ${isRegister?'10%':'0'} 0 ${isRegister?'0':'10%'}`}">
        海报/宣传图
      </div>

      <div class="info" v-if="isRegister">
        <div style="font-size: 2em;color: #3e3e3e;width: 100%">注册</div>
        <div style="width: 80%;margin-top: 30px">
          <a-input v-model:value="register.username" placeholder="输入用户名" style="margin-bottom: 20px"/>
          <a-input v-model:value="register.phone" placeholder="输入手机号" style="margin-bottom: 20px"/>
          <a-input-password v-model:value="register.password" placeholder="输入密码" style="margin-bottom: 20px"/>
        </div>
        <div style="width: 100%">
          <a-button type="primary" style="width: 100px"
                    :disabled="register.password.length === 0 || register.username.length === 0 || register.phone === 0"
                    @click="userRegister" :loading="registerLoading">
            注册
          </a-button>
        </div>
        <div class="register" style="width: 100%;display: flex;flex-direction: row;">
          <a-button type="link" @click="isRegister = false">登录</a-button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.main {
  margin: 90px auto auto auto;
  width: 70%;
  height: 400px;
  display: flex;
  flex-direction: row;
}

.main div {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  width: 100%;
  border-right: none;
}

.register {
  width: 100%;
  border-top: 1px #e3e3e3 solid;
  margin-top: 50px;
  border-bottom: 1px #e3e3e3 solid;
}

.ad {
  transition: 1s;
  border: solid 1px red;
}
</style>
