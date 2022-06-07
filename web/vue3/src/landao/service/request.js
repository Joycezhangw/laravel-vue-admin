import axios from 'axios'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isDev, ignore, baseURL } from "@/landao/config";
import { ElMessage } from "element-plus"
import { href } from "@/landao/utils"


NProgress.configure({
    showSpinner: false
});

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;

NProgress.configure({
    showSpinner: false
});


// @ts-ignore
axios.interceptors.request.eject(axios._req);

//request拦截器
axios._req = axios.interceptors.request.use(
    config => {
        if (config.url) {
            //过滤无需进度条url
            if (!ignore.NProgress.some(val => config.url.includes(val))) {
                NProgress.start();
            }
            //需要加token请求
            if (!ignore.apiToken.some(val => config.url.includes(val))) {
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

axios.interceptors.response.use(
    response => {
        NProgress.done();
        const { code, data, message } = response.data;
        if (code === -1 || code === -403) {
            return Promise.reject({ code, message })
        }
        return data
    },
    async error => {//请求失败
        NProgress.done();
        const { response } = error;
        if (response) {
            const { status, config } = error.response
            switch (status) {
                case 401:
                    href("/login");
                    break;
                case 403:
                    console.error(`${config.url} 无权限访问！！`);
                    href("/403")
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
    }
)
export default axios;