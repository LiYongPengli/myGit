import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
@Component
export default class AddCollectionCom extends Vue {
    @Prop({}) id!:string;
    @Prop({}) attachments!:any[];
    //收藏夹列表
    public favoriteList: any[] = [];
    public default_photos:string[] = [];
    public choosePhoto:boolean = false;
    //创建的收藏夹名称
    public collection_name: string = "";
    //图片预览路径
    public img_pv: string = "";
    //要上传的文件
    public upimg: any = "";
    public upLoadPhoto: boolean = false;
    //创建新收藏夹
    public createNewCollection: boolean = false;

    public created(): void {
        this.getCollection();
    }


    private getCollection(): void {
        this.axios
            .get("/v1/user/favorite/")
            .then((res) => {
                console.log(res.data);
                this.favoriteList = res.data.data.favorite;
                let arr = res.data.data.alternative;
                let attachments = [];
                for(let i of this.attachments){
                    attachments.push(i.url)
                }
                if(attachments.length>3){
                    for(let i of attachments){
                        arr.push(i);
                    }
                    this.default_photos = arr;
                }else{
                    this.default_photos = attachments.concat(arr);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //显示收藏按钮
    public showCollBtn(index: number): void {
        this.$set(this.favoriteList[index], "show", true);
    }
    //隐藏收藏按钮
    public hideCollBtn(index: number): void {
        this.$delete(this.favoriteList[index], "show");
    }

    //创建并收藏
    public async createCollection() {
        if (!this.collection_name) {
            this.$message.error("请输入收藏夹名称");
            return;
        }
        let formdata = new FormData();
        if (this.upimg) {
            formdata.append("cover", this.upimg);
        }else if(this.img_pv){
            formdata.append("cover", this.img_pv.split('/')[this.img_pv.split('/').length-1]);
        }else{
            formdata.append("cover", '');
        }
        
        formdata.append("name", this.collection_name);
        
        try {
            await this.axios.post("/v1/user/favorite/", formdata);
        } catch (err) {
            console.log(err);
            return;
        }
        try {
            await this.axios.post("/v1/cmd/", {
                cmd: "favorite_news",
                paras: {
                    name: this.collection_name,
                    news_id: this.id,
                    news_oper: "do",
                },
            });
            
            this.collectStatus(true);
        } catch (err) {
            console.log(err);
        }
    }

    //收藏
    public toCollection(item: any): void {
        this.axios.post('/v1/cmd/', {
            cmd: 'favorite_news',
            paras: {
                name: item.name,
                news_id: this.id,
                news_oper: 'do'
            }
        }).then(res => {
            this.collectStatus(true);
        }).catch(err => {
            console.log(err);
        })
    }

    public default_chg(filePath:string):void{
        this.img_pv = filePath;
        this.upimg = "";
        this.choosePhoto = false;
    }

    @Emit("status")
    public collectStatus(status: boolean): boolean {
        return status;
    }

    public upFile(): void {
        let file = this.$refs.upFile as HTMLInputElement;
        if (!file.files?.length) {
            return;
        } else {
            this.upimg = file.files[0];
            this.upLoadPhoto = true;
        }
        file.value = "";
    }

    //选择文件
    public chooseFile(file:File): void {
        if (file) {
            this.upimg = file;
            this.upLoadPhoto = true;
            this.choosePhoto = false;
        }
    }

    //取消创建
    public extCreateCollection(): void {
        this.collection_name = "";
        this.upimg = "";
         this.img_pv = "";
        this.createNewCollection = false;
    }

    //文件上传返回结果
    public upRes(n: any): void {
        if (n) {
            this.upimg = n;
            this.img_pv = URL.createObjectURL(n);
        } else {
            this.upimg = "";
            this.img_pv = "";
        }
        this.upLoadPhoto = false;
    }
}