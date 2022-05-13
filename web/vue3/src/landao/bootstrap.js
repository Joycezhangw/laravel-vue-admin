import { createPinia } from "pinia"
import ElementPlus from "element-plus";
// 使用cdn  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
import "element-plus/theme-chalk/src/index.scss";

export async function bootstrap(app) {
    //缓存
    app.use(createPinia())
    //ui库
    app.use(ElementPlus)
}