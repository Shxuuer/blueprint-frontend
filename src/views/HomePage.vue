<script>
import { DotChartOutlined } from '@ant-design/icons-vue'

export default {
  name: 'HomePage',
  components: { DotChartOutlined },
  data () {
    return {
      tools: [
        {
          icon: DotChartOutlined,
          name: '土壤数据监控',
          path: '/soil-monitoring'
        },
        {
          icon: DotChartOutlined,
          name: '空气数据监控',
          path: '/air-monitoring'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="tools">
    <template v-for="(item, index) in tools" :key="index">
        <router-link :to="{path: item.path}" class="tool">
          <component :is="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
    </template>
  </div>
</template>

<style scoped>
.tools {
  margin: auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}

.tool {
  background-color: #e3e3e3;
  border-radius: 2%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 3% 0 0;
  padding-top: 30px;
  padding-bottom: 40px;
}

.tool:hover {
  cursor: pointer;
  background-color: #d3d3d3;
}

.tool:deep(svg) {
  color: #003399;
  font-size: 90px;
}

.tools span {
  font-size: 20px;
  color: #3e3e3e;
  margin-top: 10px;
}
</style>
