import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios/axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import vuescroll from 'vuescroll';
//import Vuetify from 'vuetify'
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/swiper-bundle.min.css';
//import 'vuetify/dist/vuetify.min.css'

//Vue.use(Vuetify);
Vue.use(vuescroll);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
