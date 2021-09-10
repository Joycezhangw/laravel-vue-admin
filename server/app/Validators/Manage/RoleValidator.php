<?php
declare(strict_types=1);

namespace App\Validators\Manage;


use JoyceZ\LaravelLib\Validation\AbstractValidator;

/**
 * 角色表单验证
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class RoleValidator
 * @package App\Validators\Manage
 */
class RoleValidator extends AbstractValidator
{
    protected $rules = [
        'role_name' => 'required|max:150',
        'role_desc' => 'max:250',
        'menus' => 'required|array|min:1'
    ];

    protected $messages = [
        'role_name.required' => '请输入角色名',
        'role_name.max' => '角色名字数超过限制',
        'role_desc.max' => '角色备注字数超过了限制',
        'menus.required' => '请选中功能权限',
        'menus.array' => '功能权限格式错误',
        'menus.min' => '至少选中一个功能权限'
    ];
}
