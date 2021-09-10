<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Models\Manage\RoleModel;
use App\Services\Repositories\Manage\Interfaces\IRole;
use App\Support\HashIdsSup;
use JoyceZ\LaravelLib\Repositories\BaseRepository;

/**
 * 实现角色接口
 * @author joyecZhang <zhangwei762@163.com>
 * Class RoleRepo
 * @package App\Services\Repositories\Manage
 */
class RoleRepo extends BaseRepository implements IRole
{
    public function __construct(RoleModel $model)
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

    /**
     * 获取角色列表
     * @param array $params
     * @param string $orderBy
     * @param string $sort
     * @return array
     */
    public function getList(array $params, string $orderBy = 'updated_at', string $sort = 'desc'): array
    {
        $lists = $this->model->where(function ($query) use ($params) {
            if (isset($params['search_text']) && $params['search_text'] != '') {
                $query->where('role_name', 'like', '%' . $params['search_text'] . '%');
            }
        })
            ->orderBy($orderBy, $sort)
            ->paginate(isset($params['page_size']) ? $params['page_size'] : config('laraveladmin.paginate.page_size'));
        return $lists->toArray();
    }


}
