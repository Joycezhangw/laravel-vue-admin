<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage\Interfaces;


use JoyceZ\LaravelLib\Repositories\Interfaces\BaseInterface;

/**
 * 管理端菜单和权限接口
 * Interface IMenu
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Services\Repositories\Manage\Interfaces
 */
interface IMenu extends BaseInterface
{

    /**
     * 获取角色对应 菜单和权限
     * @param array $roleIds 要查询的角色ids
     * @param bool $isSuper 是否超级管理员
     * @return array
     */
    public function generatePermission(array $roleIds = [], $isSuper = false): array;

    /**
     * 获取全部菜单列表
     * @param array $params
     * @return array
     */
    public function getAllList(array $params): array;

}
