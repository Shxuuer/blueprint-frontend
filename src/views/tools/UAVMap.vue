<script>
import { DownOutlined } from '@ant-design/icons-vue'
import UAVMapUtil from '@/components/tools/UAVMapUtil.vue'

export default {
  name: 'UAVMap',
  components: { UAVMapUtil, DownOutlined },
  data () {
    return {
      mapList: [
        '地图1',
        '地图2',
        '地图3',
        '地图4'
      ],
      selected: '地图1'
    }
  }
}
</script>

<template>
  <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240);padding: 10px 20px;font-size: 1.1em" title="无人机地图导航" @back="$router.push({name: 'Home'})"/>
  <div class="main">
    <a-row style="width: 90%;margin: 20px auto">
      <a-dropdown>
        <a @click.prevent style="font-size: 1.2em;margin-right: 30px;" >
          {{ selected }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="(item, index) in mapList" :key="index" @click="selected = item">
              {{ item }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-row>
    <a-divider/>
    <UAVMapUtil style="margin-top: 10px" :map-path="'/public/maps/img1.png'"></UAVMapUtil>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  margin-top: 20px;
}
</style>
