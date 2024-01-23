<script>
import MarkdownViewer from '@/components/global/MarkdownViewer.vue'

export default {
  name: 'AboutPage',
  components: { MarkdownViewer },
  data () {
    return {
      markdownText: ''
    }
  },
  beforeMount () {
    this.$axios.get('@/instructions.md').then((res) => {
      this.markdownText = res.data
    })
  },
  inject: ['$axios']
}
</script>

<template>
  <div class="main">
    <MarkdownViewer :source="markdownText"/>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  font-size: 1.3em;
}
</style>
