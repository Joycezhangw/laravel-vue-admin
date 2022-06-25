import { createPinia } from "pinia"
import ElementPlus from "element-plus";
import { setupRouter } from "./router"
import { useBaseStore } from "@/store";
import { registerComponent } from "./registerComponents";
import VueECharts from "vue-echarts";
import { addViews } from "./router/util";

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

    // 基础store
    const { app: appStore, user: userStore, menu: menuStore } = useBaseStore();

    //注册公用组件
    await registerComponent(App)

    //应用挂载loading开始
    appStore.showLoading();
    
    //后端控制路由：路由数据初始化，防止刷新时丢失
    await addViews(menuStore.routes);
    //挂载路由
    await setupRouter(App)

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