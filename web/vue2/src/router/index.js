import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/layout"
import EmptyLayout from "@/layout/EmptyLayout";
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const constantRoutes = [
    {
        path: '/',
        name: 'Index',
        component: Layout,
        children: [
            {
                path: "/init",
                name: "Init",
                meta: {
                    title: '首页'
                },
                component: () => import("@/view/index/index.vue")
            },
            // {
            //     path:"/sys/menu",
            //     name:'menuManage',
            //     meta:{
            //         title:'权限菜单',
            //     },
            //     component:()=>import('@/view/system/menu/index.vue')
            // }
        ]
    },
    {
        path: "/login",
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: () => import('@/view/login/index')
    }, {
        path: "/error",
        component: EmptyLayout,
        redirect: "noRedirect",
        name: "Error",
        hidden: true,
        meta: { title: "错误页", icon: "warning" },
        children: [{
            path: "/403",
            name: "Error403",
            component: () => import("@/view/error/403"),
            meta: { title: "403" }
        },
        {
            path: "/404",
            name: "Error404",
            component: () => import("@/view/error/404"),
            meta: { title: "404" }
        },
        {
            path: "/500",
            name: "Error500",
            component: () => import("@/view/error/500"),
            meta: { title: "500" }
        }]
    }
];
export const asyncRoutes = [{
    path: '/layout',
    name: 'layout',
    component: Layout,
    meta: {
        title: '底层layout'
    },
    children: []
}, {
    path: '*',
    redirect: '/404',
    hidden: true,
}];
const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: "history",
    scrollBehavior: () => ({
        y: 0,
    }),
    routes: constantRoutes,
});

export default router
