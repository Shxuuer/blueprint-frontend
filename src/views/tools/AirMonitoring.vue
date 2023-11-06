<script>
import { DownOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
export default {
  name: 'AirMonitoring',
  components: { DownOutlined },
  inject: ['$axios'],
  data () {
    return {
      selectId: 0,
      time: null,
      data: {
        sensor_id: '0',
        sensor_info: '',
        sensor_data: {
          co2concentration: 0,
          humidity: 0,
          temperature: 0,
          detect_time: '0'
        }
      },
      loading: false
    }
  },
  computed: {
    convertToJson () {
      return {
        sensor_id: this.selectId,
        start_time: dayjs(this.time[0].$d).format('YYYY-MM-DDTHH:mm:ssZ'),
        end_time: dayjs(this.time[1].$d).format('YYYY-MM-DDTHH:mm:ssZ')
      }
    }
  },
  methods: {
    async fetchData () {
      if (this.selectId === 0) {
        message.warn('请选择机器号')
        return
      }
      if (this.time === null) {
        message.warn('请选择时间线')
        return
      }
      this.loading = true
      this.$axios.get('/air-quality-sensors/data', {
        params: this.convertToJson
      }).then(res => {
        this.data = res.data.data
        this.loading = false
      })
    }
  }
}
</script>

<template>
  <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240);padding: 10px 20px;font-size: 1.1em" title="空气数据监控" @back="$router.push({name: 'Home'})"/>
  <div>
    <a-row style="width: 90%;margin: 20px auto">
      <a-dropdown>
        <a @click.prevent style="font-size: 1.2em;margin-right: 30px;" >
          {{ selectId === 0 ? '选择仪器编号' : `已选中${selectId}号检测器` }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="index in 10" :key="index" @click="selectId = index">
              <span>{{index}}号</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-range-picker v-model:value="time" show-time style="margin-right: 10px"/>
      <a-button type="primary" @click="fetchData">查询</a-button>
    </a-row>
    <a-row style="margin-top: 20px;">
      <a-row style="width: 100%">
        <a-spin :spinning="loading" style="margin: auto;"/>
      </a-row>
      <a-row style="width: 100%" v-if="data.sensor_id!=='0' && !loading">
        <a-descriptions :title="`${data.sensor_id}号空气传感器`" bordered style="width: 90%;margin: auto">
          <a-descriptions-item label="传感器编号">{{data.sensor_id}}</a-descriptions-item>
          <a-descriptions-item label="传感器信息" :span="2">{{data.sensor_info}}</a-descriptions-item>
          <a-descriptions-item label="二氧化碳浓度">{{data.sensor_data.co2concentration}}</a-descriptions-item>
          <a-descriptions-item label="温度">{{data.sensor_data.temperature}}</a-descriptions-item>
          <a-descriptions-item label="湿度">{{data.sensor_data.humidity}}</a-descriptions-item>
          <a-descriptions-item label="检测时间">{{data.sensor_data.detect_time}}</a-descriptions-item>
        </a-descriptions>
      </a-row>
    </a-row>
  </div>
</template>

<style scoped>

</style>
