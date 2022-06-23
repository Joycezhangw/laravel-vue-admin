<template>
  <div class="app-views" v-if="!appStore.loading">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useBaseStore } from "@/store";

export default defineComponent({
  setup() {
    const { app: appStore } = useBaseStore();
    return {
      appStore,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-views {
	flex: 1;
	overflow: hidden;
	padding: 0 10px;
	margin-bottom: 10px;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	border-radius: 3px;

	& > div {
		height: 100%;
	}
}
</style>

