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
    }

}
