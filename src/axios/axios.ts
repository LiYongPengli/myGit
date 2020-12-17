import router from '@/router';
import axios from 'axios'
import { Message } from 'element-ui';

let api = {api1:'',api2:''};
switch (process.env.VUE_APP_MODE) {
    case 'development':
        api = {
            // api1: '/api',
            api1: '/aps',
            api2: '/aps'
        }
        break;
    case 'production':
        api = {
            api1: '',
            api2: ''
        }
        break;
}
axios.defaults.baseURL = process.env.BASE_URL
export const baseApi = api;

axios.interceptors.response.use(res=>{
    return res;
},err=>{
    switch(err.response.status){
        case 401:
            if(err.response.data.msg=='请登录后操作！'){
                document.cookie = "rc_token=;rc_uid=;";
                router.push('/login').catch(err=>{});
            }
            break;
        case 400:
            Message.error(err.response.data.message._schema[0]);
            break;
    }
    return Promise.reject(err);
})
export default axios;