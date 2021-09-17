import axios from '@/axios';

export default {
    //获取班级列表
    getClassMember() {
        return axios.get('/schoolMate/getClassMember');
    },
    //上传图片到班级相册
    uploadToAlbum(data, id) {
        return axios.post(`/schoolMate/uploadToAlbum?classID=${id}`, data)
    },
    //获取封面
    getPoster(params) {
        return axios.get('/schoolMate/getAlbumPost', {
            params
        })
    },
    //获取相册图片路径
    getAlbumImgsPath(params) {
        return axios.get('/schoolMate/getAlbumImgsPath', {
            params
        })
    },
    // 获取该班级的所有人信息
    getClassMemberInfo(params) {
        return axios.get('/schoolMate/getAllMember', {
            params
        })
    },
    //班级编号与班级名称映射
    getClassNameMap() {
        return axios.get('/schoolMate/getAllClass')
    },
    //删除某张照片
    delCertainPhoto(params) {
        return axios.get('/schoolMate/delPhotoById', {
            params
        })
    },
    //模糊查询
    fuzzyQuery(data){
        return axios.post('/schoolMate/fuzzyQuery', data)
    }
}