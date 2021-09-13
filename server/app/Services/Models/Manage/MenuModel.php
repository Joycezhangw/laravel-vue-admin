<?php


namespace App\Services\Models\Manage;


use Illuminate\Database\Eloquent\Model;

/**
 * 前端菜单和按钮权限
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class MenuModel
 * @package App\Services\Models\Manage
 */
class MenuModel extends Model
{
    /**
     * 表名
     * @var string
     */
    protected $table = 'sys_manage_menu';

    /**
     * 主键字段
     * @var string
     */
    protected $primaryKey = 'menu_id';

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
        'menu_id',
        'parent_id',
        'menu_name',
        'menu_title',
        'menu_router',
        'menu_type',
        'menu_icon',
        'menu_order',
        'keep_alive',
        'is_show',
        'menu_component',
        'api_method',
        'api_path',
        'created_at',
        'updated_at'
    ];

    /**
     * 强制转换的属性
     *
     * @var array
     */
    protected $casts = [
        'is_show' => 'boolean',
        'keep_alive' => 'boolean',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $hidden=[
        'pivot'
    ];

    /**
     * 角色绑定权限路由和按钮
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(RoleModel::class, 'sys_manage_role_has_menu', 'menu_id', 'role_id');
    }
}
