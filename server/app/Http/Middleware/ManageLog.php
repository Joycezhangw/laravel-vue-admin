<?php
declare (strict_types=1);

namespace App\Http\Middleware;

use App\Services\Repositories\Manage\Interfaces\ILog;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * 后台操作日志
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class ManageLog
 * @package App\Http\Middleware
 */
class ManageLog
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
            //获取用户信息，不存在抛出异常并赋空值
            $manageInfo = JWTAuth::parseToken()->touser()->toArray();
        } catch (JWTException $e) {
            $manageInfo = [];
        }
        //去掉关键字段
        $input = $request->except([
            'password',
            'oldpassword',
            'newpassword',
            'newpassword_confirm',
        ]);
        $manageLogRepo = app(ILog::class);
        $manageLogRepo->record([
            'manage_id' => $manageInfo['manage_id'] ?? 0,
            'manage_username' => $manageInfo['username'] ?? '',
            'log_params' => $input
        ]);
        return $next($request);
    }
}
