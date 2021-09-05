import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/common.scss";

import './plugins'

import router from '@/router/index'

import store from "@/store"


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
