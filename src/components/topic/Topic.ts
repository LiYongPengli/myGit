import { Component,Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class';
@Component
export default class TopicCom extends Vue{
    public status:number = 1;

    @Mutation('setTopicShow') setTopicShow!: any;
}