import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CountryCom extends Vue {
    public country_list: any[] = [];
    public country_follow_list: any[] = [];
    public countrylist = [
        {
            number: 1,
            name: '中国'
        }, {
            number: 2,
            name: '中国'
        }
        , {
            number: 3,
            name: '中国'
        }
        , {
            number: 4,
            name: '中国'
        }
        , {
            number: 5,
            name: '中国'
        }
        , {
            number: 6,
            name: '中国'
        }
        , {
            number: 7,
            name: '中国'
        }
        , {
            number: 8,
            name: '中国'
        }
        , {
            number: 9,
            name: '中国'
        }
        , {
            number: 10,
            name: '中国'
        }
        , {
            number: 11,
            name: '中国'
        }
        , {
            number: 12,
            name: '中国'
        }, {
            number: 13,
            name: '中国'
        }
        , {
            number: 14,
            name: '中国'
        }
        , {
            number: 15,
            name: '中国'
        }
        , {
            number: 16,
            name: '中国'
        }
        , {
            number: 17,
            name: '中国'
        }
        , {
            number: 18,
            name: '中国'
        }, {
            number: 19,
            name: '中国'
        }
        , {
            number: 20,
            name: '中国'
        }
    ];

    //定义数据是否需要完全显示的属性
    public showAll: boolean = false;
    
    public get showlist(): any {

        if (this.showAll == false) {
            let showlist: any = [];
            if (this.countrylist.length > 10) {
                for (var i = 0; i < 10; i++) {
                    showlist.push(this.countrylist[i])
                }
            }
            else {
                showlist = this.countrylist
            }
            return showlist;
        }
        else {
            return this.countrylist;
        }
    }

    public get word(): any {
        if (this.showAll == false) {
            return '展开'
        }
        else {
            return '收起'
        }
    }



    //删除单个
    public del(k: number): void {
        var index = this.countrylist.findIndex(item => {
            if (item.number == k) {
                return true
            }
        })
        this.countrylist.splice(index, 1);

    }
    public created(): void {
        this.getList();
    }
    private getList(): void {
        this.getSubscriptions('country', 'sub', res => {
            console.log(res.data)
        });
        this.getSubscriptions('country', 'ussub', res => {
            console.log(res.data)
        });
    }
    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }
}