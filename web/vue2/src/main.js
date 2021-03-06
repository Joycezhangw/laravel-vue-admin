import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/common.scss";

import './plugins'
import './directive'
import * as filters from './filters'

import router from '@/router/index'
import store from "@/store"
//需要重新加载异步路由，否则刷新页面。异步路由不会重新挂载上去
store.dispatch("app/appLoad", store.getters);

//全局枚举使用
import Enum from '@/enum';
import enumInfo from '@/enum/enums'
Vue.use(Enum,{enumInfo});

import '@/permission'
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
