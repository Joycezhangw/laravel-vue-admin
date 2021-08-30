<?php

namespace App\Http\Middleware;

use App\Services\Repositories\Manage\Interfaces\ILog;
use Closure;
use Illuminate\Http\Request;

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
        $manageInfo = [];
        $input=$request->except([
            'password',
            'oldpassword',
            'newpassword',
            'newpassword_confirm',
        ]);
        $manageLogRepo = app(ILog::class);
        $manageLogRepo->record([
            'manage_id'=>$manageInfo['manage_id'] ?? 0,
            'manage_username'=>$manageInfo['username'] ?? '',
            'log_params'=>$input
        ]);
        return $next($request);
    }
}
