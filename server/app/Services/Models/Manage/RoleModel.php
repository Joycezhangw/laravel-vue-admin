<?php


namespace App\Services\Models\Manage;


use Illuminate\Database\Eloquent\Model;

/**
 * 角色
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class RoleModel
 * @package App\Services\Models\Manage
 */
class RoleModel extends Model
{
    /**
     * 表名
     * @var string
     */
    protected $table = 'sys_manage_role';

    /**
     * 主键字段
     * @var string
     */
    protected $primaryKey = 'role_id';

    /**
     * 指示是否自动维护时间戳
     * @var bool
     */
    public $timestamps = true;

    /**
     * 模型日期列的存储格式。
     * @var string
     */
    protected $dateFormat = 'U';

    protected $fillable = [
        'role_id',
        'role_name',
        'is_default',
        'role_desc',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $hidden=[
        'pivot'
    ];


    /**
     * 关联用户下多个角色
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function department()
    {
        return $this->belongsToMany(DepartmentModel::class, 'sys_manage_role_has_department', 'dept_id', 'role_id');
    }

    /**
     * 角色关联用户
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function manages()
    {
        return $this->belongsToMany(ManageModel::class, 'sys_manage_has_role', 'role_id', 'manage_id');
    }

    /**
     * 角色绑定权限路由和按钮
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function menus()
    {
        return $this->belongsToMany(MenuModel::class, 'sys_manage_role_has_menu', 'role_id', 'menu_id');
    }
}
