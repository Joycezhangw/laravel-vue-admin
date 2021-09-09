<?php
declare (strict_types=1);

namespace App\Validators\Passport;


use JoyceZ\LaravelLib\Validation\AbstractValidator;

/**
 * 系统用户登录表单验证
 * Class ManageLoginValidator
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Validators\Passport
 */
class ManageLoginValidator extends AbstractValidator
{

    protected $rules = [
        'username' => 'required',
        'password' => 'required|min:8',
        'captcha' => 'required|size:4',
        'captcha_uniqid'=>'required'
    ];

    protected $messages = [
        'username.required' => '账号不能为空',
        'password.required' => '密码不能为空',
        'password.min' => '密码最少要输入8个字符',
        'captcha.required' => '验证码不能为空',
        'captcha.size' => '验证码位数错误',
        'captcha_uniqid.required' => '非法操作验证码',
    ];

}
