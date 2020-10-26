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
    redirect:'/recommend',
    component: Home,
    children:[
      //热门推荐
      {
        path:'/recommend',
        name:'Recommend',
        component:()=>import('../views/recommend/Recommend.vue')
      },
      //我的关注
      {
        path:'/myfollow',
        name:'Myfollow',
        component:()=>import('../views/myfollow/Myfollow.vue')
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
  //新闻详情
  {
    path:'/newsinfo',
    name:'NewsInfo',
    component:()=>import('../views/newsinfo/NewsInfo.vue')
  },
  //个人中心
  {
    path:'/user',
    name:'User',
    component:()=>import('../views/user/User.vue')
  }
];

const router = new VueRouter({
  routes,
});

export default router;
