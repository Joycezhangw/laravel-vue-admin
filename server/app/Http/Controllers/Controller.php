<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 获取用户信息
     * @param string $guard
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function getAuthUser($guard = 'member')
    {
        return Auth::guard($guard)->user();
    }

    /**
     * 设置 auth  guard
     * @param string $guard
     * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
     */
    public function withAuthGuard($guard = 'member')
    {
        return Auth::guard($guard);
    }

    /**
     * 返回视图
     *
     * 其匹配的路由规则必须是   模块>控制器>方法
     *
     * 例如  $router->get('index', 'Index@index')->name('manage.index.index');
     *
     * @param array $data
     * @param array $mergeData
     * @return \Illuminate\Contracts\View\Factory|View
     */
    protected function view(array $data = [], array $mergeData = [])
    {
        return view(Request()->route()->getName(), $data, $mergeData);
    }
}
