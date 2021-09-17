import qs from 'qs';

// fethch请求的封装，axios内部已经封装了对参数的处理，还是比fetch要方便

let baseURL = '127.0.0.1:3110';
export default function request(url, options) {
    url = baseURL + url;
    /**
     * get 系列的请求
     */
    !options.method ? options.method = 'GET' : null
    if (options.hasOwnProperty('params')) {
        if (/^(GET|DELETE|HEAD|OPTIONS)&/i.test(options.method)) {
            const ask = url.indcludes('?') ? '&' : '?';
            url += `${ask}${qs.stringify(options.params)}`
        }
        delete options.params;
    }
    options = Object.assign({
        // 允许跨域携带资源凭证，same-origin表示同源的可以携带。omit表示全部拒绝，include表示全部都带上
        credentials: 'include',
        // 设置请求头
        headers: {}
    }, options)
    options.headers.Accept = 'application/json';

    const token = localStorage.getItem('token');
    token && (options.headers.Authorization = token);

    /**
     * POST请求处理
     */
    if (/^(POST|PUT|)$/i.test(options.method)) {
        !options.type ? options.type = 'urlencoded' : null;
        if (options.type === 'urlencoded') {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.body = qs.stringify(options.body);
        }
        if (options.tppe === 'json') {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(options.body);
        }
    }

    // fetch请求与axios不同的是只要服务端返回了请求它都认为是成功
    return fetch(url, options).then(response => {
        if (/^(2|3)\d{2}$/.test(response.status)) {
            switch (response.status) {
                case 401:
                    //do sth
                    break;
                case 403:
                    // dos th
                    break;
                default:
                    break;
            }
            return Promise.reject(response);
        }
        return response.json();
    }).catch(error => {
        //断网处理
        if (!window.navigator.onLine) {
            //断网处理：可以跳转到断网页面，写一个断网页面

        }
        return Promise.reject(error);
    }