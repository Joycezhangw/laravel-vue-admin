<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Enums\Manage\ManageStatusEnum;
use App\Services\Models\Manage\ManageModel;
use App\Services\Repositories\Manage\Interfaces\IManage;
use App\Support\HashIdsSup;
use JoyceZ\LaravelLib\Helpers\FiltersHelper;
use JoyceZ\LaravelLib\Repositories\BaseRepository;

/**
 * 实现管理员接口
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class ManageRepo
 * @package App\Services\Repositories\Manage
 */
class ManageRepo extends BaseRepository implements IManage
{
    public function __construct(ManageModel $model)
    {
        parent::__construct($model);
    }

    /**
     * 解析数据
     * @param array $row
     * @return array
     */
    public function parseDataRow(array $row): array
    {
        //解析管理员关联角色数据
        if (isset($row['roles']) && is_array($row['roles']) && count($row['roles']) > 0) {
            foreach ($row['roles'] as $key => $item) {
                $row['roles'][$key] = (new HashIdsSup())->encode($item);
            }
        }
        //解析管理员关联部门信息
        if (isset($row['department']) && is_array($row['department'])) {
            $row['department'] = (new HashIdsSup())->encode($row['department']);
        }
        //手机号脱敏
//        if (isset($row['phone'])) {
//            $row['phone'] = FiltersHelper::dataDesensitization($row['phone'], 3, 4);
//        }
        if (isset($row['manage_status'])) {
            $row['manage_status_txt'] = ManageStatusEnum::getValue($row['manage_status']);
        }
        return (new HashIdsSup())->encode($row);
    }

    /**
     * 管理员列表
     * @param array $params 查询参数
     * @param string $orderBy 排序字段
     * @param string $sort 排序方式
     * @return array
     */
    public function getList(array $params, string $orderBy = 'updated_at', string $sort = 'desc'): array
    {
        $lists = $this->model->where(function ($query) use ($params) {
            if (isset($params['search_text']) && $params['search_text'] != '') {
                $query->where('realname', 'like', '%' . $params['search_text'] . '%');
            }
        })->with('department', 'roles')
            ->orderBy($orderBy, $sort)
            ->paginate(isset($params['page_size']) ? $params['page_size'] : config('laraveladmin.paginate.page_size'));
        return $lists->toArray();
    }


    /**
     * 根据登录名获取用户信息
     * @param string $username 登录用户名
     * @return mixed
     */
    public function getInfoByUsername(string $username)
    {
        return $this->model->where('username', $username)->first();
    }


}
