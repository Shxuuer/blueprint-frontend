<script>
import { AimOutlined } from '@ant-design/icons-vue'

export default {
  name: 'UAVMapUtil',
  components: { AimOutlined },
  props: {
    // 地图路径
    mapPath: {
      type: String,
      default: ''
    },
    // 地图左上角坐标
    LTPosition: {
      type: Object,
      default: () => {
        return { x: 100, y: 100 }
      }
    },
    // 地图右下角坐标
    RBPosition: {
      type: Object,
      default: () => {
        return { x: 200, y: 200 }
      }
    },
    // 地图上的标记
    marks: {
      type: Array,
      default: () => {
        return [
          {
            position: { x: 150, y: 100 }
          },
          {
            position: { x: 100, y: 100 }
          },
          {
            position: { x: 200, y: 200 }
          }
        ]
      }
    }
  },
  data () {
    return {
      // 缩放比例
      scale: 1.0,
      // 地图相对于容器的位置
      mapPosition: { x: 0, y: 0 },
      loaded: false
    }
  },
  methods: {
    // 处理拖动事件
    dragMap (e) {
      e.preventDefault()
      const x = e.clientX
      const y = e.clientY
      const mapContainer = this.$refs.mapContainer
      const left = mapContainer.scrollLeft
      const top = mapContainer.scrollTop
      document.onmousemove = (e) => {
        const dx = e.clientX - x
        const dy = e.clientY - y
        mapContainer.scrollLeft = left - dx
        mapContainer.scrollTop = top - dy
        this.updateMarks()
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 更新标记位置
    updateMarks (e) {
      const map = this.$refs.map
      const mapWidth = map.width * this.scale
      const mapHeight = map.height * this.scale
      console.log(e, mapWidth, mapHeight)
      this.marks.forEach(mark => {
        const relativeX = (mark.position.x - this.LTPosition.x) / (this.RBPosition.x - this.LTPosition.x) * mapWidth
        const relativeY = (mark.position.y - this.LTPosition.y) / (this.RBPosition.y - this.LTPosition.y) * mapHeight
        mark.style = {
          left: `${relativeX - 7}px`,
          top: `${relativeY - 7}px`
        }
      })
    }
  }
}
</script>

<template>
  <div style="width: 100%">
    <div style="margin-left: 15%;margin-bottom: 15px">
      <div>缩放比例：{{scale}}x</div>
      <a-slider v-model:value="scale" :min="0.7" :max="2" :step="0.1" style="width: 30%;" @change="updateMarks"/>
      <a-button @click="updateMarks();loaded=true">加载路径点</a-button>
    </div>
    <div style="width: 100%;display: flex;justify-content: center">
      <div class="map-container" draggable="false" ref="mapContainer">
        <img :src="mapPath" alt="网络错误！" ref="map" :style="{scale}" @mousedown="dragMap">
        <template v-for="(item, index) in marks" :key="index">
          <AimOutlined class="marks" v-if="loaded" :style="item.style"/>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 70%;
  cursor: grab;
  overflow: hidden;
  height: 500px;
  background-color: #cccccc;
  position: relative;
  user-select:none;
}

.marks {
  position: absolute;
  top: 0;
  left: 0;
  color: #ff0000;
  scale: 3
}
</style>
