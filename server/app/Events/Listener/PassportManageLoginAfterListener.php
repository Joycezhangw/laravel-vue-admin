<?php
declare (strict_types=1);

namespace App\Events\Listener;


use App\Events\PassportManageLoginAfterEvent;
use JoyceZ\LaravelLib\Helpers\StrHelper;

/**
 * 监听登录成功后，更新登录信息
 * Class PassportManageLoginAfterListener
 * @package App\Events\Listener
 */
class PassportManageLoginAfterListener
{
    public function __construct()
    {
    }

    public function handle(PassportManageLoginAfterEvent $afterEvent)
    {
//        $jwt = $afterEvent->jwt;
        $clientIp = StrHelper::ip2long(request()->ip());
        $nowTime = now()->timestamp;
        $afterEvent->manage->update([
            'refresh_time' => $nowTime,
            'refresh_ip' => $clientIp,
            'last_login_ip' => $clientIp,
            'updated_at' => $nowTime,
            'last_login_time' => $nowTime
        ]);
    }

}
