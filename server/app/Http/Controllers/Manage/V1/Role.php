<?php
declare (strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IRole;
use App\Support\HashIdsSup;
use App\Validators\Manage\RoleValidator;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\FiltersHelper;
use JoyceZ\LaravelLib\Helpers\ResultHelper;

/**
 * 角色
 * Class Role
 * @package App\Http\Controllers\Manage\V1
 */
class Role extends Controller
{
    /**
     * 角色列表
     * @param Request $request
     * @param IRole $roleRepo
     * @return array
     */
    public function index(Request $request, IRole $roleRepo)
    {
        $params = $request->all();
        $ret = $roleRepo->getList($params, $params['order'] ?? 'created_at', $params['sort'] ?? 'desc');
        $list = $roleRepo->parseDataRows($ret['data']);
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, [
            'pagination' => [
                'total' => $ret['total'],
                'page_size' => $ret['per_page'],
                'current_page' => $ret['current_page'],
            ],
            'list' => $list
        ]);
    }

    /**
     * 获取全部角色
     * @param IRole $roleRepo
     * @return array
     */
    public function lists(IRole $roleRepo)
    {
        $lists = $roleRepo->all([], ['role_id', 'role_name']);
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS,$roleRepo->parseDataRows($lists->toArray()));
    }

    /**
     * 获取详情
     * @param int $id
     * @param IRole $roleRepo
     * @return array
     */
    public function read(int $id, IRole $roleRepo)
    {
        $role = $roleRepo->getByPkId($id);
        if (!$role) {
            return ResultHelper::returnFormat('角色不存在', ResponseCode::ERROR);
        }
        $menuIds = [];
        foreach ($role->menus as $item) {
            $menuIds[] = $item['menu_id'];
        }
        $roleData = $role->toArray();
        $roleData['menus'] = $menuIds ? (new HashIdsSup())->encodeArray($menuIds) : [];
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $roleRepo->parseDataRow($roleData));
    }

    /**
     * 新建角色
     * @param Request $request
     * @param RoleValidator $validator
     * @param IRole $roleRepo
     * @return array
     */
    public function store(Request $request, RoleValidator $validator, IRole $roleRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $data = [
            'role_name' => FiltersHelper::filterXSS(trim($params['role_name'])),
            'role_desc' => FiltersHelper::filterXSS(trim($params['role_desc'])),
        ];
        $role = $roleRepo->doCreate($data);
        if ($role) {
            if ($params['menus']) {
                //对数据进行解密
                $ids = (new HashIdsSup())->decodeArray($params['menus']);
                $role->menus()->sync(array_filter(array_unique($ids)));
            }
            return ResultHelper::returnFormat('新建成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 更新角色
     * @param int $roleId
     * @param Request $request
     * @param RoleValidator $validator
     * @param IRole $roleRepo
     * @return array
     */
    public function update(int $roleId, Request $request, RoleValidator $validator, IRole $roleRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $role = $roleRepo->getByPkId($roleId);
        if (!$role) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $role->role_name = FiltersHelper::filterXSS(trim($params['role_name']));
        $role->role_desc = FiltersHelper::filterXSS(trim($params['role_desc']));
        if ($role->save()) {
            if ($params['menus']) {
                //对数据进行解密
                $ids = (new HashIdsSup())->decodeArray($params['menus']);
                $role->menus()->sync(array_filter(array_unique($ids)));
            }
            return ResultHelper::returnFormat('修改成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 删除
     * @param int $roleId
     * @param IRole $roleRepo
     * @return array
     */
    public function destroy(int $roleId, IRole $roleRepo)
    {
        $role = $roleRepo->getByPkId($roleId);
        if (!$role) {
            return ResultHelper::returnFormat('角色不存在');
        }
        if ($role->delete()) {
            $role->menus()->detach($roleId);
            return ResultHelper::returnFormat('删除成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

}
