<?php

declare(strict_types=1);

namespace App\Traits;


use Illuminate\Support\Facades\Validator;
use JoyceZ\LaravelLib\Validation\Validator as CustomValidator;

/**
 * 自定义表单扩展验证规则
 *
 * TODO：小写扩展 rule，否则无效
 *
 * Trait ValidatorTrait
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Traits
 */
trait ValidatorTrait
{
    public function validatorBoot()
    {
        //验证手机号
        Validator::extend('mobile', function ($attribute, $value, $parameters, $validator) {
            $pattern = '/^1[3456789]{1}\d{9}$/';
            $res = preg_match($pattern, $value);
            return $res > 0;
        });
        Validator::replacer('mobile', function ($message, $attribute, $rule, $parameters) {
            return $message;
        });
        //中文名
        Validator::extend('chinese_name', function ($attribute, $value, $parameters, $validator) {
            return CustomValidator::isChineseName($value);
        });
        Validator::replacer('chinese_name', function ($message, $attribute, $rule, $parameters) {
            return $message;
        });
        //密码必须至少包含8个字符、至少含有一个数字、小写和大写字母以及特殊字符
        Validator::extend('complex_pwd', function ($attribute, $value, $parameters, $validator) {
            return 0 < preg_match("/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/", $value);
        });
        Validator::replacer('complex_pwd', function ($message, $attribute, $rule, $parameters) {
            return $message;
        });
        //验证是否是非负数、非小数点数字。用于 数字 ID 验证
        Validator::extend('positive_id', function ($attribute, $value, $parameters, $validator) {
            return CustomValidator::isPositive($value);
        });
        Validator::replacer('positive_id', function ($message, $attribute, $rule, $parameters) {
            return $message;
        });
    }

}
