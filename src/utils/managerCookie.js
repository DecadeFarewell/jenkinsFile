export default manegerCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this
    },
    removeCookie: function (name) {
        this.setCookie(name, '', -1)
        return this
    },
    getCookie: function (name, callback) {
        //这里有个坑要注意，获取的cookie每个分号后面都带一个空格
        let cookieList = document.cookie.split('; ')
        console.log(cookieList)
        for (let i = 0; i < cookieList.length; i++) {
            let itemCookie = cookieList[i].split('=')
            console.log(itemCookie, itemCookie[0])
            if (itemCookie[0] == name) {
                console.log(itemCookie[1])
                callback(itemCookie[1])
                return this
            }
        }
        callback(undefined)
        return this
    }
}