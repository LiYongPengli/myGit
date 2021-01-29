import router from '@/router';
import store from '@/store';
import axios from 'axios'
import { Message } from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers = {'Cache-Control': 'no-cache'};
// axios.defaults.timeout = 5000;
store.commit('setEnv',process.env.VUE_APP_MODE);
//请求配置
// axios.interceptors.request.use(req=>{
//     req.timeout = 5000;
//  return req;   
// })
//响应配置
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
        case 500:
            Message.error('服务器出现错误,请稍后再试');
            break;
    }
    return Promise.reject(err);
})
export default axios;