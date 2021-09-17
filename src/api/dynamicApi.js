import axios from '@/axios';

export default {
    publishDynamic_img(data) {
        return axios.post('/dynamic/pubDynamic/uploadImg', data)
    },
    publishDynamic_info(data) {
        return axios.post('/dynamic/pubDynamic/uploadInfo', data)
    },
    getAllDynamicList(params) {
        return axios.get('/dynamic/getAllDynamic', {
            params
        })
    },
    getDynamicImgPath(params) {
        return axios.get('/dynamic/getDynamicImgPath', {
            params
        })
    },
    delCertainDynamic(params) {
        return axios.get('/dynamic/delById', {
            params
        })
    },
    leaveMessage(data) {
        return axios.post('/dynamic/leaveMessage', data)
    },
    getMessageById(params) {
        return axios.get('/dynamic/getMessageById', {
            params
        })
    },
    delLeaveMsg(data){
        return axios.post('/dynamic/delLeaveMsg', data)
    }
}