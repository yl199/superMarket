//引入axios
import axios from "axios";

//引入qs
import qs from "qs"
//引入local
import local from "./local"

//设置请求服务器的根目录
axios.defaults.baseURL="http://127.0.0.1:888"

// axios请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('y_l_10_12');
    config.headers.authorization = `Bearer ${token}` 
    return config;
})

//导出请求对象
export default{
    //get请求
    get(url,params={}){
        return new Promise((resolve,reject) => {
            axios.get(url,{ params })
                 .then(response => {
                    resolve(response.data);  //成功的情况用resolve
                 })
                 .catch(err => {
                     reject(err);  //失败的情况用reject
                 })
        })
    },
    //post请求
    post(url,params={}){
        return new Promise((resolve,reject) => {
            axios.post(url, qs.stringify(params))  //将获取的数据转成标准参数格式
                 .then(response => {
                    resolve(response.data);  //成功的情况用resolve
                 })
                 .catch(err => {
                     reject(err);  //失败的情况用reject
                 })
        })
    }
}