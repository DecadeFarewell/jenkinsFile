import axios from 'axios'
import qs from 'qs';
import store from '@/store/index.js'

switch (process.env.NODE_ENV) {
    case 'development':
        axios.defaults.baseURL = 'http://127.0.0.1:3110'
        break;
    case 'production':
        axios.defaultss.baseURL = 'http://127.0.0.1:3110'
        break;
}
axios.defaults.timeout = 8000;
axios.defaults.withCredentials = true;// 携带cookie，非同源
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; //这个就是xxx=xxx&&xxx=xxx的形式
// axios.defaults.transformRequse = data => qs.stringify(data); //把对象变为xxx=xxx&&xxx=xxx的形式;

axios.interceptors.request.use(config => { //让所有的请求全部带上token
    let token = store.state.token;
    token && (config.headers.Authorization = token)
    return config;
}, error => { //请求发送失败的时候
    return Promise.reject(error);
})

// 校验状态码是 200 <= status <= 300，才回进入响应拦截的成功处理逻辑，否则进入失败处理
// axios.defaults.validateStatus = status => {
//     return /^(2|3)\d{2}$/.test(status);
// }

// axios.interceptors.response.use(response => {
//     return response.data;
// }, error => { //状态码不是200 - 300 都会进入到这里
//     let { response } = error;
//     if (response) { //服务器起码返回了结果
//         switch (response.status) {
//             case 401: //=> 权限，当前请求需要验证
//                 break;
//             case 403: //=> 接收请求，但拒绝执行，token、session过期的情况
//             localStorage.removeItem('token');
//             //跳转到登录页面
//                 break;
//             case 404:
//                 break;
//             default:
//                 break;
//         }
//     } else { // 连结果都没有，可能是服务器崩了，或者是客户端断网了
//         if (!window.navigator.onLine) {
//             //断网处理：可以跳转到断网页面，写一个断网页面
//         }
//         return Promise.reject(error);
//     }
// })

export default axios;