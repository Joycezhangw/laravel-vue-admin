<?php
declare(strict_types=1);

namespace App\Validators\Manage;


use JoyceZ\LaravelLib\Validation\AbstractValidator;

/**
 * 部门表单验证
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class DeptValidator
 * @package App\Validators\Manage
 */
class DeptValidator extends AbstractValidator
{
    protected $rules = [
        'dept_name' => 'required|max:150',
        'dept_desc' => 'max:250',
        'parent_id' => 'required'
    ];

    protected $messages = [
        'dept_name.required' => '请输入部门名',
        'dept_name.max' => '部门名字数超过限制',
        'dept_desc.max' => '部门备注字数超过了限制',
        'parent_id.required' => '请选择上级部门',
    ];
}
