import "nprogress/nprogress.css";
import NProgress from "nprogress";

import { useBaseStore } from "@/store";
import { storage } from "@/landao/utils";
import { ElMessage } from "element-plus";

NProgress.configure({
    showSpinner: false
});

export function createRouterGuards(router, whiteNameList) {
    //默认路径
    const defaultRoutePath = '/';
    //路由守卫
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const { user } = useBaseStore();
        if (user.token) {
            if (to.name === 'Login') {
                next({ path: defaultRoutePath });
                NProgress.done();
            } else {
                //判断vuex中是否有对应的用户数据，如果没有，重新获取用户详情接口
                if (user.userInfo.manage_id) {
                    //token 是否过期，过期清除用户数据刷新页面
                    if (!storage.hasExpired('token')) {
                        next();
                    } else {
                        user.clear();
                        next({ name: 'Login', query: { redirect: to.fullPath }, replace: true });
                    }
                } else {
                    next({ ...to, replace: true })
                }
            }
        } else {
            if (whiteNameList.some((val) => val === to.name)) {
                //免登录名单，直接进入
                next();
                NProgress.done();
            } else {
                next({ name: 'Login', query: { redirect: to.fullPath }, replace: true });
                NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
            }
        }
    });
    //获取路由对应的组件名称
    const getComponentName = (route) => {
        return route.matched.find((item) => item.name === route.name)?.components?.default.name;
    }

    //路由加载后
    router.afterEach(() => {
        NProgress.done();
    })

    //路由错误锁
    let routerLock = false;
    //路由错误监听
    router.onError(err => {
        if (!routerLock) {
            routerLock = true;
            ElMessage.error("页面不存在或者未配置！");
            console.error('路由错误', err);
            setTimeout(() => {
                routerLock = false;
            }, 0);
        }
    })

}