<script>
export default {
  name: 'UserInfo',
  inject: ['$axios'],
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'Home' })
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
</template>

<style scoped>

</style>
