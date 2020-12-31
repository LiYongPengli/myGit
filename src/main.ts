import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios/axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/swiper-bundle.min.css';
import { init_time } from './libs/OverallLib';

Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

Vue.directive('time',{
  inserted:init_time
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
