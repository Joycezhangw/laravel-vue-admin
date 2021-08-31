<?php
declare (strict_types=1);

namespace App\Events\Listener;


use App\Events\PassportManageRefreshTokenEvent;
use JoyceZ\LaravelLib\Helpers\StrHelper;

/**
 * 监听退出、刷新token
 * Class PassportManageRefreshTokenListener
 * @package App\Events\Listener
 */
class PassportManageRefreshTokenListener
{
    public function handle(PassportManageRefreshTokenEvent $afterEvent)
    {
//        $jwt = $afterEvent->jwt;
        $clientIp = StrHelper::ip2long(request()->ip());
        $nowTime = now()->timestamp;
        $afterEvent->manage->update([
            'refresh_time' => $nowTime,
            'refresh_ip' => $clientIp,
            'updated_at' => $nowTime
        ]);
    }
}
