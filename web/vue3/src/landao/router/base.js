import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import { app, ignore } from "@/landao/config";

import { useBaseStore } from "@/store";
import { storage } from "@/landao/utils";
import { ElMessage } from "element-plus";

const { mode } = app.router;



const constantRoutes = [
    {
        path: '/',
        name: "index",
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/",
                name: "数据统计",
                component: () => import("@/views/home/index.vue")
            }
        ]
    },
    {
        path: "/login",
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: () => import('@/views/login/index')
    },
    {
        path: "/:catchAll(.*)",
        name: "404",
        redirect: "/404"
    }
];
//创建
const router = createRouter({
    history: mode == 'history' ? createWebHistory() : createWebHashHistory(),
    routes: constantRoutes
})
//路由守卫
router.beforeEach((to, from, next) => {
    const { user } = useBaseStore();
    if (user.token) {
        if (to.path.includes("/login")) {
            //登录成功且token未过期，回到首页
            if (!storage.hasExpired("token")) {
                console.log('token未过期');
                return next("/")
            } else {
                //token过期，清空数据
                console.log('token过期，清空数据')
                user.clear();
                return next('/login')
            }
        }
    } else {
        if (!ignore.pageToken.find((value) => to.path == value)) {
            console.log('是否需要token');
            return next('/login')
        }
    }
    next();
});
//路由错误锁
let routerLock = false;
//路由错误监听
router.onError(error=>{
    if(!routerLock){
        routerLock=true;
        ElMessage.error("页面不存在或者未配置！");
        console.error(error);
        setTimeout(()=>{
            routerLock=false;
        },0);
    }
})

export { router }