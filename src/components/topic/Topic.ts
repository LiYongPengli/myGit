import { Component,Vue, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class';
@Component
export default class TopicCom extends Vue{
    @State('topic_url') topic_url!:string;
    @State('topic_show') topic_show!:string;
    @State('env') env!:string;
    @State('topic_status') topic_status!:number;
    @State('iframeShow') iframeShow!:boolean;

    @Mutation('setTopicShow') setTopicShow!: any;
    @Mutation('setTopicStatus') setTopicStatus!: any;

    @Watch('topic_show')
    public listenTopicShow():void{
        this.setTopicStatus(1);
    }
}