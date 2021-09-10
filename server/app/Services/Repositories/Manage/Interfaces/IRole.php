<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage\Interfaces;


use JoyceZ\LaravelLib\Repositories\Interfaces\BaseInterface;

/**
 *
 * 角色
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Interface IRole
 * @package App\Services\Repositories\Manage\Interfaces
 */
interface IRole extends BaseInterface
{
    /**
     * 角色列表
     * @param array $params
     * @param string $orderBy
     * @param string $sort
     * @return array
     */
    public function getList(array $params,string $orderBy='created_at',string $sort='desc'): array;

}
