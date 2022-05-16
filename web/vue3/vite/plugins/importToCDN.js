import importToCDN from 'vite-plugin-cdn-import'

/**
 * 需要主入到  index.html ejs 模版的数据
 * @param {*} env  env配置
 * @param {*} isBuild 
 * @returns 
 */
export default function createImportToCDN(env) {

    const { VITE_IS_IMPORT_TO_CDN } = env;
    const cndUrl = '//unpkg.com';
    const cdns = [
        {
            name: 'vue',
            var: 'Vue',
            path: `${cndUrl}/vue@3.2.33/dist/vue.runtime.global.prod.js`
        },
        {
            name: 'vue-router',
            var: 'VueRouter',
            path: `${cndUrl}/vue-router@4.0.15/dist/vue-router.global.prod.js`
        },
        {
            name: 'axios',
            var: 'axios',
            path: `${cndUrl}/axios@0.27.2/dist/axios.min.js`
        },
        {
            name: 'dayjs',
            var: 'dayjs',
            path: `${cndUrl}/dayjs@1.11.2/dayjs.min.js`
        },
        {
            name: 'element-plus',
            var: 'ElementPlus',
            path: `${cndUrl}/element-plus`,
            css: `${cndUrl}/element-plus/dist/index.css`
        }
    ];

    return importToCDN({
        modules: parseInt(VITE_IS_IMPORT_TO_CDN) === 1 ? cdns : []
    });
}