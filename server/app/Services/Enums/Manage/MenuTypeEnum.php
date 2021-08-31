<?php


namespace App\Services\Enums\Manage;


use JoyceZ\LaravelLib\Enum\BaseEnum;

/**
 * 权限菜单类型
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class MenuTypeEnum
 * @package App\Services\Enums\Manage
 */
class MenuTypeEnum extends BaseEnum
{
    const MENU_TYPE_CATALOG = 0;
    const MENU_TYPE_MENU = 1;
    const MENU_TYPE_BUTTON = 2;

    public static function getMap(): array
    {
        return [
            self::MENU_TYPE_CATALOG => '目录',
            self::MENU_TYPE_MENU => '菜单',
            self::MENU_TYPE_BUTTON => '按钮'
        ];
    }

}
