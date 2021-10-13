<?php


namespace App\Http\Middleware;


use App\Http\ResponseCode;
use Closure;
use Illuminate\Support\Facades\Auth;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JWTRoleAuth extends BaseMiddleware
{
    /**
     * JWT 检测当前登录的平台
     * @param $request
     * @param Closure $next
     * @param null $role
     * @return \Illuminate\Http\JsonResponse|mixed
     * @throws JWTException
     */
    public function handle($request, Closure $next, $role = null)
    {
        try {
            $tokenRole = $this->auth->parseToken()->getClaim('role');
            if ($tokenRole != $role) {
                return response()->json(ResultHelper::returnFormat('token 授权失败', ResponseCode::LOGIN_TOKEN_TIME_DIE), ResponseCode::LOGIN_TOKEN_TIME_DIE);
            }
            $user = Auth::guard($tokenRole)->user();
            if (!$user) {  //获取到用户数据，并赋值给$user
                return response()->json(ResultHelper::returnFormat('用户不存在', ResponseCode::ERROR));
            }
            return $next($request);
        } catch (TokenExpiredException $e) {
            return response()->json(ResultHelper::returnFormat('token 过期', ResponseCode::LOGIN_TOKEN_TIME_DIE), ResponseCode::LOGIN_TOKEN_TIME_DIE);
        } catch (TokenInvalidException $e) {
            return response()->json(ResultHelper::returnFormat('token 无效', ResponseCode::LOGIN_TOKEN_TIME_DIE), ResponseCode::LOGIN_TOKEN_TIME_DIE);
        } catch (JWTException $e) {
            return response()->json(ResultHelper::returnFormat('缺少 token', ResponseCode::LOGIN_TOKEN_TIME_DIE), ResponseCode::LOGIN_TOKEN_TIME_DIE);
        }catch (TokenBlacklistedException $e){
            return response()->json(ResultHelper::returnFormat('缺少 token', ResponseCode::LOGIN_TOKEN_TIME_DIE), ResponseCode::LOGIN_TOKEN_TIME_DIE);
        }
    }
}
