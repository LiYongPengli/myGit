import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import echarts from 'echarts'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class SiteResourcesCom extends Vue {


    public value1: string = "";
    public value2: string = "";
    public mounted(): void {

        this.fetchDataInfo();
        this.fetchDataInfo1();


        // this.tableRowClassName();

    }
    // <div class="list_li_accountnumber">账号</div>
    //             <div class="list_li_name">昵称</div>
    //             <div class="list_li_phone">手机号</div>
    //             <div class="list_li_count">累计登录次数</div>
    //             <div class="list_li_time">最后登录时间</div>
    public tableData = [{
        ranking: '1',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '2',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '3',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '4',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    },
    {
        ranking: '5',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '6',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '7',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '8',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '9',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '10',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '11',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '12',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '1',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '13',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }, {
        ranking: '14',
        newsname: '招银国际：新iPhone发布利好穿戴产品供应商',
        forwardingtimes: '1000'


    }, {
        ranking: '15',
        newsname: '招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支招银国际研报中称，苹果昨夜发布新产品，一如预期包括四款iPhone12，和智能扬声器HomePod Mini。四款iPhone12都支...',
        forwardingtimes: '1000'

    }
    ]
}