'use strict'

module.exports = {
  title: 'LARAVEL-VUE-ADMIN',
  baseCdnUrl: '//cdn.staticfile.org',
  cdns: [
    /**
     * 如果设置path属性, { name: 'vue', scope: 'Vue', path: '/vue/2.6.9/vue.min.js' } 即编译出来以[baseCdnUrl][path]
     * 否则自动拼写 [baseCdnUrl]/[name]/[version]/[name].min.js
     */
     { name: 'vue', scope: 'Vue', path: '/vue@2.6.14/dist/vue.min.js' },
     { name: 'vue-router', scope: 'VueRouter', path: '/vue-router@3.5.3/dist/vue-router.min.js' },
     { name: 'vuex', scope: 'Vuex', path: '/vuex@3.6.2/dist/vuex.min.js' },
     { name: 'axios', scope: 'axios', path: '/axios@0.26.0/dist/axios.min.js' },
     { name: 'element-ui', scope: 'ELEMENT', path: '/element-ui@2.15.7/lib/index.js' },
     { name: 'dayjs', scope: 'dayjs', path: '/dayjs@1.10.7/dayjs.min.js' },
  ]
}
