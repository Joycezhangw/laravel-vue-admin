<?php


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

    public static function getMap(): array
    {
        return [
            self::SUCCESS => '操作成功',
            self::ERROR => '操作失败'
        ];
    }

}
