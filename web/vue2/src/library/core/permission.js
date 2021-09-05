import VueRouter from "vue-router";
import { Message } from "element-ui";
import store from "@/store";
import router, { ignore } from "@/router";
import storage from "@/library/utils/storage";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
console.log(router)
export default function () {
    router.$plugin = {
        addView: (list, option) => {
            if (!option) {
                option = {};
            }
            list.map(item => {
                let url = item.component;
                if (url) {
                    //外链
                    if (/^(http[s]?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
                        url
                    )) {
                        item.meta.iframeUrl = url
                    } else {
                        item.component = () => import(`@/${item.component}`)
                    }
                } else {
                    item.redirect = "/404"
                }
            });
            list.forEach(item => {
                router.addRoute('Index', item)
            });
        },
        to: url => {
            if (router.path != url) {
                router.push(url)
            }
        }
    };
    router.beforeEach((to, from, next) => {
        const { token, browser } = store.getters;
        if (token) {
            console.log("to.path.indexOf('/login')",to.path.indexOf('/login'))
            //登录成功且 token 未过期，回到首页
            if (to.path.indexOf('/login') === 0) {
                if (storage.hasExpired('token')) {
                    return next('/')
                }else{
                    //过期token，清除掉用户信息
                    store.dispatch("user/removeLoginUser");
                    return next('/login')
                }
            }
        } else {
            if (!ignore.token.some(item => to.path.indexOf(item) === 0)) {
                return next('/login')
            }
        }
        // H5 下关闭左侧菜单
        if (browser.isMobile) {
            store.commit("app/COLLAPSE_MENU", true);
        }
        next()
    });
    let lock = false;
    router.onError(err => {
        if (!lock) {
            lock = true;
            if (err.code == 'MODULE_NOT_FOUND') {
                console.error(err.message.replace('Cannot find module', ''), '路由组件不存在');
                Message.error(`路由组件路径错误`)
            } else {
                console.error(err)
            }
            setTimeout(() => {
                lock = false
            }, 0)
        }
    })
}