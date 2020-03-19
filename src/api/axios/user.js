import instance from "./index"
import { buildParams } from "@/utils/util";

function request(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, buildParams(params)).then(value => {
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

/**
 * 防止重复请求
 * swit：开关，为false时防重复功能
 *  */
function debounce(url, swit = true) {
    var loading = false;//为true时代表此接口正在请求中
    return function (params, resolve = () => { }, reject = () => { }) {
        if (!loading || !swit) {
            loading = true;
            request(url, params)
                .then(val => { loading = false; resolve(val) })
                .catch(error => { loading = false; reject(error) });
        }
    }
}

//登录接口
export const login = debounce('/user/login.json')

//获取居民列表
export const getResidents = debounce('/live/residentLive/selectFullJoinListWithPage.json')

//获取枚举数据
export const getDictData = debounce('/dict/getDictData.json', false)