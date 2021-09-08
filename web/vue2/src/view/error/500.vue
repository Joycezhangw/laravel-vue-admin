<template>
  <div class="app-result app-result-500">
    <div class="app-result-icon app-result-image">
       <icon-svg name='error-500' class="error-500"></icon-svg>
    </div>
    <div class="app-result-title">500</div>
    <div class="app-result-subtitle">抱歉，服务器报告错误。</div>
    <div class="app-result-extra">
      <a href="/">
        <el-button type="primary">返回首页</el-button>
      </a>
    </div>
  </div>
</template>
<style scoped>
.error-500 {
  width: 254px;
  height: 294px;
}
</style>