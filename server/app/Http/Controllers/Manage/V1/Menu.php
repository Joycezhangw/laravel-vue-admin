<?php
declare (strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IMenu;
use App\Validators\Manage\MenuValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use JoyceZ\LaravelLib\Helpers\ResultHelper;

/**
 * 菜单
 *
 * @author joyecZhang <zhangwei762@163.com>
 * Class Menu
 * @package App\Http\Controllers\Manage\V1
 */
class Menu extends Controller
{
    public function index(Request $request, IMenu $menuRepo)
    {
        $menuList = $menuRepo->getAllList($request->all());
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $menuRepo->parseDataRows($menuList));
    }

    /**
     * 获取可操作权限
     * @return array
     */
    public function power()
    {
        $routes = app()->routes->getRoutes();
        $arrRoute = [];
        foreach ($routes as $route) {
            if (isset($route->action['as'])) {
                if (Str::is('manage.*', $route->action['as'])) {
                    $arrRoute[] = $route->action['as'];
                }
            }
        }
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $arrRoute);
    }

    /**
     * 获取详情
     * @param int $id
     * @param IMenu $menuRepo
     * @return array
     */
    public function read(int $id, IMenu $menuRepo)
    {
        $menu = $menuRepo->getByPkId($id);
        if (!$menu) {
            return ResultHelper::returnFormat('菜单不存在', ResponseCode::ERROR);
        }
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $menuRepo->parseDataRow($menu->toArray()));
    }


    /**
     * 新增菜单
     * @param Request $request
     * @param MenuValidator $validator
     * @param IMenu $menuRepo
     * @return array
     */
    public function store(Request $request, MenuValidator $validator, IMenu $menuRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $params['parent_id'] = trim((string)$params['parent_id']) == '' ? 0 : $params['parent_id'];
        if ($menuRepo->doCreate($params)) {
            return ResultHelper::returnFormat('新增成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 修改菜单
     * @param int $menuId 菜单id
     * @param Request $request
     * @param MenuValidator $validator
     * @param IMenu $menuRepo
     * @return array
     */
    public function update(int $menuId, Request $request, MenuValidator $validator, IMenu $menuRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        if ($menuRepo->doUpdateByPkId($params, $menuId)) {
            return ResultHelper::returnFormat('修改成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 删除
     * @param int $menuId
     * @param IMenu $menuRepo
     * @return array
     */
    public function destroy(int $menuId, IMenu $menuRepo)
    {
        $menu = $menuRepo->getByPkId($menuId);
        if (!$menu) {
            return ResultHelper::returnFormat('菜单不存在');
        }
        if ($menu->delete()) {
            $menu->roles()->detach($menuId);
            return ResultHelper::returnFormat('删除成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }
}
