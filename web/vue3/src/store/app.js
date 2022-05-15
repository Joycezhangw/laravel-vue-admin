import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", function () {

    //加载
    const loading = ref(false);

    // 加载
	function showLoading() {
		loading.value = true;
	}

	// 关闭
	function hideLoading() {
		loading.value = false;
	}

    return {
        loading,
        showLoading,
        hideLoading
    }
})