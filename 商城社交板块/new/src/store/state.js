import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        currentPage:'',//关注列表当前页
        nextPage:'',//关注列表下一页
        currentPage1:'',//推荐页面当前页
        nextPage1:'',//推荐页面下一页
        currentPage2:'',//附件页面当前页
        nextPage2:'',//附件下一页
        content:'',
        fileURL:[],
        sendFileData:[],
        cover_width:0,
        cover_height:0,
        widthArr:[],
        position:{},
        tabList:[]
    },
    getters:{
      getTabList(state){
        return state.tabList;
      },
        getPosition(state){
          return state.position;
        },
        getContent(state){
          return state.content;
        },
        getWidthArr(state){
          return state.widthArr;
        },
        getFileURL(state){
          return state.fileURL;
        },
        getSendFileData(state){
          return state.sendFileData;
        },
        getCover_width(state){
          return state.cover_width;
        },
        getCover_height(state){
          return state.cover_height;
        },
        getCurrentPage(state){
            return state.currentPage;
        },
        getNextPage(state){
            return state.nextPage;
        },
        getCurrentPage1(state){
            return state.currentPage1;
        },
        getNextPage1(state){
            return state.nextPage1;
        },
        getCurrentPage2(state){
            return state.currentPage2;
        },
        getNextPage2(state){
            return state.nextPage2;
        }
    },
    mutations:{
        setTabList(state,n){
          state.tabList=n;
        },
        setPosition(state,n){
          state.position=n;
        },
        setWidthArr(state,n){
          state.widthArr=n;
        },
        setCurrentPage(state,n){
            state.currentPage = n;
        },
        setNextPage(state,n){
            state.nextPage = n;
        },
        setCurrentPage1(state,n){
            state.currentPage1 = n;
        },
        setNextPage1(state,n){
            state.nextPage1 = n;
        },
        setCurrentPage2(state,n){
            state.currentPage2 = n;
        },
        setNextPage2(state,n){
            state.nextPage2 = n;
        },
        setContent(state,n){
          state.content= n;
        },
        setFileURL(state,n){
          state.fileURL= n;
        },
        setSendFileData(state,n){
          state.sendFileData= n;
        },
        setCover_width(state,n){
          state.cover_width= n;
        },
        setCover_height(state,n){
          state.cover_height= n;
        }


    }
})
