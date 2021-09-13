<?php
declare(strict_types=1);

namespace App\Support;


use Vinkla\Hashids\Facades\Hashids;

/**
 * 对数据 ids 进行加密
 *
 * Class HashIdsSup
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Support
 */
class HashIdsSup
{

    /**
     * 请求参数需要解密 ids
     * @var array
     */
    protected $responseParametersShouldEncode = [];

    /**
     * 对返回的 ids 进行加密
     * @param array $row
     * @return array
     */
    public function encode(array $row)
    {
        if ($this->isOpenEncode()) {
            $this->responseParametersShouldEncode = config('hashids.middleware.request_parameters');
            foreach ($this->responseParametersShouldEncode as $key) {
                if (isset($row[$key])) {
                    $row[$key] = Hashids::encode($row[$key]);
                }
            }
        }
        return $row;
    }

    /**
     * 对一维数字数组进行加密
     * @param array $rows
     * @return array|string
     */
    public function encodeArray(array $rows)
    {
        if ($this->isOpenEncode()) {
            $ids = [];
            foreach ($rows as $key => $item) {
                $ids[] = Hashids::encode($item);
            }
            return $ids;
        }
        return $rows;
    }

    /**
     * 对加密的字符串数组进行加密
     * @param array $rows
     * @return array|string
     */
    public function decodeArray(array $rows)
    {
        if ($this->isOpenEncode()) {
            $ids = [];
            foreach ($rows as $key => $item) {
                $ids[] = Hashids::decode($item)[0];
            }
            return $ids;
        }
        return $rows;
    }

    /**
     * 是否开启加解密
     * @return bool|\Illuminate\Config\Repository|mixed
     */
    protected function isOpenEncode()
    {
        return config('hashids.middleware.open') ?? false;
    }

}
