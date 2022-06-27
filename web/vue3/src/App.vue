<template>
 	<el-config-provider :locale="zhCn">
    <div class="nd-home" v-if="app.loading">
      <div class="nd-home__main">
        <div class="nd-home__loading"></div>
      </div>
      <div class="nd-home__footer">
        <a
          href="https://github.com/Joycezhangw/laravel-vue-admin.git"
          target="_blank"
        >
          https://github.com/Joycezhangw/laravel-vue-admin.git
        </a>
      </div>
    </div>
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from "element-plus";
import { useBaseStore } from "@/store";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const { app } = useBaseStore();
</script>
<style lang="scss" src="@/assets/css/index.scss"></style>
