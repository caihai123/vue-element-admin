import axios from "axios"

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://caihai123.github.io/' : '/mock';

export default axios