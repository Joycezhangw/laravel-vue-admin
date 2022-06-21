<template>
  <div class="app-toolbar">
    <span @click="onHandleFullscreen">{{
      appStore.isFullscreen ? "退出全屏" : "全屏"
    }}</span>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useBaseStore } from "@/store";

export default defineComponent({
  name: "Toolbar",
  setup() {
    const { app: appStore } = useBaseStore();
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
