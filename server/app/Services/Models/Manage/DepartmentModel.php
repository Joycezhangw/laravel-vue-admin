<?php


namespace App\Services\Models\Manage;


use Illuminate\Database\Eloquent\Model;

/**
 * 部门
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class DepartmentModel
 * @package App\Services\Models\Manage
 */
class DepartmentModel extends Model
{
    /**
     * 表名
     * @var string
     */
    protected $table = 'sys_manage_department';

    /**
     * 主键字段
     * @var string
     */
    protected $primaryKey = 'dept_id';

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
        'dept_id',
        'parent_id',
        'dept_name',
        'dept_order',
        'dept_desc',
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
    public function roles()
    {
        return $this->belongsToMany(RoleModel::class, 'sys_manage_role_has_department', 'dept_id', 'role_id');
    }

    /**
     * 部门关联管理员
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function manage()
    {
        return $this->hasMany(ManageModel::class, 'dept_id', 'dept_id');
    }
}
