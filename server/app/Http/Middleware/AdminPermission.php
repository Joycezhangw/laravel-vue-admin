<?php


namespace App\Http\Middleware;

use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IMenu;
use Closure;
use Illuminate\Support\Facades\Route;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * 后端权限验证
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class AdminPermission
 * @package App\Http\Middleware
 */
class AdminPermission
{

    public function handle($request, Closure $next)
    {
        $user = JWTAuth::parseToken()->touser();
        //不是超级管理员，需进行权限验证
        if (intval($user->is_super) <= 0) {
            $roleIds = [];
            foreach ($user->roles as $item) {
                $roleIds[] = $item['role_id'];
            }
            $menuRepo = app(IMenu::class);
            $ret = $menuRepo->generatePermission($roleIds, (boolean)$user->is_super);
            $power = $ret['power'];
            $routeAsName = Route::currentRouteName();
            //判断当前路由别名是否存在访问权限中
            if (!in_array($routeAsName, $power)) {
                return response()->json(ResultHelper::returnFormat('无访问权限', ResponseCode::NO_REQUEST_PERMISSION), ResponseCode::NO_REQUEST_PERMISSION);
            }
        }
        return $next($request);
    }

}
