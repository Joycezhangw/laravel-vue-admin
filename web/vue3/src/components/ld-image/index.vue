<template>
  <div class="ld-image">
    <el-image v-bind="$attrs">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
      <template #placeholder>
        <div class="image-slot">加载中<span class="dot">...</span></div>
      </template>
    </el-image>
  </div>
</template>
<script>
import { Picture as IconPicture } from "@element-plus/icons-vue";
export default {
  name: "LdImage",
  components: {
    IconPicture,
  },
};
</script>
<style lang="scss" scoped>
.ld-image {
  text-align: center;
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
  .dot {
    animation: dot 2s infinite steps(3, start);
    overflow: hidden;
  }
}
</style>
