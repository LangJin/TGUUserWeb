// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import api from '@/api';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import  "@/assets/css/common.css";

Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = api;



// 设置标题
Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
