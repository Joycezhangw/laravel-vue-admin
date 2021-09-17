import request from '@/library/http/request'
class Log {
    static get apiUrl() {
        return {
            getList: '/v1/log',
            doDelete: '/v1/log/delete',
        }
    }
    /**
     * 获取日志
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
     * 删除日志
     * @param {string} logId 
     * @returns 
     */
    static doDelete(logId) {
        return request({
            url: `${this.apiUrl.doDelete}/${logId}`,
            method: 'delete',
        })
    }
}
export default Log
