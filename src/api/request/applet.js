import axios from "./index"

//获取路由列表
export function routerList(params) {
    return new Promise((resolve, reject) => {
        axios.get("/applet/jsons/caihai.json", {
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