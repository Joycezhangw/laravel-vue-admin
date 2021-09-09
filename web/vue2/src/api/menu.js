import request from '@/library/http/request'
class Menu {
    static get apiUrl() {
        return {
            getList: '/v1/menu',
            doUpdate: '/v1/menu/update',
            doStore: '/v1/menu/store',
            doDelete: '/v1/menu/delete',
            getPower: '/v1/menu/power'
        }
    }
    /**
     * 获取菜单列表
     * @returns 
     */
    static getList() {
        return request.get(this.apiUrl.getList)
    }

    /**
     * 获取权限规则
     * @returns 
     */
    static getPower() {
        return request.get(this.apiUrl.getPower)
    }


    /**
     * 更新菜单信息
     * @param {string} menuId 菜单加密id
     * @param {object} data 参数
     * @returns 
     */
    static doUpdate(menuId, data) {
        return request({
            url: `${this.apiUrl.doUpdate}/${menuId}`,
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
        return request.post(this.apiUrl.doStore, data);
    }

    /**
     * 删除
     * @param {string} menuId 
     * @returns 
     */
    static doDelete(menuId) {
        return request({
            url: `${this.apiUrl.doDelete}/${menuId}`,
            method: 'delete',
        })
    }
}
export default Menu
