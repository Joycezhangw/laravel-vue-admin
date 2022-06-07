import BaseService from "@/landao/service/base";
/**
 * 角色相关
 */
export default class RoleService extends BaseService {

    static get apiUri() {
        return {
            getList: '/v1/role/list',//获取角色全部列表
            getPageList: '/v1/role',//获取角色分页列表
            store: '/v1/role/store',//添加角色
            update: '/v1/role/update',//更新角色
            delete: '/v1/role/delete',//删除角色
            info: '/v1/role/read',//查看角色详情
            modifyFiled: ''
        }
    }
}