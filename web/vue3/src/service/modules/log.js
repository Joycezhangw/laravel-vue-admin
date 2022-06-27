import request from '@/landao/service/request'
/**
 * 登录用户操作
 */
export default class LogService {
    /**
     * 获取日志
     * @returns 
     */
     static getList(params) {
        return request({
            url: '/v1/log',
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
            url: `/v1/log/delete/${logId}`,
            method: 'delete',
        })
    }
}