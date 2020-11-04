import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from 'vuex-class';
@Component
export default class HomeCom extends Vue {
    //当前系统语言
    @State('language') language!: string;
    //是否展示聊天工具
    @State('topic_show') topic_show!:boolean;
    

    @Mutation('setScrollTop') setScrollTop!:any;

    public mainPageScroll(e:Event){
        this.setScrollTop((e.target as HTMLElement).scrollTop);
    }
}