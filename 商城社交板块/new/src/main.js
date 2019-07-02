// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
//import { LazyLoad, } from 'mint-ui'
import 'mint-ui/lib/style.css'
import Cookies from 'js-cookie'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/state'
import ax from './axios/axios'
import wx from 'weixin-js-sdk';
Vue.use(MintUI)
global.wx = wx
global.Cookies=Cookies
//Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$axios = ax;

import 'lib-flexible'
import Axios from 'axios';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
