import request from '@/library/http/request'
class Role {
    static get apiUrl() {
        return {
            getList: '/v1/role',
            getInfo: '/v1/role/read',
            doUpdate: '/v1/role/update',
            doStore: '/v1/role/store',
            doDelete: '/v1/role/delete',
        }
    }
    /**
     * 获取角色列表
     * @returns 
     */
    static getList(params) {
        console.log('role.getList', params)
        return request({
            url: this.apiUrl.getList,
            method: 'get',
            params
        })
    }

    /**
     * 获取详情
     * @param {string} roleId 
     * @returns 
     */
    static getInfo(roleId) {
        return request.get(`${this.apiUrl.getInfo}/${roleId}`)
    }


    /**
     * 更新角色信息
     * @param {string} menuId 角色加密id
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
     * 新增角色
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
export default Role
