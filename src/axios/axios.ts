import router from '@/router';
import store from '@/store';
import axios from 'axios'
import { Message } from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers = {'Cache-Control': 'no-cache'};

axios.interceptors.response.use(res=>{
    return res;
},err=>{
    switch(err.response.status){
        case 401:
            if(err.response.data.msg=='请登录后操作！'){
                document.cookie = "rc_token=;rc_uid=;";
                router.push('/login').catch(err=>{});
                store.commit('setIframeShow',false);
            }
            break;
        case 400:
            Message.error(err.response.data.message._schema[0]);
            break;
    }
    return Promise.reject(err);
})
export default axios;