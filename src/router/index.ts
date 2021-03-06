import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/home/Home.vue';
import Register from '../views/register/Register.vue';
import Findpassword from '../views/findPassword/FindPassword.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  //首页
  {
    path: '/',
    name: 'Home',
    redirect: '/recommend',
    component: Home,
    children: [
      //热门推荐
      {
        path: '/recommend',
        name: 'Recommend',
        component: () => import('../views/recommend/Recommend.vue')
      },
      //我的关注
      {
        path: '/myfollow',
        name: 'Myfollow',
        component: () => import('../views/myfollow/Myfollow.vue')
      },
      //精选
      {
        path: '/selected',
        name: 'selected',
        component: () => import('../views/selected/Selected.vue')
      },
    ]
  },
  //注册
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  //找回密码
  {
    path: '/findpassword',
    name: 'Findpassword',
    component: Findpassword,
  },
  //登录
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue'),
  },
  //注册
  {
    path: '/homeset',
    name: 'HomeSet',
    component: ()=>import('../views/homeset/HomeSet.vue'),
  },
  //绑定睿读账号
  {
    path: '/bindAccount',
    name: 'BindAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/bind/BindAccount.vue'),
  },
  //新闻详情
  {
    path: '/newsinfo',
    name: 'NewsInfo',
    component: () => import('../views/newsinfo/NewsInfo.vue')
  },
  //分享的收藏夹
  {
    path:'/fromshare',
    name:'FromShare',
    component:()=>import('../views/fromshare/FromShare.vue')
  },
  //宣传介绍
  {
    path:'/publicity',
    name:'Publicity',
    component:()=>import('../views/publicity/Publicity.vue')
  },
  //宣传介绍
  {
    path:'/xjpublicity',
    name:'XjPublicity',
    component:()=>import('../views/xjpublicity/XjPublicity.vue')
  },
  //个人中心
  {
    path: '/user',
    name: 'User',
    redirect: '/user/form/fetch',
    component: () => import('../views/user/User.vue'),
    children: [
      //统计报表
      {
        path: 'form/:type',
        name: 'Form',
        meta:{auth:true},
        component: () => import('../views/userform/UserForm.vue'),
      },
      //密码管理
      {
        path: 'password',
        name: 'PassWord',
        component: () => import('../views/userpassword/UserPassWord.vue')
      },
      //我的收藏
      {
        path: 'collection/:name',
        name: 'Collection',
        component: () => import('../views/usercollection/UserCollection.vue')
      },
      //我的关注
      {
        path: 'follow/:type',
        name: 'Follow',
        component: () => import('../views/userfollow/UserFollow.vue')
      },
      //我的消息
      {
        path: 'message',
        name: 'Message',
        component: () => import('../views/usermessage/UserMessage.vue')
      },

      //账号管理
      {
        path: "account",
        name: "Account",
        component: () => import('../views/useraccount/UserAccount.vue')
      },
      //用户管理
      {
        path: "users",
        meta:{auth:true},
        name: "Users",
        component: () => import('../views/userusers/UserUsers.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
