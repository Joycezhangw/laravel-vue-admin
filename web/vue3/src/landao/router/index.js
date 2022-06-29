
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
        name: "Layout",
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: "/",
                name: "Index",
                component: () => import("@/views/home/index.vue")
            },
            {
                path: "/my/info",
                name:'Personal',
                component: () => import("@/views/my/info"),
                meta: {
                    title: "个人中心",
                }
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
        path: '/error',
        name: "error",
        component: () => import('@/layout/emptyLayout.vue'),
        children: [
            {
                path: "/404",
                name: "Error404",
                component: () => import("@/views/error/404.vue"),
                meta: {
                    title: 'message.staticRoutes.notFound',
                },
            }, {
                path: "/401",
                name: "Error401",
                component: () => import("@/views/error/401.vue"),
                meta: {
                    title: 'message.staticRoutes.noPower',
                }
            }
        ]
    },
    {
        path: '/:path(.*)*',
        name: 'notFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
            title: 'message.staticRoutes.notFound',
        },
    },
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