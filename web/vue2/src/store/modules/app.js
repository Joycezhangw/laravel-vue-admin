
import { getBrowser } from '@/library/utils';
// import storage from '@/library/utils/storage';

const browser = getBrowser();

const state = {
    appInfo: {
        name: process.env.VUE_APP_NAME
    },
    browser,
    collapse: browser.isMini ? true : false
}

const mutations = {
    // 设置浏览器信息
    SET_BROWSER(state) {
        state.browser = getBrowser();
    },

    // 收起左侧菜单
    COLLAPSE_MENU(state, val = false) {
        state.collapse = val;
    },
}

const actions = {
    appLoad({ dispatch }, getters) {
        //重新加载路由权限，否则刷新页面异步路由挂载失败
        if (getters.token) {
            // 第三个参数必须申明，表示不是当前模块
            dispatch('router/premRules', {}, { root: true });
            dispatch('user/GetUserInfo', {}, { root: true })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}