<?php
declare (strict_types = 1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * 请求 ids 解密中间件
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 *
 * Class HashIds
 * @package App\Http\Middleware
 */
class HashIds
{
    /**
     * 路由端需要解密 ids
     * @var array
     */
    protected $routeParametersShouldDecode = [];

    /**
     * 请求参数需要解密 ids
     * @var array
     */
    protected $requestParametersShouldDecode = [];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->isOpenMiddleware()) {
            $this->init()
                ->decodeRouteParameters($request)
                ->decodeRequestParameters($request);
        }
        return $next($request);
    }

    /**
     * 初始化需要解密 ids
     * @return $this
     */
    protected function init()
    {
        $this->routeParametersShouldDecode = config('hashids.middleware.route_parameters');
        $this->requestParametersShouldDecode = config('hashids.middleware.request_parameters');
        return $this;
    }

    /**
     * 对路由参数 ids 进行解密
     * @param $request
     * @return $this
     */
    protected function decodeRouteParameters($request)
    {
        if ($route = $request->route()) {
            $parameters = $route->parameters();
            foreach ($this->routeParametersShouldDecode as $key) {
                if (isset($parameters[$key])) {
                    $paramsId = \Vinkla\Hashids\Facades\Hashids::decode($parameters[$key]);
                    $route->setParameter($key, isset($paramsId[0]) ? $paramsId[0] : $parameters[$key]);
                }
            }
        }
        return $this;
    }

    /**
     * 对请求参数 ids 进行解密
     * @param $request
     * @return $this
     */
    protected function decodeRequestParameters($request)
    {
        if ($parameters = $request->all()) {
            foreach ($this->requestParametersShouldDecode as $key) {
                if (isset($parameters[$key])) {
                    $paramsId = \Vinkla\Hashids\Facades\Hashids::decode($parameters[$key]);
                    $request->merge([$key => isset($paramsId[0]) ? $paramsId[0] : $parameters[$key]]);
                }
            }
        }
        return $this;
    }

    /**
     * 是否打开可逆加解密中间件
     * @return bool|\Illuminate\Config\Repository|mixed
     */
    protected function isOpenMiddleware()
    {
        return config('hashids.middleware.open') ?? false;
    }
}
