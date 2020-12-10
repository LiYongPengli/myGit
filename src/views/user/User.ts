import { baseApi } from '@/axios/axios'
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserCom extends Vue {
    //用户信息
    @State('user_message') user_message!:any;
    @State('topic_show') topic_show!:boolean;
    //国家
    public country: any[] = [];
    //人物
    public people: any[] = [];
    public choose_nav:string = "统计报表";
    public user_nav_list = [
        {
            path: '/user/form',
            name: '统计报表'
        },
        {
            path: '/user/users',
            name: '用户管理',
            nosee:'user'
        },
        {
            path: '/user/follow',
            name: '我的关注'
        },
        {
            path: '/user/collection',
            name: '我的收藏'
        },
        {
            path: '/user/message',
            name: '我的消息'
        },
        {
            path: '/user/account',
            name: '账号管理'
        },
        {
            path: '/user/password',
            name: '密码管理'
        }
    ]

    public created(): void {
        for(let i of this.user_nav_list){
            if(this.$route.path==i.path){
                this.choose_nav = i.name;
                break;
            }
        }
        /* //获取频道列表
        this.getSubscriptions("channel", "sub", (res) => {
            console.log(res.data);
            this.channel = res.data.data.subscriptions;
        }); */
        /* //获取国家列表
        this.getSubscriptions("country", "unsub", (res) => {
            console.log(res.data);
            this.country = res.data.data.subscriptions;
        }); */
        /* //获取人物列表
        this.getSubscriptions("character", "unsub", (res) => {
            console.log(res.data);
            this.people = res.data.data.subscriptions;
        }); */
        /* //获取媒体列表
        this.getSubscriptions("media", "sub", (res) => {
            console.log(res.data);
            this.media = res.data.data.subscriptions;
        }); */
    }
    public add_follow(): void {
        this.axios.post(baseApi.api2 + '/v1/user/sub/', {
            sub_id: "5f8848a35e3d43b0e0fcc6f3",
            sub_type: "character",
            sub_oper_type: 'sub',
        })
    }

    public router_link(item:{path:string,name:string}):void{
        this.$router.push(item.path);
        this.choose_nav = item.name;
    }

    //监听当前路由变化判断当前导航选中状态
    get active_nav(): string {
        return this.$route.path;
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }
}