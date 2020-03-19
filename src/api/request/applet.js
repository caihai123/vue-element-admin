import axios from "./index"

function request(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(value => {
            if (value.data.code === 200) {
                resolve(value)
            } else {
                reject(value)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

//获取居民列表
export const routerList = (function () {
    var loading = false;
    return function (params, resolve = () => { }, reject = () => { }) {
        if (!loading) {
            loading = true;
            request('/applet/jsons/caihai.json', params)
                .then(val => { loading = false; resolve(val) })
                .catch(error => { loading = false; reject(error) });
        }
    }
}())
