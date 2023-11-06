<script>
import { DownOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

export default {
  name: 'AlertInfo',
  components: { DownOutlined },
  inject: ['$axios'],
  data () {
    return {
      activeKey: [],
      alertInfo: [
        {
          id: 0,
          handled: false,
          alert_time: '2023-11-06T08:00:00Z',
          image_paths: [
            'images/detection/image1.jpg',
            'images/detection/image2.jpg'
          ],
          drone_id: 202,
          field_id: 58,
          latitude: 34.052235,
          longitude: -118.243683,
          pest_name: 'Aphids',
          pest_description: 'Small sap-sucking insects that can cause damage to a variety of plants.',
          pest_probability: 0.76
        }
      ],
      filter: {
        pest_name: '',
        handled: 2,
        time: null,
        checker: {
          pest_name: false,
          time: false
        }
      },
      loading: false
    }
  },
  methods: {
    async getAlertInfo () {
      if (this.filter.checker.time && this.filter.time === null) {
        message.warn('请选择时间线')
        return
      }
      if (this.filter.checker.pest_name && this.filter.pest_name === '') {
        message.warn('请选择病虫害类型')
        return
      }
      this.loading = true
      this.$axios.get('/alert', {
        params: {
          ...this.convertToJson
        }
      }).then(res => {
        this.alertInfo = res.data.data
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    convertToJson () {
      return {
        pest_name: this.filter.checker.pest_name ? this.filter.pest_name : undefined,
        handled: this.filter.handled === 2 ? undefined : this.filter.handled === 1,
        start_time: this.filter.checker.time ? dayjs(this.filter.time[0].$d).format('YYYY-MM-DDTHH:mm:ssZ') : undefined,
        end_time: this.filter.checker.time ? dayjs(this.filter.time[1].$d).format('YYYY-MM-DDTHH:mm:ssZ') : undefined
      }
    }
  }
}
</script>

<template>
  <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240);padding: 10px 20px;font-size: 1.1em" title="预警信息" @back="$router.push({name: 'Home'})"/>
  <div class="filter">
    <a-row>
      <div>是否已处理：</div>
      <a-radio-group v-model:value="filter.handled" button-style="solid">
        <a-radio-button :value="0">未处理</a-radio-button>
        <a-radio-button :value="1">已处理</a-radio-button>
        <a-radio-button :value="2">全部</a-radio-button>
      </a-radio-group>
    </a-row>
    <a-row>
      <a-checkbox v-model:checked="filter.checker.time">时间范围</a-checkbox>
      <a-range-picker v-model:value="filter.time" show-time style="margin-right: 10px"/>
    </a-row>
    <a-row>
      <a-checkbox v-model:checked="filter.checker.pest_name">病虫害名称</a-checkbox>
      <a-dropdown>
        <a @click.prevent style="font-size: 1.2em;margin-right: 30px;" >
          {{ filter.pest_name === '' ? '选择病虫害类型' : `已选中${filter.pest_name}` }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="index in 10" :key="index" @click="filter.pest_name = `${index}病虫害`">
              <span>{{index}}病虫害</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-row>
    <a-row>
      <a-button type="primary" @click="getAlertInfo">查询</a-button>
      <a-spin :spinning="loading"/>
    </a-row>

  </div>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" v-if="alertInfo[0].id !== 0">
    <a-collapse-panel v-for="(item, index) in alertInfo" :key="index" :header="`${item.pest_name}:${item.pest_description}`">
      <a-descriptions :title="`预警编号${index + 1}`" bordered style="width: 90%;margin: auto" :column="3">
        <a-descriptions-item label="详细信息" :span="3">{{item.pest_description}}</a-descriptions-item>
        <a-descriptions-item label="病虫害类别" :span="3">{{item.pest_name}}</a-descriptions-item>
        <a-descriptions-item label="预警时间">{{item.alert_time}}</a-descriptions-item>
        <a-descriptions-item label="预警地点">经纬度({{item.latitude}}°,{{item.longitude}}°)</a-descriptions-item>
        <a-descriptions-item label="预警概率">{{item.pest_probability}}</a-descriptions-item>
        <a-descriptions-item label="勘测无人机编号">{{item.drone_id}}</a-descriptions-item>
        <a-descriptions-item label="勘测农田编号">{{item.field_id}}</a-descriptions-item>
        <a-descriptions-item label="处理状态">{{item.handled ? '已处理' : '未处理'}}</a-descriptions-item>
        <a-descriptions-item label="现场图片" :span="3">
          <a-list :grid="{ gutter: 16, column: 4 }">
            <a-list-item v-for="(image, index) in item.image_paths" :key="index">
              <a-card :hoverable="true" style="width: 100%">
                <img :src="image" style="width: 100%" alt=""/>
              </a-card>
            </a-list-item>
          </a-list>
        </a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>

</style>
