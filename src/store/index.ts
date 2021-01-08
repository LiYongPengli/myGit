import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户信息
    user_message:'' as any,
    index_channel_window:false,
    //文章语言
    language:'crawler',
    //聊天窗口
    topic_show:false,
    //是否显示搜索页面
    show_intelligent:false,
    //主页面距离顶部距离
    mainPageScrollTop:0,
    //是否回到顶部
    suretop:false,
    //首页分页加载开关
    mainPageLoading:false,
    //聊天工具iframe地址
    topic_url:'http://zlbxxcj.bjceis.com/im/channel/general',
    //聊天工具状态切换
    topic_status:1,
    //被分享的新闻
    shareNews:null,
    //是否将聊天框插入到dom中
    iframeShow:false,
    //是否有全局消息
    isGlobMessage:false
  },
  mutations: {
    setIndexChannelWindow(state,n):void{
      state.index_channel_window = n;
    },
    setLanguage(state,n):void{
      state.language = n;
    },
    setTopicShow(state,n):void{
      state.topic_show = n;
    },
    setUserMessage(state,n):void{
      state.user_message = n;
    },
    setShowIntelligent(state,n):void{
      state.show_intelligent = n;
    },
    setScrollTop(state,n):void{
      state.mainPageScrollTop = n;
    },
    setSureTop(state,n):void{
      state.suretop = n;
    },
    setMainPageLoading(state,n):void{
      state.mainPageLoading = n;
    },
    setTopicUrl(state,n):void{
      state.topic_url = n;
    },
    setTopicStatus(state,n):void{
      state.topic_status = n;
    },
    setShareNews(state,n):void{
      state.shareNews = n;
    },
    setIframeShow(state,n):void{
      state.iframeShow = n;
    },
    setGlobMessage(state,n):void{
      state.isGlobMessage = n;
    }
  },
  actions: {
  },
  modules: {
  },
});
