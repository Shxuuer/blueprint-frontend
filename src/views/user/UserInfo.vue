<script>
import { message } from 'ant-design-vue'

export default {
  name: 'UserInfo',
  inject: ['$axios'],
  data () {
    return {
      phone: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        message.info('登出成功！')
        this.$router.push({ name: 'Home' })
      })
    },
    addAdmin () {
      this.$axios.post('/user/add-admin', {
        phone: this.phone
      }).then(res => {
        message.info('添加成功！')
        this.phone = ''
      }).catch(err => {
        message.error('添加失败！')
        console.log(err)
      })
    }
  }
}
</script>

<template>
  <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240);padding: 10px 20px;font-size: 1.1em" title="用户信息" @back="$router.push({name: 'Home'})"/>
  <!--展示用户信息-->
  {{user}}
  <a-button @click="logout">登出</a-button>
  <a-row v-if="user.role === 'super-admin'">
    <a-input-group compact>
      <a-input v-model:value="phone" style="width: 120px" />
      <a-button type="primary" @click="addAdmin">添加管理员</a-button>
    </a-input-group>
  </a-row>
</template>

<style scoped>

</style>
