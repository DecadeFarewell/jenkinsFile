import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Login = () => import('@/page/login.vue');
const Register = () => import('@/page/register.vue');
const Alumni = () => import('@/page/home.vue');
const Dynamic = () => import('@/page/dynamic.vue');
const Personal = () => import('@/page/personal.vue');
const UserInfo = () => import("@/components/personal/index.vue");
const MyDynamic = () => import('@/components/personal/MyDynamic.vue');
const SchoolMate = () => import('@/page/schoolMate.vue');
const ClassDetail = () => import('@/components/schoolMate/ClassDetail.vue');
const ClassAlbum = () => import('@/components/schoolMate/ClassAlbumShow.vue');
const Chat = () => import('@/page/chat.vue');
const Notice = () => import('@/page/notice.vue');
const NotFound = () => import('@/page/notFound.vue');

const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
];
const asyncRouterMap = [
  {
    path: '/alumni',
    name: 'alumni',
    component: Alumni,
    meta: { role: ['ordinary', 'admin'] },
    redirect: '/alumni/dynamic',
    children: [
      {
        path: 'dynamic',
        name: 'dynamic',
        meta: { role: ['ordinary', 'admin'] },
        component: Dynamic
      },
      {
        path: 'personal',
        name: 'personal',
        meta: { role: ['ordinary'] },
        component: Personal,
        redirect: 'personal/userInfo',
        children: [
          {
            path: 'userInfo',
            name: 'userInfo',
            component: UserInfo,
            meta: { role: ['ordinary'] },
          },
          {
            path: 'myDynamic',
            name: 'myDynamic',
            component: MyDynamic,
            meta: { role: ['ordinary'] },
          }
        ]
      },
      {
        path: 'schoolMate',
        name: 'schoolMate',
        component: SchoolMate,
        meta: { role: ['ordinary', 'admin'] },
        redirect: 'schoolMate/class/1',
        children: [
          {
            path: 'class/:classID',
            name: 'classDetail',
            meta: { role: ['ordinary', 'admin'] },
            component: ClassDetail,
          },
          {
            path: 'class/:classID/album',
            name: 'classalbum',
            meta: { role: ['ordinary', 'admin'] },
            component: ClassAlbum,
          }
        ]
      },
      {
        path: 'chat',
        name: 'chat',
        meta: { role: ['ordinary', 'admin'] },
        component: Chat
      },
      {
        path: 'notice',
        name: 'notice',
        meta: { role: ['ordinary', 'admin'] },
        component: Notice,
      }
    ]
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404',
  }
];


const router = new Router({
  mode: 'history',
  linkActiveClass: "active", //将类名route-link-active 简化成类名active
  linkExactActiveClass: "exact",//route-link-exact-active -> exact
  routes: constantRouterMap
})


export default router;
export { asyncRouterMap, constantRouterMap };
