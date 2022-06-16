import { createPinia } from "pinia"
import ElementPlus from "element-plus";
import { setupRouter } from "./router"
import { useBaseStore } from "@/store";
/**
 * TODO:在构建生产环境时,需要CDN引用，需要注释掉。以免重复打包样式。
 * 暂时没有更好的解决方案，在生产环境下判断构建
 */
import "element-plus/theme-chalk/src/index.scss";


export async function bootstrap(vue) {
    //缓存
    vue.use(createPinia())
    //ui库
    vue.use(ElementPlus)
    //挂载路由
    // vue.use(router)
    await setupRouter(vue)

    // 基础
    const { app } = useBaseStore();
    app.showLoading();
    //#此处要加载一些，比如菜单

    app.hideLoading();
}