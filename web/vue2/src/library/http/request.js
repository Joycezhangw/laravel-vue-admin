import axios from 'axios'
import store from '@/store'
import { href } from "@/library/utils";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const isDev = process.env.NODE_ENV == "development";
NProgress.configure({
    showSpinner: false
});
//忽略规则
const ignore = {
    NProgress: ['/v1/passport/captcha'],
    token: ['/v1/passport/captcha', '/v1/passport/login']
}
//创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: false,
    timeout: 30000//请求超时时间
});
//request拦截器
service.interceptors.request.use(
    config => {
        const token = store.getters.token || '';
        if (config.url) {
            //过滤无需进度条url
            if (!ignore.NProgress.some(val => config.url.includes(val))) {
                NProgress.start();
            }
            //需要加token请求
            if (!ignore.token.some(val => config.url.includes(val))) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        // 请求信息
        if (isDev) {
            console.group(config.url);
            console.log("method:", config.method);
            console.table("data:", config.method == "get" ? config.params : config.data);
            console.groupEnd();
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        NProgress.done();
        const { code, message } = response.data;
        if (code === -1 || code === -403) {
            return Promise.reject(message)
        }
        return response.data
    },
    async error => {
        NProgress.done();
        if (error.response) {
            const { status, config } = error.response
            switch (status) {
                case 401:
                    //删除用户信息，返回登录页面
                    await store.dispatch("user/removeLoginUser");
                    href("/login");
                    break;
                case 403:
                    console.error(`${config.url} 无权限访问！！`);
                    href("/403")
                    break;
                case 404:
                    href("/404")
                    break;
                case 500:
                    //错误页面
                    href("/500")
                    break;
                case 502:
                    href("/500")
                    break
                default:
                    console.error(status, config.url)
            }
        }
        return Promise.reject(error.message)
    }
)
export default service