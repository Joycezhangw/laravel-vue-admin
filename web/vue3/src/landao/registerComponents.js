import components from "@/components";
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**
 * 注册公用组件
 * @param {*} App
 */
export async function registerComponent(App) {
  for (const [key, component] of Object.entries(components)) {
    App.component(key, component);
  }
  //TODO，全局注册是解决el-element组件内使用icon不显示问题
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    App.component(key, component);
  }
}
