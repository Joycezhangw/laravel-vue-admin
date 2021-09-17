<?php

declare (strict_types=1);

namespace App\Http;


use JoyceZ\LaravelLib\Enum\BaseEnum;

/**
 * HTTP 相应逻辑代码
 * Class ResponseCode
 * @package App\Http
 */
class ResponseCode extends BaseEnum
{

    const SUCCESS = 200;
    const ERROR = -1;
    const LOGIN_TOKEN_TIME_DIE = 401;
    const NO_REQUEST_PERMISSION = 403;

    public static function getMap(): array
    {
        return [
            self::SUCCESS => '操作成功',
            self::ERROR => '操作失败',
            self::LOGIN_TOKEN_TIME_DIE => 'token 过期',
            self::NO_REQUEST_PERMISSION => '无访问权限'
        ];
    }

}
