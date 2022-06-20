import { defineStore } from "pinia";
import { storage, href } from "@/landao/utils";
import { ProfileService, PassportService } from "@/service"
import { ref } from "vue";

export const useUserStore = defineStore("user", function () {

    //用户登录标识
    const token = ref(storage.get('token') || '');;

    //设置用户授权标识
    const setToken = (userToken) => {
        token.value = userToken.access_token;
        storage.set('token', userToken.access_token, userToken.expires_in)
    }
    //用户信息
    const userInfo = ref(storage.get('userInfo') || null);

    //设置用户信息
    const setUserInfo = (value) => {
        userInfo.value = value;
        storage.set('userInfo', value)
    }



    //清除用户信息
    const clear = () => {
        storage.remove('token');
        storage.remove('userInfo');
        token.value = '';
        userInfo.value = null;
    }

    //退出
    async function logout() {
        await PassportService.logout();
        clear();
        href("/login")
    }

    //获取用户信息
    async function getUserInfo() {
        return ProfileService.getUserInfo().then(res => {
            setUserInfo(res.data.userInfo);
            return res;
        })
    }



    return {
        token,
        setToken,
        userInfo,
        setUserInfo,
        clear,
        logout,
        getUserInfo
    }
})