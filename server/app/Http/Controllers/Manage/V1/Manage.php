<?php
declare(strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Enums\Common\YesOrNoEnum;
use App\Services\Repositories\Manage\Interfaces\IManage;
use App\Support\HashIdsSup;
use App\Support\Password;
use App\Validators\Manage\ManageValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use JoyceZ\LaravelLib\Helpers\FiltersHelper;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use JoyceZ\LaravelLib\Helpers\StrHelper;

/**
 * 后台用户管理
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class Manage
 * @package App\Http\Controllers\Manage\V1
 */
class Manage extends Controller
{
    /**
     * 列表
     * @param Request $request
     * @param IManage $manageRepo
     * @return array
     */
    public function index(Request $request, IManage $manageRepo)
    {
        $params = $request->all();
        $ret = $manageRepo->getList($params, $params['order'] ?? 'reg_date', $params['sort'] ?? 'desc');
        $list = $manageRepo->parseDataRows($ret['data']);
        return ResultHelper::returnFormat('success', 200, [
            'pagination' => [
                'total' => $ret['total'],
                'page_size' => $ret['per_page'],
                'current_page' => $ret['current_page'],
            ],
            'list' => $list
        ]);
    }

    /**
     * 用户详情
     * @param int $manageId
     * @param IManage $manageRepo
     * @return array
     */
    public function read(int $manageId, IManage $manageRepo)
    {
        $manage = $manageRepo->getByPkId($manageId);
        if (!$manage) {
            return ResultHelper::returnFormat('用户不存在', ResponseCode::ERROR);
        }
        $manage->roles;
        $manage->department;
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $manageRepo->parseDataRow($manage->toArray()));
    }

    /**
     * 创建管理员
     * @param Request $request
     * @param ManageValidator $validator
     * @param IManage $manageRepo
     * @return array
     */
    public function store(Request $request, ManageValidator $validator, IManage $manageRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $username = FiltersHelper::filterXSS(trim($params['username']));
        //查看是否重名
        $manage = $manageRepo->first(['username' => $username], ['manage_id']);
        if ($manage) {
            return ResultHelper::returnFormat('【' . $username . '】用户名已被使用', ResponseCode::ERROR);
        }
        $salt = Str::random(6);
        $data = [
            'username' => $username,
            'realname' => FiltersHelper::filterXSS(trim($params['realname'])),
            'nickname' => FiltersHelper::filterXSS(trim($params['nickname'])),
            'dept_id' => intval($params['dept_id']),
            'pwd_salt' => $salt,
            'password' => (new Password())->withSalt((string)config('laraveladmin.passport.password_salt'))->encrypt('123qwe@ASD', $salt),
            'is_super' => YesOrNoEnum::COMMON_NO,
            'reg_ip' => StrHelper::ip2long(),
            'manage_status' => intval($params['manage_status']),
            'phone' => FiltersHelper::filterXSS(trim($params['phone'])),
            'introduce' => FiltersHelper::filterXSS(trim($params['introduce']))
        ];
        $manage = $manageRepo->doCreate($data);
        if ($manage) {
            if ($params['roles']) {
                //对数据进行解密
                $ids = (new HashIdsSup())->decodeArray($params['roles']);
                $manage->roles()->sync(array_filter(array_unique($ids)));
            }
            return ResultHelper::returnFormat('新增成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 更新成功
     * @param int $manageId
     * @param Request $request
     * @param ManageValidator $validator
     * @param IManage $manageRepo
     * @return array
     */
    public function update(int $manageId, Request $request, ManageValidator $validator, IManage $manageRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $manage = $manageRepo->getByPkId($manageId);
        if (!$manage) {
            return ResultHelper::returnFormat('该账号不存在', ResponseCode::ERROR);
        }
        $username = FiltersHelper::filterXSS(trim($params['username']));
        //查看是否重名
        $manageUser = $manageRepo->first([['username', '=', $username], ['manage_id', '<>', $manageId]], ['manage_id']);
        if ($manageUser) {
            return ResultHelper::returnFormat('【' . $username . '】用户名已被使用', ResponseCode::ERROR);
        }
        $manage->username = $username;
        $manage->realname = FiltersHelper::filterXSS(trim($params['realname']));
        $manage->nickname = FiltersHelper::filterXSS(trim($params['nickname']));
        $manage->dept_id = intval($params['dept_id']);
        $manage->manage_status = intval($params['manage_status']);
        $manage->phone = FiltersHelper::filterXSS(trim($params['phone']));
        $manage->introduce = FiltersHelper::filterXSS(trim($params['introduce']));
        if ($manage->save()) {
            if ($params['roles']) {
                //对数据进行解密
                $ids = (new HashIdsSup())->decodeArray($params['roles']);
                $manage->roles()->sync(array_filter(array_unique($ids)));
            }
            return ResultHelper::returnFormat('更新成功成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 删除
     * @param int $manageId
     * @param IManage $manageRepo
     * @return array
     */
    public function destroy(int $manageId, IManage $manageRepo)
    {
        $manage = $manageRepo->getByPkId($manageId);
        if (!$manage) {
            return ResultHelper::returnFormat('用户不存在');
        }
        if ($manage->delete()) {
            $manage->roles()->detach($manageId);
            return ResultHelper::returnFormat('删除成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

}
