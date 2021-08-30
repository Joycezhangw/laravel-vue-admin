<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Models\Manage\ManageModel;
use App\Services\Repositories\Manage\Interfaces\IManage;
use App\Support\HashIdsSup;
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

    public function parseDataRow(array $row): array
    {
        return (new HashIdsSup())->encode($row);
    }

    public function getLists(): array
    {
        $lists = $this->model->get();
        dd($lists);
        return collect($lists)->toArray();
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
