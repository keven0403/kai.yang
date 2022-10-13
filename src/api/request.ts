/**
 * 网络请求配置
 */
import axios from 'axios'
import { message } from 'antd'
import { domain } from '@/constants/config'

axios.defaults.timeout = 100000
axios.defaults.baseURL = domain
let isInvalidToken: boolean = false

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data)
        if (config.method === 'get' && config.params && config.params.need) {
            config.headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        } else {
            config.headers = {
                "Content-Type": "application/json",
                "AUTH-TOKEN": localStorage.getItem('token') || '' 
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response: any) => {
        isInvalidToken = false
        if (response.headers['auth-token']) {
            localStorage.setItem('token', response.headers['auth-token'])
        }
        return response
    },
    (error: any) => {
        let code: number = 500
        if (error.response && error.response.data && error.response.data.code) {
            code = error.response.data.code
        }
        if ([1502, 1505].includes(code)) { // 1505token无效，1502用户不在白名单内
            if (!isInvalidToken) {
                isInvalidToken = true
                message.error(error.response.data.message)
                localStorage.removeItem('token')
                localStorage.setItem('code', `${code}`)
                window.location.hash = `/login?code=${code}`
                return error.response
            }
        } else {
            setTimeout(() => {
                isInvalidToken = false
            }, 800)
            if (!isInvalidToken) {
                isInvalidToken = true
                if (error.response && error.response.data) {
                    message.error(error.response.data.message)
                } else {
                    message.error("system error!")
                }
                return error.response
            }
        }
    }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: any, params?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response:any) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: any, data?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                //关闭进度条
                resolve(response.data)
            },
            (err) => {
                reject(err)
            }
        )
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: any, data?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data)
            },
            (err) => {
                msag(err)
                reject(err)
            }
        )
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url: any, data?: Object): Promise<unknown> {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data)
            },
            (err) => {
                msag(err)
                reject(err)
            }
        )
    })
}

//统一接口处理，返回数据
export default function (fecth: any, url: any, param?: Object): Promise<unknown> {
    let _data = ""
    return new Promise((resolve, reject) => {
        switch (fecth) {
            case "get":
                console.log("begin a get request,and url:", url)
                get(url, param)
                    .then(function (response) {
                        resolve(response)
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error)
                        reject(error)
                    })
                break
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response)
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error)
                        reject(error)
                    })
                break
            default:
                break
        }
    })
}

export const verifyDescordService = (url: string, params?: Object): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response:any) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

//失败提示
function msag(err: any) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                message.error(err.response.data.error.details)
                break
            case 401:
                message.error("未授权，请登录")
                break

            case 403:
                message.error("拒绝访问")
                break

            case 404:
                message.error("请求地址出错")
                break

            case 408:
                message.error("请求超时")
                break

            case 500:
                message.error("服务器内部错误")
                break

            case 501:
                message.error("服务未实现")
                break

            case 502:
                message.error("网关错误")
                break

            case 503:
                message.error("服务不可用")
                break

            case 504:
                message.error("网关超时")
                break

            case 505:
                message.error("HTTP版本不受支持")
                break
            default:
        }
    }
}
