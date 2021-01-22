import { Component,Vue } from 'vue-property-decorator'
import { Mutation,State } from 'vuex-class';
 
@Component
export default class Publicity extends Vue{
    public cur:number=0;
    
    @State('topic_show') topic_show!:boolean;
    @Mutation('setSureTop') setSureTop!:(type:boolean)=>void;
}