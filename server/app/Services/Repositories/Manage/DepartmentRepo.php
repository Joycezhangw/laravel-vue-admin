<?php
declare(strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Models\Manage\DepartmentModel;
use App\Services\Repositories\Manage\Interfaces\IDepartment;
use App\Support\HashIdsSup;
use JoyceZ\LaravelLib\Repositories\BaseRepository;

/**
 * 实现部门接口
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class DepartmentRepo
 *
 * @package App\Services\Repositories\Manage
 */
class DepartmentRepo extends BaseRepository implements IDepartment
{
    public function __construct(DepartmentModel $model)
    {
        parent::__construct($model);
    }

    /**
     * 解析菜单数据
     * @param array $row
     * @return array
     */
    public function parseDataRow(array $row): array
    {
        return (new HashIdsSup())->encode($row);
    }

    /***
     * 部门列表
     * @param array $params
     * @param string $orderBy
     * @param string $sort
     * @return array
     */
    public function getList(array $params, string $orderBy = 'created_at', string $sort = 'desc'): array
    {
        $lists = $this->model->orderBy($orderBy, $sort)
            ->get();
        return $lists->toArray();
    }


}
