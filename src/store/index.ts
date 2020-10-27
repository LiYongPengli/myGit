import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index_channel_window:false,
    language:'crawler',
    //聊天窗口
    topic_show:false
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
    }
  },
  actions: {
  },
  modules: {
  },
});
