<?php


namespace App\Services\Contracts;

use phpDocumentor\Reflection\Types\Boolean;

/**
 * 验证码接口
 * Interface Captcha
 * @package App\Services\Contracts
 */
interface Captcha
{
    /**
     * 设置配置
     * @param string|array $name
     * @param null $value
     * @return mixed
     */
    public function withConfig($name, $value = null);

    /**
     * 生成验证码信息
     * @return mixed
     */
    public function makeCode();

    /**
     * 获取验证码
     * @return mixed
     */
    public function get(): array;

    /**
     * 获取验证码值
     * @return string
     */
    public function getCode(): string;

    /**
     * 获取验证码编号
     * @return string
     */
    public function getUniqid(): string;

    /**
     * 检查验证码是否正确
     * @param string $code 需要验证的值
     * @param string $uniqid 验证码编码
     * @return mixed
     */
    public function check(string $code, $uniqid = ''): Boolean;
}
