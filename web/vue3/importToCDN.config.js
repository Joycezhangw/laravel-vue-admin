'use strict'
/**
 * 构建时，导入cdn
 */
module.exports = {
    baseCDNUrl: '//unpkg.com',
    cdns: [
        {
            name: 'vue',
            var: 'Vue',
            path: '//unpkg.com/vue@3.2.37/dist/vue.runtime.global.prod.js'
        },
        {
            name: 'vue-router',
            var: 'VueRouter',
            path: '//unpkg.com/vue-router@4/dist/vue-router.min.js'
        },
        {
            name: 'axios',
            var: 'axios',
            path: '//unpkg.com/axios@0.27.2/dist/axios.min.js'
        },
        {
            name: 'dayjs',
            var: 'dayjs',
            path: '//unpkg.com/dayjs@1.11.3/dayjs.min.js'
        },
        {
            name: 'element-plus',
            var: 'ElementPlus',
            path: '//unpkg.com/element-plus',
            css: '//unpkg.com/element-plus/dist/index.css'
        }
    ]
}