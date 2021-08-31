<?php

declare (strict_types = 1);

namespace App\Http\Middleware;

use App\Http\ResponseCode;
use Closure;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * jwt 后台中间件
 * Class ManageApiJwtAuth
 * @package App\Http\Middleware
 */
class ManageApiJwtAuth
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {  //获取到用户数据，并赋值给$user
                return response()->json(ResultHelper::returnFormat('用户不存在', ResponseCode::ERROR));
            }
            return $next($request);
        } catch (TokenExpiredException $e) {
            return response()->json(ResultHelper::returnFormat('token 过期', ResponseCode::ERROR));
        } catch (TokenInvalidException $e) {
            return response()->json(ResultHelper::returnFormat('token 无效', ResponseCode::ERROR));
        } catch (JWTException $e) {
            return response()->json(ResultHelper::returnFormat('缺少 token', ResponseCode::ERROR));
        }
    }
}
