import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户信息
    user_message:'',
    index_channel_window:false,
    //文章语言
    language:'crawler',
    //聊天窗口
    topic_show:false,
    //是否显示搜索页面
    show_intelligent:false
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
    }
  },
  actions: {
  },
  modules: {
  },
});
