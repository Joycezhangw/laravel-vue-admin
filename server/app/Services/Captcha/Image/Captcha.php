<?php


namespace App\Services\Captcha\Image;

use \App\Services\Contracts\Captcha as CaptchaContract;
use Illuminate\Support\Facades\Cache;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * 图形验证码
 * Class Captcha
 * @package App\Services\Captcha
 */
class Captcha implements CaptchaContract
{
    /**
     * 图形资源句柄
     * @var string
     */
    protected $img = '';

    /**
     * 验证码
     * @var string
     */
    protected $code = '';

    /**
     * 唯一序号
     * @var string
     */
    protected $uniqid = '';

    protected $config = [
        //随机码
        'captchaSalt' => 'abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ23456789',
        //长度
        'codeLen' => 4,
        //狂赌
        'width' => 130,
        //高度
        'height' => 50,
        //字体库路径
        'font' => __DIR__ . '/font/icon.ttf',
        'fontSize' => 20,
        //验证码缓存时间，秒钟
        'cacheTime' => 300
    ];

    /**
     * 设置唯一序号
     * @param string $uniqid
     * @return $this
     */
    public function withUniqid($uniqid = '')
    {
        $this->uniqid = $uniqid;
        return $this;
    }

    /**
     * 设置配置
     * @param array|string $name
     * @param null $value
     * @return $this|mixed
     */
    public function withConfig($name, $value = null)
    {
        if (is_array($name)) {
            foreach ($name as $key => $item) {
                $this->withConfig($key, $item);
            }
            return $this;
        }
        if (isset($this->config[$name])) {
            $this->config[$name] = $value;
        }
        return $this;
    }

    /**
     * 生成验证码信息
     * @return $this|mixed
     */
    public function makeCode()
    {
        //生成验证码序号
        if (empty($this->uniqid)) {
            $this->uniqid = md5(uniqid('laravel.vue.admin') . mt_rand(10000, 99999));
        }
        if (empty($this->code)) {
            $length = strlen($this->config['captchaSalt']) - 1;
            $code = [];
            for ($i = 0; $i < $this->config['codeLen']; $i++) {
                $code[] = $this->config['captchaSalt'][mt_rand(0, $length)];
            }
            $this->code = implode('', $code);
        } else {
            $this->config['codeLen'] = strlen($this->code);
        }
        Cache::put($this->uniqid, $this->code, $this->config['cacheTime']);
        return $this;
    }

    /**
     * 创建验证码图片
     * @return string
     */
    private function build()
    {
        $this->img = imagecreatetruecolor($this->config['width'], $this->config['height']);
        $color = imagecolorallocate($this->img, mt_rand(220, 255), mt_rand(220, 255), mt_rand(220, 255));
        imagefilledrectangle($this->img, 0, $this->config['height'], $this->config['width'], 0, $color);
        //生成干扰线条
        for ($i = 0; $i < 6; $i++) {
            $color = imagecolorallocate($this->img, mt_rand(0, 50), mt_rand(0, 50), mt_rand(0, 50));
            imageline($this->img, mt_rand(0, $this->config['width']), mt_rand(0, $this->config['height']), mt_rand(0, $this->config['width']), mt_rand(0, $this->config['height']), $color);
        }
        //生成雪花
        for ($i = 0; $i < 100; $i++) {
            $color = imagecolorallocate($this->img, mt_rand(200, 255), mt_rand(200, 255), mt_rand(200, 255));
            imagestring($this->img, mt_rand(1, 5), mt_rand(0, $this->config['width']), mt_rand(0, $this->config['height']), '*', $color);
        }
        //生成文字
        $pos = $this->config['width'] / $this->config['codeLen'];
        for ($i = 0; $i < $this->config['codeLen']; $i++) {
            // 字体颜色
            $fontcolor = imagecolorallocate($this->img, mt_rand(0, 156), mt_rand(0, 156), mt_rand(0, 156));
            imagettftext($this->img, $this->config['fontSize'], mt_rand(-30, 30), intval($pos * $i + mt_rand(1, 5)), intval($this->config['height'] / 1.4), $fontcolor, $this->config['font'], $this->code[$i]);
        }
        ob_start();
        imagepng($this->img);
        $data = ob_get_contents();
        ob_end_clean();
        imagedestroy($this->img);
        return base64_encode($data);
    }

    /**
     * 获取验证码相关信息
     * @return array
     */
    public function get(): array
    {
        return [
            'code' => $this->code,
            'uniq' => $this->uniqid,
            'image' => $this->getImage()
        ];
    }

    /**
     * 获取验证码编号
     *
     * @return string
     */
    public function getUniqid(): string
    {
        return $this->uniqid;
    }

    /**
     * 获取图片内容
     *
     * @return string
     */
    private function getImage(): string
    {
        return "data:image/png;base64,{$this->build()}";
    }

    /**
     * 获取验证码值
     * @return string
     */
    public function getCode(): string
    {
        return $this->code;
    }

    /**
     * 检验用户输入的验证码是否正确
     * @param string $code 需要校验的验证码
     * @param string $uniqid 验证码编号
     * @return bool|mixed
     */
    public function check(string $code, $uniqid = ''): bool
    {
        if (empty($uniqid)) {
            return false;
        }
        $value = Cache::pull($uniqid);//获取并删除验证码
        return is_string($value) && strtolower($value) === strtolower($code);
    }


}
