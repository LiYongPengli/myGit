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
      }
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
  //个人中心
  {
    path: '/user',
    name: 'User',
    redirect: '/user/form',
    component: () => import('../views/user/User.vue'),
    children: [
      //统计报表
      {
        path: 'form',
        name: 'UserForm',
        redirect:'/user/form/fetch',
        component: () => import('../views/userform/UserForm.vue'),
        children:[
          {
            path:'fetch',
            name:'Fetch',
            component:()=>import('../views/formfetch/FormFetch.vue')
          }
        ]
      },
      //密码管理
      {
        path: 'password',
        name: 'UserPassWord',
        component: () => import('../views/userpassword/UserPassWord.vue')
      },
      //我的收藏
      {
        path: 'collection',
        name: 'UserCollection',
        component: () => import('../views/usercollection/UserCollection.vue')
      },
      //我的关注
      {
        path: 'follow',
        name: 'UserFollow',
        component: () => import('../views/userfollow/UserFollow.vue')
      },
      //我的消息
      {
        path: 'message',
        name: 'UserMessage',
        component: () => import('../views/usermessage/UserMessage.vue')
      },

      //账号管理
      {
        path: "account",
        name: "UserAccount",
        component: () => import('../views/useraccount/UserAccount.vue')
      },
      //用户管理
      {
        path: "users",
        name: "UserUsers",
        component: () => import('../views/userusers/UserUsers.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
