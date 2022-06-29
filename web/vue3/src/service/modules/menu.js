import request from '@/landao/service/request'
/**
 * 登录用户操作
 */
export default class MenuService {
    /**
      * 获取菜单列表
      * @returns 
      */
    static getList() {
        return request.get('/v1/menu')
    }

    /**
     * 详情
     * @param {string} menuId 菜单id
     * @returns 
     */
    static getInfo(menuId) {
        return request.get(`/v1/role/read/${menuId}`)
    }

    /**
     * 获取权限规则
     * @returns 
     */
    static getPower() {
        return request.get('/v1/menu/power')
    }


    /**
     * 更新菜单信息
     * @param {string} menuId 菜单加密id
     * @param {object} data 参数
     * @returns 
     */
    static doUpdate(menuId, data) {
        return request({
            url: `/v1/menu/update/${menuId}`,
            method: 'put',
            data
        })
    }

    /**
     * 新增菜单
     * @param {object} data 参数 
     * @returns 
     */
    static doStore(data) {
        return request.post('/v1/menu/store', data);
    }

    /**
     * 删除
     * @param {string} menuId 
     * @returns 
     */
    static doDelete(menuId) {
        return request({
            url: `/v1/menu/delete/${menuId}`,
            method: 'delete',
        })
    }
}