<?php
declare(strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IDepartment;
use App\Validators\Manage\DeptValidator;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\FiltersHelper;
use JoyceZ\LaravelLib\Helpers\ResultHelper;

/**
 *
 * 部门管理
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class Dept
 * @package App\Http\Controllers\Manage\V1
 */
class Dept extends Controller
{
    /**
     * 列表
     * @param Request $request
     * @param IDepartment $departmentRepo
     * @return array
     */
    public function index(Request $request, IDepartment $departmentRepo)
    {
        $params = $request->all();
        $ret = $departmentRepo->getList($params);
        return ResultHelper::returnFormat('success', 200, $departmentRepo->parseDataRows($ret));
    }

    /**
     * 获取详情
     * @param int $id
     * @param IDepartment $departmentRepo
     * @return array
     */
    public function read(int $id, IDepartment $departmentRepo)
    {
        $dept = $departmentRepo->getByPkId($id);
        if (!$dept) {
            return ResultHelper::returnFormat('部门不存在', ResponseCode::ERROR);
        }
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $departmentRepo->parseDataRow($dept->toArray()));
    }

    /**
     * 新建
     * @param Request $request
     * @param DeptValidator $validator
     * @param IDepartment $departmentRepo
     * @return array
     */
    public function store(Request $request, DeptValidator $validator, IDepartment $departmentRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $data = [
            'dept_name' => FiltersHelper::filterXSS(trim($params['dept_name'])),
            'dept_desc' => FiltersHelper::filterXSS(trim($params['dept_desc'])),
            'dept_order' => intval($params['dept_order']),
            'parent_id' => (int)$params['parent_id']
        ];
        $dept = $departmentRepo->doCreate($data);
        if ($dept) {
            return ResultHelper::returnFormat('新建成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 更新
     * @param int $deptId
     * @param Request $request
     * @param DeptValidator $validator
     * @param IDepartment $departmentRepo
     * @return array
     */
    public function update(int $deptId, Request $request, DeptValidator $validator, IDepartment $departmentRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        $dept = $departmentRepo->getByPkId($deptId);
        if (!$dept) {
            return ResultHelper::returnFormat('部门信息不存在', ResponseCode::ERROR);
        }
        $dept->dept_name = FiltersHelper::filterXSS(trim($params['dept_name']));
        $dept->dept_desc = FiltersHelper::filterXSS(trim($params['dept_desc']));
        $dept->dept_order = intval($params['dept_order']);
        $dept->parent_id = (int)$params['parent_id'];
        if ($dept->save()) {
            return ResultHelper::returnFormat('更新成功', ResponseCode::SUCCESS);
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }

    /**
     * 删除
     * @param int $deptId
     * @param IDepartment $departmentRepo
     * @return array
     */
    public function destroy(int $deptId, IDepartment $departmentRepo)
    {
        $dept = $departmentRepo->getByPkId($deptId);
        if (!$dept) {
            return ResultHelper::returnFormat('部门不存在');
        }
        if ($dept->delete()) {
            return ResultHelper::returnFormat('删除成功');
        }
        return ResultHelper::returnFormat('网络繁忙，请稍后再试...', ResponseCode::ERROR);
    }
}
