// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueLazyload)
Vue.use(ElementUI)

import store from './store'
/* eslint-disable no-new */
new Vue({
	store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
