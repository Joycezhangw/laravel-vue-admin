<?php


namespace App\Services\Enums\Common;


use JoyceZ\LaravelLib\Enum\BaseEnum;

/**
 * 是否状态
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class YesOrNoEnum
 * @package App\Services\Enums\Common
 */
class YesOrNoEnum extends BaseEnum
{
    const COMMON_YES = 1;
    const COMMON_NO = 0;

    public static function getMap(): array
    {
        return [
            self::COMMON_NO => '否',
            self::COMMON_YES => '是',
        ];
    }
}
