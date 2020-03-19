import axios from "axios"

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://caihai123.github.io/' : '/mock'
});
export default instance