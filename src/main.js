// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/global.css';
import whiteList from '@/utils/whiteList';

import VueLazyload from 'vue-lazyload'  //引入懒加载插件

import APIS from '@/api/index.js';
Vue.prototype.$api = APIS;

const $url = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3110' : 'http://127.0.0.1:3110'
Vue.prototype.$url = $url;

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/images/err.jpg',
  loading: '/static/images/loading.jpg',
  attempt: 2,
})
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (store.state.token) {//判断是否有token
    if (to.path === '/login') {
      next({ path: '/alumni' })
    } else {
      if (store.state.roles.length === 0) {//权限角色为0.说明还没有获取个人信息
        store.dispatch('GetUserInfo').then(resp => {
          const roles = resp.data.data[0].role;
          store.dispatch('GenerateRoutes', roles).then(() => {// 生产可访问的路由表
            router.addRoutes(store.state.addRouters);
            next({ ...to, replace: true })//确保addRoutes已经完成
          })
        }).catch(error => {
          console.log(error)
        })
      } else { //有权限的时候，说明可访问的路由都已经生成
        next();
      }
    }
  } else {// 没有token的情况
    if (whiteList.indexOf(to.path) !== -1) { //白名单页，免登录即可进入的；比如本项目中的登录页
      next()
    } else {
      next('/login')
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
