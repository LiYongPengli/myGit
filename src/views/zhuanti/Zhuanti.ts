import { baseApi } from '@/axios/axios'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class ZhuantiCom extends Vue{
    @State('language') language!:string;
    public showWarning:boolean = false;

    private deleteObj = {
        item:'' as any,
        index:0
    }
    public list:any[] = [];
    public created():void{
        this.getList();
    }

    @Watch('language')
    public languageChg(newVal:string,oldVal:string):void{
        this.getList();
    }

    private getList():void{
        this.axios.post(baseApi.api2+'/v1/cmd/', {
            cmd: 'favorite_preview',
            paras: {
              name: this.$route.query.name,
              language:this.language
            }
          }).then(res=>{
              console.log(res.data);
              this.list = res.data.data
          }).catch(err=>{
              console.log(err);
          })
    }

    /**
     * 格式化时间输出格式
     * @param str 时间字符串(xxxx-xx-xx xx:xx:xx)
     * @returns {string} 格式化后的时间
     */
    public init_time(str: string): string {
        let date = new Date(str);
        let now = new Date();
        let time = parseInt((now.getTime() - date.getTime()) / 1000 + '');
        if (time < 60) {
            return '1分钟前';
        } else if (time < (60 * 60)) {
            return `${parseInt(time / 60 + '')}分钟前`
        } else if (time < (60 * 60 * 24)) {
            return `${parseInt(time / 60 / 60 + '')}小时前`
        } else if (time < (60 * 60 * 24 * 30)) {
            return `${parseInt(time / 60 / 60 / 24 + '')}天前`
        } else if (time < (60 * 60 * 24 * 30 * 12)) {
            return `${parseInt(time / 60 / 60 / 24 / 30 + '')}月前`
        } else {
            return `${parseInt(time / 60 / 60 / 24 / 30 / 12 + '')}年前`
        }
    }

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }

    //删除
    public toDelete(item:any,index:number):void{
        this.showWarning=true;
        this.deleteObj = {
            item:item,
            index:index
        }
    }

    //确定
    public sure():void{
        this.axios.post(baseApi.api2+'/v1/cmd/',{
            cmd:'favorite_news',
            paras:{
                name:this.$route.query.name,
                news_id:this.deleteObj.item.news_id,
                news_oper:'undo'
            }
        }).then(res=>{
            this.list.splice(this.deleteObj.index,1);
            this.$message.success('操作成功');
            this.showWarning = false;
        }).catch(err=>{
            console.log(err);
        })
    }

    //取消
    public ext():void{
        this.showWarning = false;
    }
}