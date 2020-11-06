import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue {
    @Mutation('setShowIntelligent') setShowIntelligent: any;
    public searchText:string = "";

    public showSearch = true;

    public getSearchText(searchText:string):void{
        if(searchText){
            this.searchText = searchText;
            this.showSearch = false;
        }
    }
}