import loginApi from './loginApi';
import dynamicApi from './dynamicApi';
import personalApi from './personalApi';
import schoolMateApi from './schoolMateApi';
import chatApi from './chatApi';
import noticeApi from './noticeApi';

export default {
    ...loginApi,
    ...dynamicApi,
    ...personalApi,
    ...schoolMateApi,
    ...chatApi,
    ...noticeApi
}