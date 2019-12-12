import axios from "axios"
import Vue from 'vue'
import router from "../router"

axios.defaults.timeout = 60000;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code && response.data.code != 200) {
        //回到首页
        router.push("/login");
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                errorNotify('请求错误(400)');
                break;
            case 401:
                errorNotify('未授权，请重新登录(401)');
                break;
            case 403:
                errorNotify('拒绝访问(403)');
                break;
            case 404:
                errorNotify('请求出错(404)');
                break;
            case 408:
                errorNotify('请求超时(408)');
                break;
            case 500:
                errorNotify('服务器错误(500)');
                break;
            case 501:
                errorNotify('服务未实现(501)');
                break;
            case 502:
                errorNotify('网络错误(502)');
                break;
            case 503:
                errorNotify('服务不可用(503)');
                break;
            case 504:
                errorNotify('网络超时(504)');
                break;
            case 505:
                errorNotify('HTTP版本不受支持(505)');
                break;
            default:
                errorNotify('连接出错(' + error.response.status + ')!');
        }
    } else {
        errorNotify('网络异常,请检查网络后重试!');
    }
    return Promise.reject(error);
});

function errorNotify(msg) {
    new Vue().$notify.error({
        title: '错误',
        message: msg
      });
}

export default axios