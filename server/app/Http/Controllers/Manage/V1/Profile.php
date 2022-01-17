<?php

declare (strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IManage;
use App\Services\Repositories\Manage\Interfaces\IMenu;
use App\Validators\Manage\ManageValidator;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\FiltersHelper;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use JoyceZ\LaravelLib\Validation\Validator as CustomValidator;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * 个人信息
 * Class Profile
 * @package App\Http\Controllers\Manage\V1
 */
class Profile extends Controller
{
    /**
     * 获取个人信息
     * @param IManage $manageRepo
     * @return array
     */
    public function index(IManage $manageRepo)
    {
        $user = JWTAuth::parseToken()->touser();
        $user->roles;
        $user->department;
        $manage = $manageRepo->parseDataRow($user->toArray());
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, ['userInfo' => $manage]);
    }

    /**
     * 更新个人信息
     * @param Request $request
     * @param ManageValidator $validator 表单验证规则
     * @return array
     */
    public function update(Request $request, ManageValidator $validator)
    {
        $params = $request->only(['nickname', 'realname', 'phone', 'introduce']);
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $user = JWTAuth::parseToken()->touser();
        $user->nickname = FiltersHelper::filterXSS(trim($params['nickname']));
        $user->realname = FiltersHelper::filterXSS(trim($params['realname']));
        $user->phone = trim($params['phone']);
        $user->introduce = FiltersHelper::filterXSS(trim((string)$params['introduce']));
        if ($user->save()) {
            return ResultHelper::returnFormat('更新个人信息成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('更新个人信息失败，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 获取用户权限菜单和权限按钮
     * @param IMenu $menuRepo
     * @return array
     */
    public function rules(IMenu $menuRepo)
    {
        $user = JWTAuth::parseToken()->touser();
        $roleIds = [];
        foreach ($user->roles as $item) {
            $roleIds[] = $item['role_id'];
        }
        $ret = $menuRepo->generatePermission($roleIds, (boolean)$user->is_super);
        $menus = $menuRepo->parseDataRows($ret['menus']);
        $power = $ret['power'];
        $menuGroup=$ret['menuGroup'];
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, compact('menus', 'power','menuGroup'));
    }

}
