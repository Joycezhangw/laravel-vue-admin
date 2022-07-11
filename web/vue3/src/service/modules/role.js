import request from '@/landao/service/request'
/**
 * 角色相关
 */
export default class RoleService {
    /**
     * 获取角色列表
     * @returns 
     */
    static list() {
        return request.get('/v1/role/list')
    }

    /**
     * 获取角色分页列表
     * @returns 
     */
    static page(params) {
        return request.get('/v1/role', params)
    }
    /**
     * 获取详情
     * @param {Number | String} roleId 角色ID
     * @returns 
     */
    static read(roleId) {
        return request.get(`/v1/role/read/${roleId}`)
    }

    /**
     * 更新菜单信息
     * @param {Number | String} roleId 角色id
     * @param {Object} data 参数
     * @returns 
     */
    static doUpdate(roleId, data) {
        return request.put(`/v1/role/update/${roleId}`, data)
    }

    /**
     * 创建角色
     * @param {Object} data 参数
     * @returns 
     */
    static doStore(data) {
        return request.post('/v1/role/store', data);
    }

    /**
     * 删除角色
     * @param {String | Number} roleId 
     * @returns 
     */
    static doDelete(roleId) {
        return request.delete(`/v1/role/delete/${roleId}`)
    }

}