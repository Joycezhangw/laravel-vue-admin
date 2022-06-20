

//开发模式
const isDev = import.meta.env.MODE === "development";

//host
const host = import.meta.env.VITE_APP_HOST;

//请求地址
const baseURL = import.meta.env.VITE_APP_BASE_API

//忽略规则
const ignore = {
    //不显示进度条请求
    NProgress: ['/v1/passport/captcha'],
    //api不需要携带token请求
    apiToken: ['/v1/passport/captcha', '/v1/passport/login'],
    //不需要token的页面
    whiteName: ['Login']
}
const app = {
    name: import.meta.env.VITE_APP_TITLE || "LARAVEL_VUE_ADMIN",
    router: {
        //模式
        mode: "history",
        //页面
        pages: [],
        //试图 / 路由下的children
        views: []
    }
}

export { isDev, host, baseURL, ignore, app }