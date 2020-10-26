import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    index_channel_window:false,
    language:'crawler'
  },
  mutations: {
    setIndexChannelWindow(state,n):void{
      state.index_channel_window = n;
    },
    setLanguage(state,n):void{
      state.language = n;
    }
  },
  actions: {
  },
  modules: {
  },
});
