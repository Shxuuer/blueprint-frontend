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
  <div v-html="markdown.render(source)" />
</template>

<style scoped>
div {
  font-family: "Microsoft Yahei", Helvetica, arial, sans-serif ;
  font-size: 14px;
  line-height: 1.6;
  background-color: white;
  padding: 10px 30px 10px 30px;
  color: #516272;
}
div > *:first-child {
  margin-top: 0 !important;
}
div > *:last-child {
  margin-bottom: 0 !important;
}
div:deep(a) {
  color: #4183C4; }
div:deep(a.absent) {
  color: #cc0000; }
div:deep(a.anchor) {
  display: block;
  padding-left: 30px;
  margin-left: -30px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0; }

div:deep(h1, h2, h3, h4, h5, h6) {
  margin: 20px 0 10px;
  padding: 0;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative; }

div:deep(h1 tt, h1 code) {
  font-size: inherit; }

div:deep(h2 tt, h2 code) {
  font-size: inherit; }

div:deep(h3 tt, h3 code) {
  font-size: inherit; }

div:deep(h4 tt, h4 code) {
  font-size: inherit; }

div:deep(h5 tt, h5 code) {
  font-size: inherit; }

div:deep(h6 tt, h6 code) {
  font-size: inherit; }

div:deep(h1) {
  font-size: 28px;
  color: #2B3F52; }

div:deep(h2) {
  font-size: 24px;
  border-bottom: 1px solid #DDE4E9;
  color: #2B3F52;
  margin-top: 60px;
}

div:deep(h3) {
  font-size: 18px;
  color: #2B3F52;
  font-weight: bold;  }

div:deep(h4) {
  font-size: 16px;
  color: #2B3F52;  }

div:deep(h5) {
  font-size: 14px;
  color: #2B3F52;  }

div:deep(h6) {
  color: #2B3F52;
  font-size: 14px;
}

div:deep(p, blockquote, ul, ol, dl, li, table, pre) {
  margin: 15px 0;
  color: #516272;  }

div:deep(hr) {
  background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC) repeat-x 0 0;
  border: 0 none;
  color: #cccccc;
  height: 4px;
  padding: 0;

}

div:deep(h2):first-child {
  margin-top: 0;
  padding-top: 0; }
div:deep(h1):first-child {
  margin-top: 0;
  padding-top: 0; }
div:deep(h1:first-child + h2) {
  margin-top: 0;
  padding-top: 0; }
div:deep(h3:first-child, h4:first-child, h5:first-child, h6:first-child) {
  margin-top: 0;
  padding-top: 0; }

div:deep(a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6) {
  margin-top: 0;
  padding-top: 0; }

div:deep(h1 p, h2 p, h3 p, h4 p, h5 p, h6 p) {
  margin-top: 0; }

div:deep(li p.first) {
  display: inline-block; }
div:deep(li) {
  margin: 0; }
div:deep(ul, ol) {
  padding-left: 30px; }

div:deep(ul :first-child, ol :first-child) {
  margin-top: 0; }

div:deep(dl) {
  padding: 0; }
div:deep(dl dt) {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px; }
div:deep(dl dt:first-child) {
  padding: 0; }

div:deep(blockquote) {
  border-left: 4px solid #ECF0F3;
  /*padding: 0 15px;*/
  padding: 15px;
  background-color:#F7F9FA;
  color: #2B3F52; }
div:deep(blockquote:first-child) {
  margin-top: 0; }
div:deep(blockquote:last-child) {
  margin-bottom: 0; }

div:deep(table) {
  padding: 0;border-collapse: collapse; }
div:deep(table tr) {
  border-top: 1px solid #cccccc;
  background-color: white;
  margin: 0;
  padding: 0; }
div:deep(table tr:nth-child(2n)) {
  background-color: #f8f8f8; }
div:deep(table tr th) {
  font-weight: bold;
  border: 1px solid #cccccc;
  margin: 0;
  padding: 6px 13px; }
div:deep(table tr td) {
  border: 1px solid #cccccc;
  margin: 0;
  padding: 6px 13px; }
div:deep(table tr th :first-child, table tr td :first-child) {
  margin-top: 0; }
div:deep(table tr th :last-child, table tr td :last-child) {
  margin-bottom: 0; }

div:deep(img) {
  max-width: 100%; }

div:deep(span.frame) {
  display: block;
  overflow: hidden; }
div:deep(span.frame span) {
  border: 1px solid #dddddd;
  display: block;
  float: left;
  overflow: hidden;
  margin: 13px 0 0;
  padding: 7px;
  width: auto; }
div:deep(span.frame span img) {
  display: block;
  float: left; }
div:deep(span.frame span span) {
  clear: both;
  color: #333333;
  display: block;
  padding: 5px 0 0; }
div:deep(span.align-center) {
  display: block;
  overflow: hidden;
  clear: both; }
div:deep(span.align-center  span) {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: center; }
div:deep(span.align-center span img) {
  margin: 0 auto;
  text-align: center; }
div:deep(span.align-right) {
  display: block;
  overflow: hidden;
  clear: both; }
div:deep(span.align-right  span) {
  display: block;
  overflow: hidden;
  margin: 13px 0 0;
  text-align: right; }
div:deep(span.align-right span img) {
  margin: 0;
  text-align: right; }
div:deep(span.float-left) {
  display: block;
  margin-right: 13px;
  overflow: hidden;
  float: left; }
div:deep(span.float-left span) {
  margin: 13px 0 0; }
div:deep(span.float-right) {
  display: block;
  margin-left: 13px;
  overflow: hidden;
  float: right; }
div:deep(span.float-right  span) {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: right; }

div:deep(code, tt) {
  margin: 0 2px;
  padding: 0 5px;
  white-space: nowrap;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
  border-radius: 3px; }

div:deep(pre code) {
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent; }

div:deep(.highlight pre) {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px; }

div:deep(pre) {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px; }
div:deep(pre code, pre tt) {
  background-color: transparent;
  border: none; }

div:deep(sup) {
  font-size: 0.83em;
  vertical-align: super;
  line-height: 0;
}

div:deep(code) {
  white-space: pre-wrap;
  word-break: break-all;
  display: block;

}
* {
  -webkit-print-color-adjust: exact;
}
</style>
