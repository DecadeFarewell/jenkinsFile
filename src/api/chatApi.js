import axios from '@/axios';

export default {
    getMessageList() {
        return axios.get('/chatRoom/getMsgList');
    },
    // sendMessage(data) {
    //     return axios.post('/chatRoom/sendMsg', data);
    // },
    sendMsg(uId){
        const wsUrl = process.env.NODE_ENV === 'development' ? `ws://localhost:3110/chatRoom/${uId}` : '';
        return new WebSocket(wsUrl);
    }
}