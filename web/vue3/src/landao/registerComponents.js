import components from "@/components"


/**
 * 注册公用组件
 * @param {*} app 
 */
export async function registerComponent(app) {
    for (const i in components) {
        app.component(components[i].name, components[i]);
    }
}