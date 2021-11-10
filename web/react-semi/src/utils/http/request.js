import axios from "axios";
import systemConfig from "../../config"
import { Toast } from '@douyinfe/semi-ui'
//是否开发环境
const isDev = process.env.NODE_ENV === "development";
/**
 * 创建axios实列
 */
const service = axios.create({
    baseURL: systemConfig.apiPrefix,
    withCredentials:false,
    timeout:30000
});
/**
 * 请求拦截器
 */
service.interceptors.request.use(
    config=>{
        if(isDev){
            console.group(config.url);
            console.log("method:", config.method);
            console.table("data:", config.method === "get" ? config.params : config.data);
            console.groupEnd();
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
/**
 * 响应拦截
 */
service.interceptors.response.use(
    response => {
        console.log('response====>>>',response)
        const { code, message } = response.data;
        if (code === -1 || code === -403) {
            return Promise.reject(message)
        }
        return response.data
    },
    async error => {
        console.log('response.error====>>>',error.response)
        if (error.response) {
            const { status, config,data } = error.response
            Toast.error(data.message)
            switch (status) {
                case 401:
                    //删除用户信息，返回登录页面
                    // await store.dispatch("user/removeLoginUser");
                    // href("/login");
                    break;
                case 403:
                    console.error(`${config.url} 无权限访问！！`);
                    // href("/403")
                    break;
                case 404:
                    // href("/404")
                    break;
                case 500:
                    //错误页面
                    if (!isDev) {
						// href("/500");
					}
                    break;
                case 502:
                    if (!isDev) {
						// href("/500");
					}
                    break
                default:
                    console.error(status, config.url)
            }
        }
        return Promise.reject(error.message)
    }
)
export default service