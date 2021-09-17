import axios from '@/axios';

export default {
    //发布公告
    publishNotice(data) {
        return axios.post('/notice/publishNotice', data)
    },
    //获取所有公告
    getAllNotice(){
        return axios.get('/notice/getAllNotices')
    },
    //删除公告
    delNotice(data){
        return axios.post('/notice/delNoticeById',data)
    }
}