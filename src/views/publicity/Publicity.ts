import { Component,Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
 
@Component
export default class Publicity extends Vue{
    public cur:number=0;
    @State('topic_show') topic_show!:boolean;
}