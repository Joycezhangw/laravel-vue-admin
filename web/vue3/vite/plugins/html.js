import { createHtmlPlugin } from "vite-plugin-html";

/**
 * 需要主入到  index.html ejs 模版的数据
 * @param {*} env  env配置
 * @param {*} isBuild 
 * @returns 
 */
export default function createHtml(env, isBuild) {

    const { VITE_APP_TITLE } = env;

    const html = createHtmlPlugin({
        inject: {//需要注入 index.html ejs 模版的数据
            data: {
                appTitle: VITE_APP_TITLE,
            },
        },
        minify: isBuild
    })
    return html;
}