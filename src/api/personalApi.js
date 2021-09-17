import axios from '@/axios';

export default {
    modifyUserInfo(path, data) {
        return axios.post(path, data)
    },
    getAvater(path, params) {
        return axios.get(path, {
            params
        })
    },
    replaceAvater(path, data) {
        return axios.post(path, data)
    },
    getAvaterPath(path, params) {
        return axios.get(path, {
            params
        })
    },
    getClassList() {
        return axios.get('/personal/getClassList')
    },
    getMyDynamicList(params) {
        return axios.get('/personal/getMyDynamicList', {
            params
        })
    },
    //获取通知数量
    getNesMsgNum(params) {
        return axios.get('/personal/getNewMessageNum', {
            params
        })
    },
    //获取被评论的动态
    getNotifyDynamic(params){
        return axios.get('/personal/getNotifyDynamic',{
            params
        })
    },
    //清除通知
    hasLookAll(data){
        return axios.post('/personal/hasLookAll', data)
    }
}