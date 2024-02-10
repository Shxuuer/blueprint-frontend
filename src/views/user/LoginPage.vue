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
        phone: '',
        code: '',
        password1: '',
        password2: ''
      },
      loginLoading: false,
      registerLoading: false,
      isRegister: false,
      sendCodeInfo: '发送验证码'
    }
  },
  methods: {
    async userRegister () {
      if (this.register.password1 !== this.register.password2) {
        message.error('两次密码不一致！')
        return
      }
      this.registerLoading = true
      await this.$store.dispatch('register', {
        username: this.register.username,
        password: this.register.password1,
        phone: this.register.phone,
        code: this.register.code
      }).then(() => {
        message.info('注册成功！')
        this.$router.push({ name: 'Home' })
      }).catch(err => {
        message.error('注册失败！')
        console.log(err)
      }).finally(() => {
        this.registerLoading = false
      })
    },
    async userLogin () {
      this.loginLoading = true
      this.$store.dispatch('login', this.login).then(() => {
        message.info('登录成功！')
        this.$router.push({ name: 'Home' })
      }).catch(err => {
        if (err.status === 401) message.error('账号不存在或密码错误！')
        else message.error('登录失败！')
        console.log(err)
      }).finally(() => {
        this.loginLoading = false
      })
    },
    async sendCode () {
      if (this.register.phone.length !== 11 || !this.register.phone.startsWith('1')) {
        message.error('手机号格式不正确！')
        return
      }
      await this.$axios.post('/user/phone-verify', {
        phone: this.register.phone
      }).then(() => {
        message.info('验证码发送成功！')
      }).catch(err => {
        message.error('验证码发送失败！')
        console.log(err)
      }).finally(() => {
        // 倒计时60秒
        let time = 60
        this.sendCodeInfo = `${time}秒后重发`
        const timer = setInterval(() => {
          if (time === 0) {
            clearInterval(timer)
            this.sendCodeInfo = '发送验证码'
          } else {
            this.sendCodeInfo = `${time}秒后重发`
            time--
          }
        }, 1000)
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
          <a-input v-model:value="login.phone" placeholder="输入手机号" />
          <a-input-password v-model:value="login.password" placeholder="输入密码" @keydown.enter="userLogin"/>
        </div>
        <div style="width: 100%">
          <a-button type="primary" style="width: 100px" :loading="loginLoading"
                    :disabled="login.password.length === 0 || login.phone.length === 0"
                    @click="userLogin">登录</a-button>
        </div>
        <div class="register" style="width: 100%;display: flex;flex-direction: row;">
          <a-button type="link" @click="isRegister = true">立即注册</a-button>
          <a-button type="link">忘记密码</a-button>
        </div>
      </div>

      <div class="ad" :style="{margin: `0 ${isRegister?'10%':'0'} 0 ${isRegister?'0':'10%'}`}">
        海报/宣传图
      </div>

      <!--注册页面-->
      <div class="info" v-if="isRegister">
        <div style="font-size: 2em;color: #3e3e3e;width: 100%">注册</div>
        <div style="width: 80%;margin-top: 30px">
          <a-input v-model:value="register.username" placeholder="输入用户名" />
          <a-input-search v-model:value="register.phone" placeholder="输入手机号"
                          :enter-button="sendCodeInfo" @search="sendCode"
                          :disabled="sendCodeInfo !== '发送验证码'"/>
          <a-input v-model:value="register.code" placeholder="输入验证码" />
          <a-input-password v-model:value="register.password1" placeholder="输入密码" />
          <a-input-password v-model:value="register.password2" placeholder="重复密码" @keydown.enter="userRegister"/>
        </div>
        <div style="width: 100%">
          <a-button type="primary" style="width: 100px" :loading="registerLoading"
                    :disabled="register.password1.length === 0 || register.username.length === 0
                    || register.phone === 0 || register.password2.length === 0"
                    @click="userRegister">
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
  height: 600px;
  display: flex;
  flex-direction: row;
}

.main div {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  width: 100%;
  border-right: none;
}

.info div input,
.info:deep(.ant-input-search),
.info:deep(.ant-input-password) {
  margin-bottom: 20px
}

.register {
  height: 60px;
  width: 100%;
  border-top: 1px #e3e3e3 solid;
  margin-top: 50px;
  border-bottom: 1px #e3e3e3 solid;
}

.ad {
  transition: 1s;
  border: solid 1px red;
}

.register button {
  padding-left: 45px;
  padding-right: 45px;
  display: inline;
  border-right: 1px solid #e3e3e3;
}

.register button:last-child {
  border-right: none;
}
</style>
