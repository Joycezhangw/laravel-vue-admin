import components from "@/components"


/**
 * 注册公用组件
 * @param {*} App 
 */
export async function registerComponent(App) {
    for (const [key, component] of Object.entries(components)) {
        App.component(key, component)
    }
}