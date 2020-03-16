import axios from "./index"
import { buildParams } from "@/utils/util";

//登录接口
export function login(params) {
    return new Promise((resolve, reject) => {
        axios.post('/user/login.json', buildParams(params)).then(value => {
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

//获取某个列表
export function getList(params) {
    return new Promise((resolve, reject) => {
        axios.post('/equipOnline/selectEquipOnlineListWithPage.json', buildParams(params)).then(value => {
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