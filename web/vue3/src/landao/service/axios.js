import axios from "axios";
import { isDev, ignore, baseURL } from "@/landao/config";
import { ElMessage } from "element-plus"
import { href, storage } from "@/landao/utils"
import { useBaseStore } from "@/store";

class Http {
    constructor() {
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: baseURL,
            timeout: 5000
        }
        return config;
    }
    //取消
    destroy(url) {
        delete this.queue[url];
    }
    interceptors(instance, url) {
        //请求拦截
        instance.interceptors.request.use(config => {
            this.queue[url] = true;
            const { user } = useBaseStore();

            // 请求信息
            if (isDev) {
                console.group(config.url);
                console.log("method:", config.method);
                console.table("data:", config.method == "get" ? config.params : config.data);
                console.groupEnd();
            }

            //验证用户token
            if (user.token) {
                if (!ignore.apiToken.some(val => config.url.includes(val))) {
                    //判断token是否过期
                    if (storage.hasExpired('token')) {
                        user.clear();
                        return href('/login')
                    }
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }
            }

            return config;
        }, error => {
            return Promise.reject(error)
        });
        //响应拦截
        instance.interceptors.response.use(response => {
            this.destroy(url);
            const { code, message } = response.data;
            if (code === -1 || code === -403) {
                return Promise.reject({ code, message })
            }
            if (isDev) {
                console.group(url);
                console.log("response:", response);
                console.log("response.data:", response.data);
                console.groupEnd();
            }
            return response.data
        }, async error => {//请求失败
            this.destroy(url)
            const { response } = error;
            if (response) {
                const { status, config } = error.response
                switch (status) {
                    case 401:
                        href("/login");
                        break;
                    case 403:
                        console.error(`${config.url} 无权限访问！！`);
                        href("/401")
                        break;
                    case 404:
                        // href("/404")
                        break;
                    case 500:
                        //错误页面
                        if (!isDev) {
                            href("/500");
                        }
                        break;
                    case 502:
                        if (!isDev) {
                            console.error(`${config.url} 无权限访问！！`);
                        } else {
                            href("/500");
                        }
                        break
                    default:
                        console.error(status, config.url)
                }
                return Promise.reject(error.message)
            } else {
                if (!window.navigator.onLine) {
                    ElMessage.error('没有网络，请检测网络！')
                    console.log('没有网络了');
                } else {
                    return Promise.reject(error.message)
                }
            }
        })
    }
    /**
     * axios API 请求实例
     * @param {*} options 
     * @returns 
     */
    request(options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url)
        return instance(options)
    }
    /**
     * GET 请求
     * @param {String} url  api 请求地址
     * @param {Object} params 请求参数
     * @returns 
     */
    get(url, params = {}, _object = {}) {
        _object.method = 'get';
        console.log({ url, params, ..._object })
        return this.request({ url, params, ..._object })
    }
    /**
     * POST 提交
     * @param {String} url api 请求地址
     * @param {Object} data 请求参数
     * @returns 
     */
    post(url, data = {}) {
        return this.request({ url, method: 'post', data })
    }
    /**
     * PUT 提交
     * @param {String} url api 请求地址
     * @param {Object} data 请求参数
     * @returns 
     */
    put(url, data = {}) {
        return this.request({ url, method: 'put', data })
    }
    /**
     * DELETE 发放
     * @param {String} url api 请求地址
     * @param {Object} params 请求参数
     * @returns 
     */
    delete(url, params) {
        return this.request({ url, method: 'delete', params })
    }
}
export default Http