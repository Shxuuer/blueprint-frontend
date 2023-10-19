<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<template>
  <div style="height: 100%; width: 100%">
    <div class="main">
      <div class="info">
        <div style="font-size: 2em;color: #3e3e3e;width: 100%">用户登录</div>
        <div style="width: 80%;margin-top: 30px">
          <a-input v-model:value="username" placeholder="输入账号" style="margin-bottom: 20px">账号</a-input>
          <a-input-password v-model:value="password" placeholder="输入密码"></a-input-password>
        </div>
        <div style="width: 100%">
          <a-button type="primary" style="width: 100px" :disabled="password.length === 0 || username.length === 0">登录</a-button>
        </div>
        <div class="register" style="width: 100%;display: flex;flex-direction: row;">
          <a-button type="link" style="display: inline;padding-right: 45px;border-right: 1px solid #e3e3e3">立即注册
          </a-button>
          <a-button type="link" style="display: inline;padding: 0 45px 0 45px;border-right: 1px solid #e3e3e3">
            忘记密码
          </a-button>
          <a-button type="link" style="display: inline;padding-left: 45px">忘记账号</a-button>
        </div>
      </div>

      <div class="ad">
        海报/宣传图
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
  margin-left: 10%;
  border: solid 1px red;
}
</style>
