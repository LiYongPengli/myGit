import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class UserCollectionCom extends Vue{
    public  dialogVisible=false;
    public show = true;
    public listshow=true;

    public created():void{
        //this.createFavorite();
        this.getData();
    }

    private getData():void{
        this.axios.get(baseApi.api2+'/v1/user/favorite/').then(res=>{
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    private createFavorite():void{
        this.axios.post(baseApi.api2+'/v1/user/favorite/',{
            name:'hahahaha'
        }).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
}
