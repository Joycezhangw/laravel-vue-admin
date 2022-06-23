import { createPinia } from "pinia"
import ElementPlus from "element-plus";
import { setupRouter } from "./router"
import { useBaseStore } from "@/store";
import { registerComponent } from "./registerComponents";
import VueECharts from "vue-echarts";

/**
 * TODO:在构建生产环境时,需要CDN引用，需要注释掉。以免重复打包样式。
 * 暂时没有更好的解决方案，在生产环境下判断构建
 */
import "element-plus/theme-chalk/src/index.scss";


export async function bootstrap(App) {
    //缓存
    App.use(createPinia())
    //ui库
    App.use(ElementPlus)

    // 可视图表
    App.component("v-chart", VueECharts);

    //挂载路由
    await setupRouter(App)

    // 基础store
    const { app: appStore, user: userStore, menu: menuStore } = useBaseStore();

    //注册公用组件
    await registerComponent(App)

    //应用挂载loading开始
    appStore.showLoading();
    //#此处要加载一些，比如菜单
    if (userStore.token) {
        // 获取用户信息
        await userStore.getUserInfo();

        // 获取菜单权限
        await menuStore.getPremRules();
    }
    //应用挂载loading结束
    appStore.hideLoading();
}