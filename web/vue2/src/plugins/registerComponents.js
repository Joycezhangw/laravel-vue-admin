
import Vue from "vue";
//加载svg图标
import '@/icons'
import components from "@/components"
/**
 * 注册公共组件
 */
function install() {
    try {
        // 注册组件
        if (components) {
            for (let i in components) {
                if (components[i].name) {
                    Vue.component(components[i].name, components[i]);
                } else {
                    console.error(`组件 ${i} 缺少 name 参数`)
                }
            }
        }
    } catch (e) {
        console.error(`公共组件引用 异常`, e);
    }
}
install();
console.warn('[LARAVEL-VUE-ADMIN]--引用公共组件，需新增公共组件，请至/src/components/index 下引入对应组件即可')