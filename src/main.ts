import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios/axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.min.css';
import "overlayscrollbars/css/OverlayScrollbars.css";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsPlugin } from "overlayscrollbars-vue";
// import 'swiper/swiper-bundle.min.css';
import { init_time } from './libs/OverallLib';
Vue.use(ElementUI);
Vue.use(OverlayScrollbarsPlugin);
Vue.use(OverlayScrollbars as any);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

Vue.directive('time',{
  inserted:init_time,
  update:init_time,
  //componentUpdated:init_time
})



router.beforeEach((to,from,next)=>{
  if(to.path=='/login'||to.path=='/register'||to.path=='/findpassword'){
    store.commit('setIframeShow',false);
  }else{
    store.commit('setIframeShow',true);
  }
  if(to.matched.some(res=>res.meta.auth)){
    let user_message = store.state.user_message;
    if(!user_message){
      next();
    }else{
      if(user_message.role=='user'){
        next({path:'/user/follow/country'});
      }else{
        next();
      }
    }
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
