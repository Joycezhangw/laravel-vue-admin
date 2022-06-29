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
        return request.get('/v1/log', params)
    }

    /**
     * 删除日志
     * @param {string} logId 
     * @returns 
     */
    static doDelete(logId) {
        return request.delete(`/v1/log/delete/${logId}`)
    }
}