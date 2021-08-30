<?php


namespace App\Services\Enums\Manage;


use JoyceZ\LaravelLib\Enum\BaseEnum;

/**
 * 管理员用户状态
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class ManageStatusEnum
 * @package App\Services\Enums\Manage
 */
class ManageStatusEnum extends BaseEnum
{
    const USER_STATE_STOP = 0;
    const USER_STATE_ENABLE = 1;


    public static function getMap(): array
    {
        return [
            self::USER_STATE_STOP => '停用',
            self::USER_STATE_ENABLE => '启用'
        ];
    }
}
