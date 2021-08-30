<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Models\Manage\LogModel;
use App\Services\Repositories\Manage\Interfaces\ILog;
use JoyceZ\LaravelLib\Helpers\StrHelper;
use JoyceZ\LaravelLib\Repositories\BaseRepository;

/**
 * 实现管理端日志接口
 * Class LogRepo
 * @package App\Services\Repositories\Manage
 */
class LogRepo extends BaseRepository implements ILog
{
    public function __construct(LogModel $model)
    {
        parent::__construct($model);
    }

    /**
     * 写入操作日志
     * @param array $params
     * @return mixed|void
     */
    public function record(array $params)
    {
        $params['log_params'] = json_encode($params['log_params'], JSON_UNESCAPED_SLASHES);
        $data = array_merge([
            'log_method' => strtoupper(request()->getMethod()),
            'log_action' => urldecode(request()->url()),
            'log_ip' => StrHelper::ip2long(request()->ip()),
            'useragent' => request()->server('HTTP_USER_AGENT'),
        ], $params);
        $this->model->create($data);
    }


}
