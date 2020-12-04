import { baseApi } from '@/axios/axios';
import { Component, Vue, Watch } from 'vue-property-decorator';
import qs from 'qs';
@Component
export default class UserCollectionCom extends Vue {
    public dialogVisible = false;
    //是否开启分享
    public isShare: boolean = false;
    public dialogTitle: string = "编辑书签";
    public upLoadPhoto: boolean = false;
    private editItem: any = null;
    public show = true;
    public listshow = true;
    public favoriteList: any[] = [];
    //好友列表
    public friend_list: any[] = [];
    public favorite_form = {
        name: '',
        cover: '',
        coverFile: '' as any
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
        //this.createFavorite();
        this.getData();
    }

    private getData(): void {
        this.axios.get(baseApi.api2 + '/v1/user/favorite/').then(res => {
            console.log(res.data);
            this.favoriteList = res.data.data;
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
            this.favorite_form.cover = "";
        }
        this.upLoadPhoto = false;
    }
    //分享给他
    public setShare(user: any): void {

    }

    //获取好友列表
    public getFriendList(): void {
        this.axios
            .post(baseApi.api2 + "/v1/cmd/", {
                cmd: "my_friends",
            })
            .then((res) => {
                this.friend_list = res.data.data;
                console.log(this.friend_list);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //创建收藏夹
    private createFavorite(): void {
        let formdata = new FormData();
        formdata.append('name', this.favorite_form.name);
        formdata.append('cover', this.favorite_form.coverFile);
        this.axios.post(baseApi.api2 + '/v1/user/favorite/', formdata).then(res => {
            this.$message.success(res.data.data.msg);
            this.dialogVisible = false;
            this.favorite_form = {
                name: '',
                cover: '',
                coverFile: ''
            }
            this.getData();
        }).catch(err => {
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
        }
        this.axios.put(baseApi.api2 + '/v1/user/favorite/', formdata).then(res => {
            this.$message.success(res.data.data.msg);
            this.dialogVisible = false;
            this.favorite_form = {
                name: '',
                cover: '',
                coverFile: ''
            }
            this.getData();
        }).catch(err => {
            console.log(err)
        })
    }
    //删除收藏夹
    public deleteFav(item: any): void {
        this.$confirm('确定要删除该收藏夹吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            this.axios.delete(baseApi.api2 + '/v1/user/favorite/?name=' + item.name).then(res => {
                this.getData();
            }).catch(err => {
                console.log(err)
            })
        }).catch(() => { })
    }

    public showBtn(index: number): void {
        this.$set(this.favoriteList[index], 'showControl', true);
    }
    public hideBtn(item: any, index: number): void {
        item.showControl = false;
    }
    //点击创建收藏夹
    public toCreateFavorite(): void {
        this.dialogVisible = true;
        this.dialogTitle = "创建书签";
    }

    //编辑收藏夹
    public toEdit(item: any): void {
        this.dialogVisible = true;
        this.dialogTitle = "编辑书签";
        this.editItem = item;
        this.favorite_form = {
            name: item.name,
            cover: item.cover,
            coverFile: ''
        }
    }

    //选择文件
    public chooseFile(): void {
        let file = this.$refs.fileipt as HTMLInputElement;
        let fileList = file.files as FileList;
        if (fileList[0]) {
            this.favorite_form.coverFile = fileList[0];
            this.upLoadPhoto = true;
            file.value = "";
        }
    }



    //弹框的确认
    public toSure(): void {
        if (!this.favorite_form.name) {
            this.$message.error('请输入书签名称!');
            return;
        }
        if (!this.favorite_form.cover) {
            this.$message.error('请选择封面图片');
            return;
        }
        if (this.dialogTitle == '创建书签') {
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
        this.$router.push('/user/collectioninfo?name=' + item.name);
    }
}
