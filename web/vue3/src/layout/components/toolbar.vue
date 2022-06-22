<template>
  <div class="app-toolbar">
    <el-tooltip
      class="box-item"
      effect="dark"
      :content="appStore.isFullscreen ? '退出全屏' : '全屏'"
      placement="bottom"
    >
      <icon-svg
        size="26px"
        :name="
          appStore.isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'
        "
        @click="onHandleFullscreen"
      ></icon-svg>
    </el-tooltip>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useBaseStore } from "@/store";

export default defineComponent({
  name: "Toolbar",
  setup() {
    const { app: appStore } = useBaseStore();
    //全屏操作
    const onHandleFullscreen = () => {
      const doc = document,
        docBody = doc.body;
      if (appStore.isFullscreen) {
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.webkitCancelFullScreen) {
          doc.webkitCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      } else {
        if (docBody.requestFullscreen) {
          docBody.requestFullscreen();
        } else if (docBody.mozRequestFullScreen) {
          docBody.mozRequestFullScreen();
        } else if (docBody.webkitRequestFullScreen) {
          docBody.webkitRequestFullScreen();
        } else if (docBody.msRequestFullscreen) {
          docBody.msRequestFullscreen();
        }
      }
      appStore.setFullscreen(!appStore.isFullscreen);
    };
    return {
      onHandleFullscreen,
      appStore,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-toolbar {
  padding: 0 16px;
}
</style>
