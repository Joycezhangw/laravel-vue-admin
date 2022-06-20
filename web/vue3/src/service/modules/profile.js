import request from '@/landao/service/request'
/**
 * 登录用户操作
 */
export default class ProfileService {
    /**
    * 获取个人信息
    * @returns 
    */
    static getUserInfo() {
        return request.get('/v1/profile')
    }

     /**
     * 获取用户权限菜单和按钮
     * @returns 
     */
      static getPermRules() {
        return request.get('/v1/profile/rules')
    }

    /**
     * 更新个人信息
     * @returns 
     */
    static doUpdate() {
        return request({
            url: '/v1/profile/update',
            method: 'put'
        })
    }
}