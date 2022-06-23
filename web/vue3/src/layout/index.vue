<template>
  <div class="page-layout" :class="{ collapse: appStore.isFold }">
    <div class="page-layout__left">
      <sidebar />
    </div>
    <div class="page-layout__right">
      <topbar />
      <views />
    </div>
  </div>
</template>
<script name="Layout" setup>
import Sidebar from "./components/sidebar.vue";
import topbar from "./components/topbar.vue";
import views from "./components/views.vue";
import { useBaseStore } from "@/store";
const { app: appStore } = useBaseStore();
</script>
<style lang="scss" scoped>
.page-layout {
  display: flex;
  background-color: #f7f7f7;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &__left {
    overflow: hidden;
    height: 100%;
    width: 255px;
    transition: left 0.2s;
  }

  &__right {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - 208px);
  }
  @media only screen and (max-width: 768px) {
    .page-layout__left {
      position: absolute;
      left: 0;
      z-index: 9999;
      transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
        box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    }

    .page-layout__right {
      width: 100%;
    }

    &.collapse {
      .page-layout__left {
        transform: translateX(-100%);
      }

      .page-layout__mask {
        display: none;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .page-layout__left,
    .page-layout__right {
      transition: width 0.2s ease-in-out;
    }

    .page-layout__mask {
      display: none;
    }

    &.collapse {
      .page-layout__left {
        width: 64px;
      }

      .page-layout__right {
        width: calc(100% - 64px);
      }
    }
  }
}
</style>
