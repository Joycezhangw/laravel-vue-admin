<?php
declare (strict_types=1);

namespace App\Validators\Manage;


use JoyceZ\LaravelLib\Validation\AbstractValidator;

/**
 * 菜单验证
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class MenuValidator
 *
 * @package App\Validators\Manage
 */
class MenuValidator extends AbstractValidator
{
    protected $rules = [
        'menu_title' => 'required|max:150',
        'menu_name' => 'required|max:150',
        'menu_type'=>'required|in:0,1,2'
    ];

    protected $messages = [
        'menu_title.required' => '请输入菜单名称',
        'menu_title.max' => '菜单名称字数超过了限制',
        'menu_name.required' => '请输入节点路由名',
        'menu_name.max' => '节点路由名字数超过了限制',
        'menu_type.required' => '请选择节点类型',
        'menu_type.in' => '节点类型存在非法值',
    ];
}
