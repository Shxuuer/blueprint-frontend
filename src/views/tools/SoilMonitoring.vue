<script>
import { DownOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
export default {
  name: 'SoilMonitoring',
  components: { DownOutlined },
  inject: ['$axios'],
  data () {
    return {
      selectId: 0,
      time: null,
      data: [],
      loading: false,
      instrList: [],
      timeSelected: false
    }
  },
  computed: {
    convertToJson () {
      return {
        sensor_id: this.selectId,
        start_time: this.timeSelected ? dayjs(this.time[0].$d).format('YYYY-MM-DDTHH:mm:ssZ') : undefined,
        end_time: this.timeSelected ? dayjs(this.time[1].$d).format('YYYY-MM-DDTHH:mm:ssZ') : undefined
      }
    }
  },
  methods: {
    dayjs,
    async fetchData () {
      if (this.selectId === 0) {
        message.warn('请选择机器号')
        return
      }
      if (this.timeSelected && this.time === null) {
        message.warn('请选择时间')
        return
      }
      this.loading = true
      this.$axios.get('/soil-sensor/data', {
        params: this.convertToJson
      }).then(res => {
        this.data = res.data.data
      }).catch(() => {
        message.error('查询失败')
      }).finally(() => {
        this.loading = false
      })
    }
  },
  beforeMount () {
    // 获取仪器编号
    this.$axios.get('/sensor/data', {
      params: {
        sensor_category: 'soil'
      }
    }).then(res => {
      this.instrList = res.data.data
    })
  }
}
</script>

<template>
  <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240);padding: 10px 20px;font-size: 1.1em" title="土壤数据监控" @back="$router.push({name: 'Home'})"/>
  <div style="width: 100%">
    <a-row class="filter">
      <a-row>
        <a-dropdown>
          <a @click.prevent style="font-size: 1.2em;margin-right: 30px;" >
            {{ selectId === 0 ? '选择仪器编号' : `已选中${selectId}号检测器` }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(item, index) in instrList" :key="index" @click="selectId = item.id">
              <span>
                {{item.id}}号 {{item.location}} {{item.function}}
                <span v-if="item.status === '故障'" style="color: red">（故障）</span>
              </span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-row>
      <a-row>
        <a-checkbox style="margin-right: 10px" v-model:checked="timeSelected"/>
        <a-range-picker v-model:value="time" show-time style="margin-right: 10px" :disabled="!timeSelected"/>
      </a-row>
      <a-row>
        <a-button type="primary" @click="fetchData">查询</a-button>
      </a-row>
    </a-row>

    <div style="margin-top: 20px;width: 100%">
      <a-row style="width: 100%">
        <a-spin :spinning="loading" style="margin: auto;"/>
      </a-row>
      <a-row v-if="!loading" style="width: 100%">
        <a-row style="width: 90%;margin: 10px auto;" v-if="data.length !== 0">传感器信息：{{data[0].sensor_info}}</a-row>
        <a-row style="width: 100%">
          <a-descriptions bordered class="data" v-for="(item, index) in data" :key="index">
            <a-descriptions-item label="检测时间" :span="2">{{dayjs(item.sensor_data.detect_time).format('YYYY-MM-DD HH:mm:ss')}}</a-descriptions-item>
            <a-descriptions-item label="温度(℃)">{{item.sensor_data.temperature}}</a-descriptions-item>
            <a-descriptions-item label="电导率(us/cm)">{{item.sensor_data.conductivity}}</a-descriptions-item>
            <a-descriptions-item label="湿度(%)">{{item.sensor_data.humidity}}</a-descriptions-item>
            <a-descriptions-item label="PH值(pH)">{{item.sensor_data.ph}}</a-descriptions-item>
            <a-descriptions-item label="氮指数(mg/kg)">{{item.sensor_data.nitrogen}}</a-descriptions-item>
            <a-descriptions-item label="磷指数(mg/kg)">{{item.sensor_data.phosphorus}}</a-descriptions-item>
            <a-descriptions-item label="钾指数(mg/kg)">{{item.sensor_data.potassium}}</a-descriptions-item>
          </a-descriptions>
        </a-row>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.data:first-child {
  border-top: none 0;
}

.data {
  width: 90%;
  margin: 10px auto;
  border-top: 1px solid #a3a3a3;
  padding-top: 20px;
}

.filter {
  width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: column
}

.filter:deep(.ant-row) {
  margin-bottom: 15px;
}
</style>
