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

}
