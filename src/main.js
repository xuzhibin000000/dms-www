import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/config/dmsUtil.js'
import http from '@/config/dmsRequest.js'
import VueQuillEditor from 'vue-quill-editor'

// mount with global
Vue.use(VueQuillEditor)

// 加载常用组件
import '@/components/index.js'

Vue.config.productionTip = false
Vue.prototype.http = http
Vue.use(ElementUI)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

