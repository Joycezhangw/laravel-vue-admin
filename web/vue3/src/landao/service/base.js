import http from "./request";
import QS from 'qs'

export default class BaseService {
    //定义静态request属性，子类可以直接调用
    static $request = request;

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
     * 获取全部数据
     * @param {Object} params 
     * @returns 
     */
    static list(params) {
        return http.request({
            url: this.apiUri.getList,
            method: "get",
            params,
            paramsSerializer: function (params) {
                return QS.stringify(params, { arrayFormat: "indices" });
            },
        });
    }

    /**
     * 获取分页列表
     * @param {Object} params 
     * @returns 
     */
    static page(params) {
        return http.request({
            url: this.apiUri.getPageList,
            method: "get",
            params,
            paramsSerializer: function (params) {
                return QS.stringify(params, { arrayFormat: "indices" });
            },
        })
    }

    /**
     * 添加数据
     * @param {Object} data 
     * @returns 
     */
    static doStore(data) {
        return http.post(this.apiUri.store, data)
    }

    /**
     * 根据id，更新一条数据
     * ID可以是加密后的标识
     * @param {Number | String} id 
     * @param {Object} data 
     * @returns 
     */
    static doUpdate(id, data) {
        return http.request({
            url: `${this.apiUri.update}/${id}`,
            method: 'put',
            data
        })
    }

    /**
     * 根据id，更新一条数据，一般用于列表快捷更新某个字段
     * ID可以是加密后的标识
     * @param {Number | String} id 
     * @param {Object} data 
     * @returns 
     */
    static doModifyFiled(id, data) {
        return http.request({
            url: `${this.apiUri.modifyFiled}/${id}`,
            method: 'put',
            da
        })
    }

    /**
     * 删除
     * @param {Number | String} id 
     * @returns 
     */
    static doDelete(id) {
        return http.request({
            url: `${this.apiUri.delete}/${id}`,
            method: 'delete'
        })
    }

    /**
     * 查看详情
     * @param {Number | String} id 
     * @returns 
     */
    static read(id) {
        return request.get(`${this.apiUri.info}/${id}`)
    }

}