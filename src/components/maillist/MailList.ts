import { baseApi } from '@/axios/axios';
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class MailList extends Vue {
    public newfriendid: boolean = false;
    public userlists = [{

        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    },
    {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'

    },
    {
        headportrait: 'C',
        chinename: '测员1',
        engname: 'ceshiyuan',
        add: '+',
        num: 1,
        remarks: '我是测试员'


    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'

    }, {
        headportrait: 'C',
        chinename: '测试员asd',
        engname: 'ceshiyuan',
        add: '+',
        num: 2,
        remarks: '我是测试员',


    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'

    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }, {
        headportrait: 'C',
        chinename: '测试员',
        engname: 'ceshiyuan',
        add: '+',
        num: 0,
        remarks: '我是测试员',
        request: '请求添加好友'
    }
    ];

    public zmlist = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
        { name: 'I' },
        { name: 'I' },
        { name: 'J' },
        { name: 'K ' },
        { name: 'L' },
        { name: 'M ' },
        { name: 'N' },
        { name: 'O' },
        { name: 'P' },
        { name: ' Q ' },
        { name: 'R ' },
        { name: 'S ' },
        { name: 'T ' },
        { name: 'U ' },
        { name: 'V ' },
        { name: 'W' },
        { name: 'X' },
        { name: 'Y' },
        { name: 'Z ' },
        { name: '其他 ' }]

    @Watch('newfriendid')
    listennewfriendid(newVal:boolean,oldVal:boolean):void{
        if(newVal){
            this.getNewFriendsList();
        }else{
            
        }
    }

    private getNewFriendsList(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'new_friends'
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err);
            })
    }
}