<script>
import { UserOutlined } from '@ant-design/icons-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutHeader',
  components: { UserOutlined },
  data () {
    return {}
  },
  computed: {
    tab: {
      get () {
        return [this.$route.name]
      },
      set () {}
    },
    ...mapGetters(['isLogin', 'userInfo'])
  }
}
</script>

<template>
  <a-row style="background-color:#fff;">
    <a-col :span="2">
      <div class="logo">
        <router-link :to="{name: 'Home'}">
          <img alt src="@/assets/footimg1.png" style="height: 60px;">
        </router-link>
      </div>
    </a-col>
    <a-col :span="18">
      <a-menu v-model:selectedKeys="tab" mode="horizontal">
        <a-menu-item key="Home">
          <router-link :to="{name: 'Home'}">主页</router-link>
        </a-menu-item>
        <a-menu-item key="About">
          <router-link :to="{name: 'About'}">关于</router-link>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col>
      <div class="user">
        <router-link :to="{name: isLogin ? 'UserInfo' : 'Login'}">
          <a-avatar shape="square" :size="40">
            <UserOutlined/>
          </a-avatar>
          <span style="margin-left: 16px;color: #3e3e3e;">{{isLogin ? userInfo.username : '登录'}}</span>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
.logo {
  float: left;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
