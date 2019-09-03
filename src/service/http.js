import axios from 'axios'
import service from './ordersApi'
import { Message } from 'element-ui'

//service 循环遍历输出不同请求方法

let instance = axios.create({
    baseURL: 'http://127.0.0.1:8090/v1/openapi/',
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
        config={} //配置参数
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
        //不同请求的判断
        let response = {}; //请求的返回值
        if (api.method === 'post' || api.method === 'put' || api.method === 'patch') {
            try {
                response = await instance[api.method](api.url, newParams, config)
            }catch (err) {
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                response = await instance[api.method](api.url, config)
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
    if (sessionStorage.getItem('token')) {
        config.headers.common['token'] = sessionStorage.getItem('token')
    }
    console.log("config: " + config.timeout)
    return config
}, err => {
    return err
})

//响应拦截器
instance.interceptors.response.use(res => {
    //请求成功
    console.log(res.data)
    let statusCode = parseInt(res.data.statusCode)
    if (statusCode < 200 && statusCode >= 300) {
        console.log("htj" + res.data)
        Message( {
            message: res.data.message,
            duration: 0,
            showClose: true,
            type: "error",
            offset: 20
        })
    } else {
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