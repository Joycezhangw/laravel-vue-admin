<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage\Interfaces;


use JoyceZ\LaravelLib\Repositories\Interfaces\BaseInterface;

/**
 * 管理员日志
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Interface ILog
 * @package App\Services\Repositories\Manage\Interfaces
 */
interface ILog extends BaseInterface
{
    /**
     * 写入日志
     * @param array $params
     * @return mixed
     */
    public function record(array $params);

    /**
     * 后台用户请求日志
     * @param array $params  搜索参数
     * @param string $orderBy 排序
     * @param string $sort 排序方式
     * @return array
     */
    public function getList(array $params, string $orderBy = 'created_at', string $sort = 'desc'): array;

}
