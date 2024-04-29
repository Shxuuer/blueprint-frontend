<script>
import { DotChartOutlined, SendOutlined, WarningOutlined, CompassOutlined } from '@ant-design/icons-vue'

export default {
  name: 'HomePage',
  mounted () {
    // 主页背景图片轮播
    setInterval(() => {
      this.bgImg.index = (this.bgImg.index + 1) % this.bgImg.images.length
    }, 6000)
  },
  data () {
    return {
      bgImg: {
        index: 0,
        images: [
          'https://www.gzcsx.gov.cn/syqt/jxcsbjqh/202310/W020231017426763808586_ORIGIN.png',
          'https://www.gzcsx.gov.cn/syqt/jxcsbjqh/202310/W020231017427000118087_ORIGIN.png'
        ]
      },
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
        },
        {
          icon: WarningOutlined,
          name: '预警信息',
          path: '/alert'
        },
        {
          icon: SendOutlined,
          name: '无人机拍摄',
          path: '/UAVControl'
        }
        // {
        //   icon: CompassOutlined,
        //   name: '无人机地图导航',
        //   path: '/UAVMap'
        // }
      ]
    }
  }
}
</script>

<template>
  <div class="divide">
    <div class="line left-line"/>
    <h3 class="title">长顺农业检测控制台</h3>
    <div class="line right-line"/>
  </div>
  <div class="img" :style="{backgroundImage: `url(${bgImg.images[bgImg.index]})`}">
    <div class="changshun"/>
  </div>
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
  margin: auto auto 300px auto;
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
  margin: 35px 3% 0 0;
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

.img {
  width: 90%;
  background-size: 100% 100%;
  margin: 20px auto;
  height: 600px;
  border-radius: 5px;
  transition: 2s;
}

.changshun {
  background-image: url(@/assets/image.png);
  position: absolute;
  width: 110px;
  height: 225px;
  top: 40%;
  left: 75%;
  background-size: 100% 100%;
}

.divide {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  margin: 40px auto 50px auto;
}

.line {
  position: relative;
  width: 30%;
  border-radius: 3px;
  height: 5px;
  background-color: #409bff;
  margin: auto;
}

.title {
  font-size: 2.5em;
  margin: auto 20px;
  color: #4e4e6e;
  font-family: 华文楷体;
  font-weight: bold;
}

.left-line::after,
.right-line::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #208aff;
  top: -12px;
  right: -25px;
}

.right-line::after {
  left: -25px;
  right: auto;
}
</style>
