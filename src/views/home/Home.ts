import { baseApi } from '@/axios/axios';
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from 'vuex-class';
@Component
export default class HomeCom extends Vue {
    //当前系统语言
    @State('language') language!: string;
    //是否展示聊天工具
    public topic_show: boolean = false;
    //设置语言
    @Mutation('setLanguage') setLanguage!: any;

    /**
     * 角色头像交互下拉的选择回调
     * @param cmd 选中的项
     * @returns {void}
     */
    public handleCommand(cmd: string): void {
        if (cmd == '/user') {
            this.$router.push(cmd);
        } else if(cmd=='logout'){
            this.logout();
        }
    }

    //登出
    private logout(): void {
        this.axios.post(baseApi.api1 + '/v1/user/login/logout').then(res => {
            console.log(res.data)
            if (res.data.status == 1) {
                this.$router.push('/login');
                this.$message.success('已登出');
            }
        }).catch(err => {
            console.log(err);
        })
    }
}