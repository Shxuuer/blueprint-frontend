<script>
export default {
  name: 'LayoutFooter'
}
</script>

<template>
  <div class="main">
    <div class="info">
      <div class="links">
        <span style="font-size: 1.5em;color: #e3e3e3">快捷入口</span>
        <div class="links-link">
          <a href="https://www.bupt.edu.cn/" target="_blank">北京邮电大学</a>
          <a href="https://scs.bupt.edu.cn/" target="_blank">北京邮电大学计算机学院（国家示范性软件学院）</a>
          <a href="https://www.gzcsx.gov.cn/" target="_blank">长顺县人民政府</a>
        </div>
      </div>
      <div style="margin-left: 200px">
        <img alt src="@/assets/footimg1.png">
        <span style="font-size: 1.1em">贵州省 长顺县</span>
      </div>
      <div style="margin-left: 300px">
        <a href="https://www.bupt.edu.cn" target="_blank">
          <img alt src="@/assets/footlogo.png">
        </a>
      </div>
    </div>
    <div class="copyright">
      ChangShun @2024 Created by BUPT-SCS-BluePrint
      <span style="color: #a6a6a6; margin-left: 30px">备案号：</span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" style="color: #f7f7f7" target="_blank">京ICP备xxxxxx号</a>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  background-color: #000;
  color: #fff;
  position: relative;
}

.info {
  padding: 50px 0 50px 150px;
  display: flex;
  flex-direction: row;
}

.links-link {
  display: flex;
  flex-direction: column;
  margin-top: 25px;
}

.links-link a {
  margin-bottom: 8px;
  color: #a3a3a3;
  font-size: 1.1em;
}

.copyright {
  width: 100%;
  text-align: center;
  font-size: 1.1em;
  position: relative;
  border-top: solid 1px #a6a6a6;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
