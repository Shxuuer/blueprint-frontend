<script>
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutFooter from '@/components/layout/LayoutFooter.vue'

export default {
  name: 'APP',
  components: { LayoutFooter, LayoutHeader }
}
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <LayoutHeader/>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view/>
    </a-layout-content>
    <a-layout-footer style="padding: 0">
      <LayoutFooter/>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.header {
  padding: 0;
  position: fixed;
  width: 100%;
}

.content {
  min-height: calc(100vh - 250px);
  width: 80%;
  margin: 84px auto 20px auto;
  background-color: #fff;
}
</style>
