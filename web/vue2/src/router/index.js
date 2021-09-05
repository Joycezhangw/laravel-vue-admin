import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const constantRoutes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/layout/index'),
        children: [
            {
                path: "/",
                name: "数据统计",
                component: () => import("@/view/index/index.vue")
            }
        ]
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import('@/view/login/index')
    }
];
const Router = new VueRouter({
    base: process.env.BASE_URL,
    mode: process.env.VUE_ROUTER_MODE,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: constantRoutes,
});

// 忽略规则
const ignore = {
    token: ["/login", "/403", "/404", "/500", "/502"]
};
export { constantRoutes, ignore }
export default Router
