import request from '@/library/http/request'
class User {
    static get apiUrl() {
        return {
            getList: '/v1/user',
            getInfo: '/v1/user/read',
            doUpdate: '/v1/user/update',
            doStore: '/v1/user/store',
            doDelete: '/v1/user/delete'
        }
    }
    /**
     * 列表
     * @returns 
     */
    static getList(params) {
        return request({
            url: this.apiUrl.getList,
            method: 'get',
            params
        })
    }

    /**
     * 详情
     * @param {string} userId 用户id
     * @returns 
     */
    static getInfo(userId) {
        return request.get(`${this.apiUrl.getInfo}/${userId}`)
    }


    /**
     * 更新
     * @param {string} userId 后台用户id
     * @param {object} data 参数
     * @returns 
     */
    static doUpdate(userId, data) {
        return request({
            url: `${this.apiUrl.doUpdate}/${userId}`,
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
     * @param {stirng} userId 
     * @returns 
     */
    static doDelete(userId) {
        return request({
            url: `${this.apiUrl.doDelete}/${userId}`,
            method: 'delete',
        })
    }
}
export default User
