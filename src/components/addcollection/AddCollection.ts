import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
@Component
export default class AddCollectionCom extends Vue {
    @Prop({}) id!:string;
    //收藏夹列表
    public favoriteList: any[] = [];
    //创建的收藏夹名称
    public collection_name: string = "";
    //图片预览路径
    public img_pv: string = "";
    //要上传的文件
    public upimg: any = "";
    public upLoadPhoto: boolean = false;
    //创建新书签
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
            this.$message.error("请输入书签名称");
            return;
        }
        if (!this.upimg) {
            this.$message.error("请上传封面");
            return;
        }
        let formdata = new FormData();
        formdata.append("name", this.collection_name);
        formdata.append("cover", this.upimg);
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