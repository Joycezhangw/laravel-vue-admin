import request from '@/library/http/request'
class Dept {
    static get apiUrl() {
        return {
            getList: '/v1/dept',
            getInfo: '/v1/dept/read',
            doUpdate: '/v1/dept/update',
            doStore: '/v1/dept/store',
            doDelete: '/v1/dept/delete'
        }
    }
    /**
     * 部门列表
     * @returns 
     */
    static getList() {
        return request.get(this.apiUrl.getList)
    }

    /**
     * 详情
     * @param {string} deptId 部门id
     * @returns 
     */
    static getInfo(deptId) {
        return request.get(`${this.apiUrl.getInfo}/${deptId}`)
    }


    /**
     * 更新
     * @param {string} deptId 部门加密id
     * @param {object} data 参数
     * @returns 
     */
    static doUpdate(deptId, data) {
        return request({
            url: `${this.apiUrl.doUpdate}/${deptId}`,
            method: 'put',
            data
        })
    }

    /**
     * 新增
     * @param {object} data 参数 
     * @returns 
     */
    static doStore(data) {
        return request.post(this.apiUrl.doStore, data);
    }

    /**
     * 删除
     * @param {stirng} deptId 
     * @returns 
     */
    static doDelete(deptId) {
        return request({
            url: `${this.apiUrl.doDelete}/${deptId}`,
            method: 'delete',
        })
    }
}
export default Dept
