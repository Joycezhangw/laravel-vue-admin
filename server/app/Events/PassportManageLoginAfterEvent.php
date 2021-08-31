<?php

declare (strict_types=1);

namespace App\Events;


use App\Services\Models\Manage\ManageModel;

/**
 * 登录成功后事件
 * Class PassportManageLoginAfterEvent
 * @package App\Events
 */
class PassportManageLoginAfterEvent
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
        $this->manage = $manage;
        $this->jwt = $jwt;
    }

}
