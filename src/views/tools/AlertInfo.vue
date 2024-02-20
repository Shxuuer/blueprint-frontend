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
      alertInfo: [],
      filter: {
        pest_name: '',
        handled: 0,
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
    dayjs,
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
      this.$axios.post('/ai/getAlert', {
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
    // 将筛选条件转换为json格式
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
  <a-card class="filter" :bordered="false" title="筛选条件">
    <a-space direction="vertical" size="middle">
      <a-row>
        <div style="display: flex;align-items: center;font-size: 1.2em">是否已处理：</div>
        <a-radio-group v-model:value="filter.handled" button-style="solid">
          <a-radio-button :value="0">未处理</a-radio-button>
          <a-radio-button :value="1">已处理</a-radio-button>
          <a-radio-button :value="2">全部</a-radio-button>
        </a-radio-group>
      </a-row>
      <a-row>
        <a-checkbox v-model:checked="filter.checker.time" style="display: flex;align-items: center;font-size: 1.2em">时间范围：</a-checkbox>
        <a-range-picker v-model:value="filter.time" show-time style="margin-right: 10px" :disabled="!filter.checker.time"/>
      </a-row>
      <a-row>
        <a-checkbox v-model:checked="filter.checker.pest_name" style="display: flex;align-items: center;font-size: 1.2em">病虫害名称：</a-checkbox>
        <a-dropdown :disabled="!filter.checker.pest_name">
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
    </a-space>
  </a-card>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" ghost style="border: 1px solid #939393;width: 97%;margin: auto">
    <a-collapse-panel v-for="(item, index) in alertInfo" :key="index" :header="`${item.pest_name}：${item.pest_description}`" class="info">
      <a-descriptions style="margin: auto" :column="3" bordered>
        <a-descriptions-item label="详细信息" :span="3">{{item.pest_description}}</a-descriptions-item>
        <a-descriptions-item label="病虫害类别" :span="3">{{item.pest_name}}</a-descriptions-item>
        <a-descriptions-item label="预警时间">{{dayjs(item.alert_time).format('YYYY-MM-DD HH:mm:ss')}}</a-descriptions-item>
        <a-descriptions-item label="预警地点">经纬度({{item.latitude}}°,{{item.longitude}}°)</a-descriptions-item>
        <a-descriptions-item label="预警概率">{{item.pest_probability}}</a-descriptions-item>
        <a-descriptions-item label="勘测无人机编号">{{item.drone_id}}</a-descriptions-item>
        <a-descriptions-item label="勘测农田编号">{{item.field_id}}</a-descriptions-item>
        <a-descriptions-item label="处理状态">{{item.handled ? '已处理' : '未处理'}}</a-descriptions-item>
        <a-descriptions-item label="现场图片" :span="3">
          <div class="image">
            <a-image-preview-group>
              <a-image :src="image" :width="200" v-for="(image, index) in item.image_paths" :key="index"/>
            </a-image-preview-group>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped>
.filter {
  width: 800px;
  margin: 20px auto 30px 30px;
}

.info {
  border-top: 1px solid #939393;
  margin: 1px auto;
}

.info:first-child {
  border-top: none;
}

.image {
  display: grid;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: auto auto auto auto;
  margin-left: 20px;
}
</style>
