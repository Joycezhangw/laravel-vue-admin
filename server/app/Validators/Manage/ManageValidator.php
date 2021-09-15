<?php
declare (strict_types=1);

namespace App\Validators\Manage;


use JoyceZ\LaravelLib\Validation\AbstractValidator;

/**
 * 管理员信息更新验证
 * Class ManageValidator
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Validators\Manage
 */
class ManageValidator extends AbstractValidator
{
    protected $rules = [
        'username' => 'required|max:60',
        'nickname' => 'required|max:60',
        'realname' => 'required|max:30',
        'phone' => 'mobile|max:11',
        'introduce' => 'max:500',
    ];

    protected $messages = [
        'nickname.required' => '昵称不能为空',
        'nickname.max' => '昵称字数超过了限制',
        'realname.required' => '真实姓名不能为空',
        'realname.max' => '真实姓名字数超过了限制',
//        'phone.required' => '手机号不能为空',
        'phone.mobile' => '请输入11位手机号',
        'phone.max' => '手机号字数超过了限制',
        'introduce.max' => '简介字数超过了限制',
    ];
}
