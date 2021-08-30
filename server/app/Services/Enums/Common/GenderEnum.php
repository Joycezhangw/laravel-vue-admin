<?php


namespace App\Services\Enums\Common;


use JoyceZ\LaravelLib\Enum\BaseEnum;

/**
 * 性别
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class GenderEnum
 * @package App\Services\Enums\Common
 */
class GenderEnum extends BaseEnum
{
    const GENDER_MAN = 1;
    const GENDER_WOMAN = 2;
    const GENDER_UNKNOWN = 0;

    public static function getMap(): array
    {
        return [
            self::GENDER_UNKNOWN => '未知',
            self::GENDER_MAN => '男',
            self::GENDER_WOMAN => '女'
        ];
    }
}
