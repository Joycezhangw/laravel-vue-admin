<?php


namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\ILog as IManageLog;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\ResultHelper;

class Log extends Controller
{

    /**
     * 后台
     * @param Request $request
     * @param IManageLog $logRepo
     * @return array
     */
    public function index(Request $request, IManageLog $logRepo)
    {
        $params = $request->all();
        $ret = $logRepo->getList($params, $params['order'] ?? 'created_at', $params['sort'] ?? 'desc');
        $list = $logRepo->parseDataRows($ret['data']);
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, [
            'pagination' => [
                'total' => $ret['total'],
                'page_size' => $ret['per_page'],
                'current_page' => $ret['current_page'],
            ],
            'list' => $list
        ]);
    }

    /**
     * 删除
     * @param int $logId
     * @param IManageLog $logRepo
     * @return array
     */
    public function destroy(int $logId, IManageLog $logRepo)
    {
        $log = $logRepo->getByPkId($logId);
        if (!$log) {
            return ResultHelper::returnFormat('日志不存在',ResponseCode::ERROR);
        }
        if ($log->delete()) {
            return ResultHelper::returnFormat('删除成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }
}
