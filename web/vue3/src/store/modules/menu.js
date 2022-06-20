import { defineStore } from "pinia";
import { storage } from "@/landao/utils";
import { addViews } from "@/landao/router/util"
import { ProfileService } from "@/service"
import { ref } from "vue";

export const useMenuStore = defineStore("menu", function () {
    const menuData = storage.getAll();
    //视图路由
    const routes = ref(menuData['menu.routes'] || []);
    //菜单组
    const menuGroup = ref(menuData['menu.group'] || []);
    //按钮权限标识
    const permission = ref(menuData['menu.permission'] || []);

    //设置按钮权限标识
    const setPermission = (permList) => {
        permission.value = permList;
        storage.set("menu.permission", permList)
    }

    //设置视图路由
    const setRoutes = (routeList) => {
        addViews(routeList);
        routes.value = routeList;
        storage.set('menu.routes', routeList);
    }

    //设置菜单组
    const setMenuGroup = (menuList) => {
        menuGroup.value = menuList;
        storage.set('menu.group', menuList);
    }

    //获取后台权限菜单
    function getPremRules() {
        return new Promise((resolve, reject) => {
            ProfileService.getPermRules().then(res => {
                const { data } = res;
                let asyncRouter = data.menus.filter(e => e.menuType == 1);
                //解决异步路由不存在跳转到404页面
                // asyncRouter.push({ path: "*", redirect: "/404", hidden: true })
                //按钮权限标识
                setPermission(data.power);
                //菜单组、面包屑
                setMenuGroup(data.menuGroup);
                //页面路由
                setRoutes(asyncRouter);
                resolve(asyncRouter);
            }).catch(err => {
                reject(err)
            })
        })
    }

    return {
        routes,
        menuGroup,
        permission,
        setMenuGroup,
        setPermission,
        setRoutes,
        getPremRules
    }
})