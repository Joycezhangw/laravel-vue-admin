import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/common.scss";

import './plugins'

import router from '@/router/index'
import store from "@/store"
//需要重新加载异步路由，否则刷新页面。异步路由不会重新挂载上去
store.dispatch("app/appLoad",store.getters);

import '@/permission'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
