import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue{
    @Mutation('setShowIntelligent') setShowIntelligent:any;
    
public show=false
}