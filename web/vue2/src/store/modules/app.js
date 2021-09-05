
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}