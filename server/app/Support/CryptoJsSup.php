<?php


namespace App\Support;

/**
 * 应用层的可逆加解密
 * Class CryptoJsSup
 * @package App\Support
 */
class CryptoJsSup
{
    /**
     * 请求参数需要解密 ids
     * @var array
     */
    protected $DbAttribute = [];

//    protected $aopCrypt = null;

    protected $screctKey = '';

    private $supportedCiphers = [
        'aes-128-cbc' => ['size' => 16, 'aead' => false],
        'aes-256-cbc' => ['size' => 32, 'aead' => false],
        'aes-128-gcm' => ['size' => 16, 'aead' => true],
        'aes-256-gcm' => ['size' => 32, 'aead' => true],
    ];


    public function __construct(string $screctKey = '')
    {
        //TODO：目前暂时不使用 AopCrypt。此处要使用用token作为密钥对数据进行加解密。要跟前端保持一致
        //TODO:使用 AopCrypt，就要用  base64_encode(random_bytes(16)) 生成 24 位 16进制 密钥
//        $this->aopCrypt = new AopCrypt();
        $this->DbAttribute = config('laraveladmin.crypt.attribute');
//        $screctKey=trim($screctKey) == '' ? config('laraveladmin.crypt.screct_key') : $screctKey;
//        $this->aopCrypt->withScrectKey($screctKey);
        $this->screctKey = md5($screctKey);
    }

    /**
     * 指定 AES 创建一个加密密钥
     * @param string $cipher $this->supportedCiphers[key]
     * @return string
     * @throws \Exception
     */
    public function generateKey(string $cipher)
    {
        return random_bytes($this->supportedCiphers[strtolower($cipher)]['size'] ?? 32);
    }

    /**
     * 对返回的 字段 进行加密
     * @param array $row
     * @return array
     */
    public function encrypt(string $value)
    {
        $iv = str_repeat("0", 16);
        $encrypt_str = openssl_encrypt($value, 'aes-256-cbc', $this->screctKey, 0, $iv);
        return $encrypt_str;
    }

    /**
     * 对返回的 字段 进行加密
     * @param array $row
     * @return array
     */
    public function decrypt(string $value)
    {
        $replace = ['+', '/'];
        $search = ['-', '_'];
        $iv = str_repeat("0", 16);
        $str = openssl_decrypt(str_replace($search, $replace, $value), 'aes-256-cbc', $this->screctKey, 0, $iv);
        return $this->special_filter(trim($str));
    }

    /**
     * 根据ascii码过滤控制字符
     * @param $string
     * @return string
     */
    private function special_filter($string)
    {
        if (!$string) return '';
        $new_string = '';
        for ($i = 0; isset($string[$i]); $i++) {
            $asc_code = ord($string[$i]);    //得到其asc码
            //以下代码旨在过滤非法字符
            if ($asc_code == 9 || $asc_code == 10 || $asc_code == 13) {
                $new_string .= ' ';
            } else if ($asc_code > 31 && $asc_code != 127) {
                $new_string .= $string[$i];
            }
        }
        return trim($new_string);
    }

    /**
     * 对返回的 字段 进行加密
     * @param array $row
     * @return array
     */
    public function encryptRow(array $row)
    {
        foreach ($this->DbAttribute as $key) {
            if (isset($row[$key])) {
                $row[$key] = $this->encrypt((string)$row[$key]);
            }
        }
        return $row;
    }

    /**
     * 数组集进行加密
     * @param array $rows
     * @return array|string
     */
    public function encodeRows(array $rows)
    {
        $list = [];
        foreach ($rows as $row) {
            $list[] = $this->encryptRow($row);
        }
        return $list;
    }

    /**
     * 对返回的字段进行解密
     * @param array $row
     * @return array
     */
    public function decryptRow(array $row)
    {
        foreach ($this->DbAttribute as $key) {
            if (isset($row[$key])) {
                $row[$key] = $this->decrypt((string)$row[$key]);
            }
        }
        return $row;
    }

    /**
     * 数组集进行解密
     * @param array $rows
     * @return array|string
     */
    public function decryptRows(array $rows)
    {
        $list = [];
        foreach ($rows as $row) {
            $list[] = $this->decryptRow($row);
        }
        return $list;
    }
}
