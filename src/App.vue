<script>
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutFooter from '@/components/layout/LayoutFooter.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default {
  name: 'APP',
  components: { LayoutFooter, LayoutHeader },
  data () {
    return {
      // antd for vue 组件汉化，同步dayjs默认时区汉化，绑定在a-config-provider上
      locale: zhCN
    }
  }
}
</script>

<template>
  <a-config-provider :locale="locale">
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
  </a-config-provider>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.header {
  z-index: 2;
  padding: 0;
  position: fixed;
  width: 100%;
}

.content {
  min-height: calc(100vh - 150px);
  width: 80%;
  margin: 84px auto 20px auto;
  background-color: #fff;
  padding-bottom: 40px;
}
</style>
