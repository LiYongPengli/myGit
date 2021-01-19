
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
@Component
export default class UserCollectionCom extends Vue {
    //是否开启分享
    @State('isShare') isShare!:boolean;
    public dialogVisible = false;
    public isUpFile:boolean = false;
    //上传封面显示默认封面
    public choosePhoto:boolean = false;
    //默认图片列表
    public default_photos:string[] = [];
    //搜索内容
    public searchText:string = "";
    //分享的收藏夹
    public shares:string[] = [];
    public dialogTitle: string = "编辑收藏夹";
    public upLoadPhoto: boolean = false;
    private editItem: any = null;
    //控制展示组件1:个人收藏夹,2:分享的收藏夹,3:收藏夹新闻列表
    public show:number = 1;
    public listshow = true;
    public favoriteList: any[] = [];
    //好友列表
    public friend_list: any[] = [];
    public favorite_form = {
        name: '',
        cover: '',
        coverFile: '' as any
    }

    @Mutation('setIsShare') setIsShare!:(n:boolean)=>void;

    @Watch('isShare')
    public listenIsShare(newVal:boolean,oldVal:boolean):void{
        if(!newVal){
            this.shares = [];
        }
    }
    @Watch('$route.query')
    public rout_change(newVal:any,oldVal:any):void{
        if(newVal.rf_id){
            this.show = 2;
        }else{
            this.show = 1;
        }
    }

    @Watch("dialogVisible")
    dialogListen(newVal: boolean, oldVal: boolean): void {
        if (!newVal) {
            this.favorite_form = {
                name: '',
                cover: '',
                coverFile: ''
            }
        }
    }

    public created(): void {
        if(this.isShare){
            this.setIsShare(false);
        }
        //this.createFavorite();
        this.getData();
    }

    private getData(): void {
        this.axios.get('/v1/user/favorite/').then(res => {
            console.log(res.data);
            this.favoriteList = res.data.data.favorite;
            this.default_photos = res.data.data.alternative;
            this.favoriteList.sort(function(a,b){
                return new Date(a.created_at).getTime()-new Date(b.created_at).getTime();
            })
        }).catch(err => {
            console.log(err);
        })
    }
    //选择图片返回结果
    public upRes(data: any): void {
        if (data) {
            this.favorite_form.coverFile = data;
            this.favorite_form.cover = URL.createObjectURL(data);
        } else {
            this.favorite_form.coverFile = "";
            this.choosePhoto = true;
        }
        this.upLoadPhoto = false;
    }
    //分享给他
    public setShare(user: any): void {

    }

    public default_chg(filePath:string):void{
        this.favorite_form.cover = filePath;
        this.choosePhoto = false;
    }

    //获取好友列表
    public getFriendList(): void {
        this.axios
            .post("/v1/cmd/", {
                cmd: "my_friends",
            })
            .then((res) => {
                this.friend_list = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //创建收藏夹
    private createFavorite(): void {
        let formdata = new FormData();
        formdata.append('name', this.favorite_form.name);
        if(!this.favorite_form.coverFile){
            let name = this.favorite_form.cover.split("/")[this.favorite_form.cover.split("/").length-1];
            formdata.append('cover', name);
        }else{
            formdata.append('cover', this.favorite_form.coverFile);
        }
        this.axios.post('/v1/user/favorite/', formdata).then(res => {
            this.$message.success(res.data.data.msg);
            this.dialogVisible = false;
            this.favorite_form = {
                name: '',
                cover: '',
                coverFile: ''
            }
            this.isUpFile = false;
            this.getData();
        }).catch(err => {
            this.isUpFile = false;
            console.log(err)
        })
    }
    //编辑收藏夹
    private editFavorite(): void {
        let formdata = new FormData();
        formdata.append('name', this.editItem.name);
        formdata.append('new_name', this.favorite_form.name);
        if (this.favorite_form.coverFile) {
            formdata.append('cover', this.favorite_form.coverFile);
        }else{
            let name = this.favorite_form.cover.split("/")[this.favorite_form.cover.split("/").length-1];
            formdata.append('cover', name);
        }
        this.axios.put('/v1/user/favorite/', formdata).then(res => {
            this.$message.success(res.data.data.msg);
            this.dialogVisible = false;
            this.favorite_form = {
                name: '',
                cover: '',
                coverFile: ''
            }
            this.isUpFile = false;
            this.getData();
        }).catch(err => {
            this.isUpFile = false;
            console.log(err)
        })
    }
    //删除收藏夹
    public deleteFav(item: any,index:number): void {
        this.$confirm('确定要删除该收藏夹吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this.axios.delete('/v1/user/favorite/?name=' + item.name).then(res => {
                this.favoriteList.splice(index,1);
            }).catch(err => {
                console.log(err)
            })
        }).catch(() => { })
    }

    public showBtn(index: number): void {
        if(this.isShare){
            return;
        }
        this.$set(this.favoriteList[index], 'showControl', true);
    }
    public hideBtn(index: number): void {
        this.$set(this.favoriteList[index], 'showControl', false);
    }
    //点击创建收藏夹
    public toCreateFavorite(): void {
        this.dialogVisible = true;
        this.dialogTitle = "创建收藏夹";
    }

    //编辑收藏夹
    public toEdit(item: any): void {
        this.dialogVisible = true;
        this.dialogTitle = "编辑收藏夹";
        this.editItem = item;
        this.favorite_form = {
            name: item.name,
            cover: item.cover,
            coverFile: ''
        }
    }

    //选择文件
    public chooseFile(file:File): void {
        if (file) {
            this.favorite_form.coverFile = file;
            this.upLoadPhoto = true;
            this.choosePhoto = false;
        }
    }



    //弹框的确认
    public toSure(): void {
        if (!this.favorite_form.name) {
            this.$message.error('请输入收藏夹名称!');
            return;
        }
        
        this.isUpFile = true;
        if (this.dialogTitle == '创建收藏夹') {
            this.createFavorite();
        } else {
            this.editFavorite();
        }
    }
    /**
     * 
     * @param item 收藏夹对象信息
     */
    public toCollectionList(item: any): void {
        if(this.isShare){
            return;
        }
        this.$router.push('/user/collectioninfo?name=' + item.name);
    }
}
