import { baseApi } from '@/axios/axios';
import { Component, Vue } from "vue-property-decorator";
import { State } from 'vuex-class';
@Component
export default class HomeCom extends Vue {
    //当前系统语言
    @State('language') language!: string;
    //是否展示聊天工具
    @State('topic_show') topic_show!:boolean;
}