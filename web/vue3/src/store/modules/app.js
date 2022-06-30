import { defineStore } from "pinia";
import { ref } from "vue";
import { getBrowser } from "@/landao/utils";
import { app } from "@/landao/config"
import { merge } from "lodash-es";
import { storage } from "@/landao/utils";

export const useAppStore = defineStore("app", function () {

    //加载
    const loading = ref(false);

    //应用基本信息
    const appInfo = ref({
        ...app
    });

    //浏览器信息
    const browser = ref(getBrowser());

    // 是否折叠
    const isFold = ref(browser.value.isMini || false);

    //是否全屏
    const isFullscreen = ref(false);

    //设置折叠
    const setFold = (value) => {
        if (value === undefined) {
            value = !isFold.value;
        }
        isFold.value = value;
    }

    //设置全屏显示
    const setFullscreen = (value) => {
        if (value === undefined) {
            value = !isFullscreen.value;
        }
        isFullscreen.value = value;
    }

    //设置基本信息
    const setAppInfo = (data) => {
        merge(appInfo.value, data);
        storage.set("__app__", appInfo.value)
    }

    //设置浏览器信息
    const setBrowser = () => {
        browser.value = getBrowser();
    }

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
        hideLoading,
        isFold,
        setFold,
        browser,
        setBrowser,
        appInfo,
        setAppInfo,
        isFullscreen,
        setFullscreen
    }
})