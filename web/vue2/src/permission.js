import router from './router'
import store from './store'
import getPageTitle from "@/library/utils/page";
import storage from "@/library/utils/storage";

const whiteList = ["/login", "/403", "/404", "/500", "/502"];
export const loadView = (view) => {
    return (resolve) => require([`@/${view}`], resolve)
}
router.$plugin = {
    addViews: (routeList, options) => {
        if (!options) {
            options = {};
        }
        routeList.map(item => {
            let url = item.component;
            if (url) {
                //外链
                if (/^(http[s]?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
                    url
                )) {
                    item.meta.iframeUrl = url
                } else {
                    item.component = loadView(item.component)
                }
            } else {
                item.redirect = "/404"
            }
        });

        routeList.forEach(item => {
            router.addRoute('Layout', item)
        });
    },
    to: url => {
        if (router.path != url) {
            router.push(url)
        }
    }
}
router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title);
    const { token } = store.getters;
    if (token) {
        if (to.path === '/login') {
            next({ path: '/init' })
        } else {
            //判断vuex中是否有对应的用户数据，如果没有，重新获取用户详情接口
            if (store.getters.userInfo.manage_id) {
                //token 是否过期，过期清除用户数据刷新页面
                if (storage.hasExpired('token')) {
                    next()
                } else {
                    store.dispatch("user/removeLoginUser");
                    location.reload();
                }
            } else {
                next({ ...to, replace: true })
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})
let lock = false;
router.onError(err => {
    if (!lock) {
        lock = true;
        if (err.code == 'MODULE_NOT_FOUND') {
            console.error(err.message.replace('Cannot find module', ''), '路由组件不存在');
            // Message.error(`路由组件路径错误`)
        } else {
            console.error(err)
        }
        setTimeout(() => {
            lock = false
        }, 0)
    }
})