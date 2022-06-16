
import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import { app, ignore } from "@/landao/config";
import { createRouterGuards } from './router-guards'

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

export async function setupRouter(app) {
    //创建路由守卫
    createRouterGuards(router, ignore.whiteName);
    app.use(router);
    //路由挂载就绪后挂载APP实例
    await router.isReady();
}

export { router }