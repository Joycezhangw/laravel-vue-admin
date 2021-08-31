<?php
declare (strict_types=1);

namespace App\Events;


use App\Services\Models\Manage\ManageModel;

/**
 * 刷新token以及退出登录事件
 * Class PassportManageLoginAfterEvent
 * @package App\Events
 */
class PassportManageRefreshTokenEvent
{
    /**
     * request 管理员 model 实例
     * @var \App\Services\Models\Manage\ManageModel
     */
    public $manage;

    /**
     * 登录成功生成的 access_token, expires_in
     * @var array
     */
    public $jwt;

    public function __construct(ManageModel $manage, array $jwt)
    {
        $this->jwt = $jwt;
        $this->manage = $manage;
    }

}
