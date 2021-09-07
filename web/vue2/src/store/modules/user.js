import passportApi from '@/api/passport';
import profileApi from '@/api/profile';
import storage from '@/library/utils/storage'

const state = {
    userInfo: storage.get('userInfo') || {},
    token: storage.get('token') || null,
}

const mutations = {
    //设置授权标识
    SET_TOKEN: (state, { access_token, expires_in }) => {
        state.token = access_token;
        storage.set('token', access_token, expires_in);
    },
    //设置用户信息
    SET_USERINFO(state, value) {
        state.userInfo = value;
        storage.set('userInfo', value)
    },
    //移除授权标识
    REMOVE_TOKEN(state) {
        state.token = null;
        storage.remove('token')
    },
    //移除用户信息
    REMOVE_USERINFO(state) {
        state.userInfo = {};
        storage.remove('userInfo')
    }
}
const actions = {
    //获取用户信息
    async GetUserInfo({ commit }) {
        const res = await profileApi.getUserInfo();
        if (res.code === 200) {
            commit('SET_USERINFO', res.data.userInfo)
        }
        return res;
    },
    //用户登录
    async LoginIn({ commit }, loginForm) {
        return await passportApi.login(loginForm).then(res => {
            if (res.code === 200) {
                commit('SET_TOKEN', res.data)
            }
        })
    },
    //退出登录
    LoginOut({ dispatch }) {
        return new Promise(resolve => {
            passportApi.logout().finally(() => {
                dispatch("removeLoginUser").then(() => {
                    resolve();
                });
            })
        });
    },
    //移除用户信息和菜单权限
    removeLoginUser({ commit }) {
        commit('REMOVE_TOKEN')
        commit('REMOVE_USERINFO')
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}