import axios from 'axios'
import qs from 'querystring'
const base_url = 'http://localhost:7777/monitor/Home'    //后台基础请求路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default class syRequest {
    constructor(){
        this.baseUrl = base_url
        // this.params = params
    }
    get(url,params){
        return axios.get(this.baseUrl+url,params)
    }
    post(url,params) {
        return axios.post(this.baseUrl+url,qs.stringify(params))
    }
    put(url,params) {
        return axios.put(this.baseUrl+url,params)
    }
}
