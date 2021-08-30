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

    public function getLists(): array;

    /**
     * 根据登录名获取用户信息
     * @param string $username
     * @return mixed
     */
    public function getInfoByUsername(string $username);

}
