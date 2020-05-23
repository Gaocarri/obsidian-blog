import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import util from '@/helpers/util'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(util)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
