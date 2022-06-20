import request from '@/landao/service/request'
/**
 * 用户操作
 */
export default class UserService {
    /**
    * 定义请求地址
    */
    static get apiUri() {
        return {
            getList: '',
            getPageList: '',
            store: '',
            update: '',
            delete: '',
            info: '',
            modifyFiled: ''
        }
    }

    /**
     * 获取分页
     * @param {Object} params 
     * @returns 
     */
    static page(params) {
        return request({
            url: '/v1/user',
            method: "get",
            params,
            paramsSerializer: function (params) {
                return QS.stringify(params, { arrayFormat: "indices" });
            },
        })
    }

    /**
     * 获取用户信息
     * @param {Number|String} id 用户id
     * @returns 
     */
    static getInfo(id) {
        return request.get(`/v1/user/read/${id}`)
    }

    /**
    * 更新
    * @param {string} id 后台用户id
    * @param {object} data 参数
    * @returns 
    */
    static doUpdate(id, data) {
        return request({
            url: `/v1/user/update/${id}`,
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
        return request.post('/v1/user/store', data);
    }

    /**
   * 删除
   * @param {Number | stirng} id 
   * @returns 
   */
    static doDelete(id) {
        return request({
            url: `/v1/user/delete/${id}`,
            method: 'delete',
        })
    }
}