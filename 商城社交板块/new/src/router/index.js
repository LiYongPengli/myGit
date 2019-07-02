import Vue from 'vue'
import Router from 'vue-router'
//import Add from '@/components/Add'
//import Recommend from '@/components/Recommend/Recommend'
//import message from '@/components/message/message'
//import videos from '@/components/videos/videos'
//import release from '@/components/release/release'
//import Focus from '@/components/Focus/Focus'
//import userFocus from '@/components/userFocus/userFocus'
//import Near from '@/components/Near/Near'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:'Add',
      redirect:'/add/recommend',
      component:resolve=>require(['@/components/Add'],resolve)
    },
    {
      path: '/add',
      name: 'Add',
      redirect:'/add/recommend',
      component: resolve=>require(['@/components/Add'],resolve),
      children:[
        {
          path: 'recommend',
          name: 'Recommend',
          meta:{
            keepAlive:true
          },
          component: resolve=>require(['@/components/Recommend/Recommend'],resolve)
        },
        {
          path: 'focus',
          name: 'Focus',
          meta:{
            keepAlive:true
          },
          component: resolve=>require(['@/components/Focus/Focus'],resolve)
        },
        {
          path: 'near',
          name: 'Near',
          meta:{
            keepAlive:true
          },
          component: resolve=>require(['@/components/Near/Near'],resolve)
        }


      ]
    },
    {
      path: '/msg',
      name: 'message',
      meta:{
        keepAlive:true
      },
      component: resolve=>require(['@/components/message/message'],resolve)
    },
    {
      path: '/release',
      name: 'release',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: resolve=>require(['@/components/release/release'],resolve),
    },
    {
      path: '/videos',
      name: 'videos',
      meta:{
        keepAlive:false
      },
      component: resolve=>require(['@/components/videos/videos'],resolve)
    },
    {
      path: '/userFocus',
      name: 'userFocus',
      meta:{
        keepAlive:true
      },
      component: resolve=>require(['@/components/userFocus/userFocus'],resolve)
    },
    {
      path: '/topic',
      name: 'topic',
      meta: {
        keepAlive: true, //此组件需要被缓存
      },
      component: resolve=>require(['@/components/topic/topic'],resolve),
    },
    {
      path: '/position',
      name: 'position',
      meta:{
        keepAlive:true
      },
      component: resolve=>require(['@/components/position/position'],resolve)
    } ,
    {
      path: '/my',
      name: 'my',
      meta:{
        keepAlive:true
      },
      component: resolve=>require(['@/components/my/my'],resolve)
    }

  ]
})
