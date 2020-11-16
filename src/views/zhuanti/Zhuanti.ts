import { baseApi } from '@/axios/axios'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class ZhuantiCom extends Vue{


    public created():void{
        this.getList();
    }

    private getList():void{
        this.axios.post(baseApi.api2+'/v1/cmd/', {
            cmd: 'favorite_preview',
            paras: {
              name: this.$route.query.name,
            }
          }).then(res=>{
              console.log(res.data);
          }).catch(err=>{
              console.log(err);
          })
    }
}