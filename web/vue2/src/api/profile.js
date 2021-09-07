import request from '@/library/http/request'
class Profile {
    static get apiUrl() {
        return {
            getUserInfo: '/v1/profile',
            doUpdate: '/v1/profile/update',
            getPermRules: '/v1/profile/rules',
        }
    }
    /**
     * 获取个人信息
     * @returns 
     */
    static getUserInfo() {
        return request.get(this.apiUrl.getUserInfo)
    }

    /**
     * 获取用户权限菜单和按钮
     * @returns 
     */
    static getPermRules() {
        return request.get(this.apiUrl.getPermRules)
    }

    /**
     * 更新个人信息
     * @returns 
     */
    static doUpdate() {
        return request({
            url: this.apiUrl.doUpdate,
            method: 'put'
        })
    }
}
export default Profile
