import profileApi from '@/api/profile';
import { isArray, deepTree } from '@/library/utils';
import { Message } from 'element-ui';
import storage from '@/library/utils/storage';
import Router from '@/router';
console.log(Router)
const state = {
    //路由 type=1
    routes: storage.get('viewRoutes') || [],
    permission: storage.get('permission') || [],
    menuGroup: storage.get('menuGroup') || []
}

const mutations = {
    //设置视图路由
    SET_VIEW_ROUTES(state, list) {
        Router.$plugin.addViews(list);
        state.routes = list;
        storage.set('viewRoutes', list)
    },
    //设置树形菜单列表
    SET_MENU_GROUP(state, list) {
        state.menuGroup = list;
        storage.set('menuGroup', list)
    },
    //设置权限
    SET_PERMIESSION(state, list) {
        state.permission = list;
        storage.set('permission', list)
    }
}

const actions = {
    premRules({ commit }) {
        return new Promise((resolve, reject) => {
            const next = res => {
                if (!isArray(res.menus)) {
                    res.menus = [];
                }
                if (!isArray(res.power)) {
                    res.power = [];
                }
                const menuGroup = deepTree(res.menus);
                //设置权限
                commit('SET_PERMIESSION', res.power);
                //设置菜单组
                commit('SET_MENU_GROUP', menuGroup);
                //设置路由
                commit('SET_VIEW_ROUTES', res.menus.filter(e => e.menuType == 1));
                resolve(menuGroup)
            }
            //获取菜单、权限
            profileApi.getPermRules().then(res => {
                next(res.data)
            }).catch(err => {
                Message.error('菜单加载异常');
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}