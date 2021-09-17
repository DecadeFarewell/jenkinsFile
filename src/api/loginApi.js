import axios from '@/axios';

const requset = {
    // 登录请求
    loginByUsername(params) {
        return axios.get('/login', {
            params
        })
    },
    //注册请求
    register(path, data) {
        return axios.post(path, data)
    },
    //获取用户信息
    getUserInfo(){
        return axios.get('/getUserinfo')
    }
}

export default requset;