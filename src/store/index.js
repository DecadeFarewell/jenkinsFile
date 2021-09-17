import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRouterMap, constantRouterMap } from '@/router/index.js'

function getRouters(roles) {
    const filter = asyncRouterMap => {
        return asyncRouterMap.filter(v => {
            const flag = hasPermission(roles, v)
            if (flag) {
                if (v.children && v.children.length > 0) {
                    v.children = filter(v.children);
                }
                return true;
            } else {
                return false;
            }
        })
    }
    return filter(asyncRouterMap)
}

function hasPermission(roles, route) {//roles中的权限只要有一个在route.meta.role的权限表中，就说明对该路由享有权限
    if (roles && roles.length > 0 && route.path !== '*' && route.path !== '/404') {
        return roles.some(role => {
            return route.meta.role.indexOf(role) > -1
        })
    } else {
        return true
    }
}
function getCookie(cookieName) {
    const cookies = document.cookie;
    let cookieItem = cookies ? cookies.split('; ') : null;
    let cookieEntries = {}
    if (cookieItem) {
        for (let i = 0; i < cookieItem.length; i++) {
            let arr = cookieItem[i].split('=');
            cookieEntries[arr[0]] = arr[1];
        }
    }
    return cookieEntries[cookieName] ? cookieEntries[cookieName] : null;
}
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: getCookie('token'), //token
        roles: [],//权限列表
        routers: constantRouterMap,
        addRouters: [],//动态生成的路由表
        userInfo: {},
        classID: localStorage.getItem('classID') ? JSON.parse(localStorage.getItem('classID')) : null,
        notifyCount: 0,
    },
    mutations: {
        set_token(state, token) {
            state.token = token
        },
        set_user_info(state, userInfo) {
            state.userInfo = userInfo;
        },
        clear_user_info(state) {
            state.userInfo = {};
        },
        clear_token(state) {
            state.token = null
        },
        set_classID(state, payload) {
            state.classID = payload.classID
            localStorage.setItem('classID', JSON.stringify(payload.classID));
        },
        set_addRouters(state, addRouters) {
            state.addRouters = addRouters;
            state.routers = constantRouterMap.concat(addRouters);
        },
        set_role(state, role) {
            state.roles = role;
        },
        clear_role(state) {
            state.roles = [];
        },
        set_notify(state, count) {
            state.notifyCount = count;
        },
        clear_notify(state){
            state.notifyCount = 0;
        }
    },
    actions: {
        LoginByUsername({ commit }, userInfo) {
            // const { userName, password } = userInfo;
            return new Promise((resolve, reject) => {
                Vue.prototype.$api.loginByUsername(userInfo).then(resp => {
                    const data = resp.data;
                    if (data.status === 'ok') {
                        document.cookie = `token=${data.data};`;
                        commit('set_token', data.data)
                        resolve()
                    } else {
                        Vue.prototype.$message({
                            showClose: true,
                            message: data.msg,
                            type: "error"
                        })
                    }
                })
            }).catch(error => {
                reject(error)
            })
        },
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api.getUserInfo().then(resp => {
                    const info = resp.data.data[0];
                    commit('set_user_info', info);
                    commit('set_role', info.role);
                    resolve(resp)
                })
            })
        },
        GenerateRoutes({ commit }, roles) {
            return new Promise((resolve, reject) => {
                const accessRoutes = getRouters(roles);
                commit('set_addRouters', accessRoutes);
                resolve();
            })
        },
        GetNotifyCount({ commit, state }) {
            return new Promise((resove, reject) => {
                Vue.prototype.$api.getNesMsgNum({
                    userID: state.userInfo.id
                }).then(resp => {
                    const count = resp.data.data[0].count;
                    count && commit('set_notify',count);
                });
            })
        }
    }
})
