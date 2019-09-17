import axios from 'axios'
import service from './ordersApi'
import { Message } from 'element-ui'
import store from "../store";
//service 循环遍历输出不同请求方法

let instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/v1/openapi/',
    //timeout: 10000
})

const Http = {}; //封装请求方法的容器

//请求格式/参数的统一
for (let key in service) {
    let api = service[key]; //url method
    //async: 避免进入回调地狱
    Http[key] = async function(
        params, //请求参数 get: url, post/put/patch: data, delete: url
        isFormData=false, //标识是否是form-data请求
        config={}, //配置参数
        pathParams={} //路径变量
    ) {
        let newParams = {}
        //content-type是否是form-data判断
        if (params && isFormData) {
            newParams = new FormData()
            for (let key in params) {
                newParams.append(key, params[key])
            }
        } else {
            newParams = params
        }
        //处理url路径中的变量
        let url = api.url
        for (let key in pathParams) {
            let reg = "/{"+key+"}/g";
            url = url.replace(eval(reg), pathParams[key]);
        }
        //不同请求的判断
        let response = {}; //请求的返回值
        if (api.method === 'post' || api.method === 'put' || api.method === 'patch') {
            try {
                response = await instance[api.method](url, newParams, config)
            }catch (err) {
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                response = await instance[api.method](url, config)
            }catch (err) {
                response = err
            }
        }
        return response; //返回响应值
    }

}

//拦截器的添加
//请求拦截器
instance.interceptors.request.use(config => {
    //发起请求前做什么
    //添加token
    if (store.state.Authorization !== null && store.state.Authorization !== '') {
        config.headers.common['token'] = store.state.Authorization
    }
    return config
}, err => {
    return Promise.reject(err);
})

//响应拦截器
instance.interceptors.response.use(res => {
    //请求成功
    console.log(res.data)
    let statusCode = parseInt(res.data.statusCode)
    console.log(statusCode)
    if (statusCode < 200 && statusCode >= 500) {
        console.log("htj" + res.data)
        Message( {
            message: "Server Inner Error: please connect to hetengjiao@chinamobile.com",
            duration: 0,
            showClose: true,
            type: "error",
            offset: 20
        })
    } else if (res.status === 401 || statusCode === 401001) {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('username');
        this.$router.push('/login').then(res => {
                Message( {
                    message: "Authorization fail, login again",
                    duration: 1000,
                    //showClose: true,
                    type: "error",
                    offset: 20
                })
            }
        );
    }else{
        return res.data
    }

}, (err) => {
    //请求失败
    Message( {
        message: err.message,
        duration: 0,
        showClose: true,
        type: "error",
        offset: 20
    })
})

export default Http