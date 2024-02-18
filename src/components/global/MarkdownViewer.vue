<script>
import MarkdownIt from 'markdown-it'

export default {
  name: 'MarkdownViewer',
  data () {
    return {
      markdown: new MarkdownIt()
    }
  },
  props: {
    source: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div v-html="markdown.render(source)"/>
</template>

<style scoped>

* {
  font-family: "Microsoft Yahei", Helvetica, arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  background-color: white;
  padding: 10px 30px 10px 30px;
  color: #516272;
}

*:first-child {
  margin-top: 0 !important;
}

*:last-child {
  margin-bottom: 0 !important;
}

div:deep(h1, h2, h3, h4, h5, h6) {
  color: #2B3F52;
  padding: 0;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative;
}

div:deep(h1) {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

div:deep(h2) {
  font-size: 24px;
  border-bottom: 1px solid #DDE4E9;
  margin-top: 50px;
}

div:deep(h3) {
  font-size: 18px;
  font-weight: bold;
  color: #3B4F62;
}
</style>
