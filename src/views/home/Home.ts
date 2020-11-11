import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from 'vuex-class';
@Component
export default class HomeCom extends Vue {
    //当前系统语言
    @State('language') language!: string;
    //是否展示聊天工具
    @State('topic_show') topic_show!:boolean;
    //是否回到顶部
    @State('suretop') suretop!:boolean;
    

    @Mutation('setScrollTop') setScrollTop!:any;
    @Mutation('setMainPageLoading') setMainPageLoading!:any;

    public mainPageScroll(e:HTMLElement){
        this.setScrollTop(e.scrollTop);
    }

    public toLoading():void{
        this.setMainPageLoading(true);
    }
}