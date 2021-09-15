<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage\Interfaces;


use JoyceZ\LaravelLib\Repositories\Interfaces\BaseInterface;

/**
 * 管理员接口
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Interface IManage
 * @package App\Services\Repositories\Manage\Interfaces
 */
interface IManage extends BaseInterface
{

    /**
     * 管理员列表
     * @param array $params 查询参数
     * @param string $orderBy 排序字段
     * @param string $sort 排序方式
     * @return array
     */
    public function getList(array $params, string $orderBy = 'updated_at', string $sort = 'desc'): array;

    /**
     * 根据登录名获取用户信息
     * @param string $username
     * @return mixed
     */
    public function getInfoByUsername(string $username);

}
