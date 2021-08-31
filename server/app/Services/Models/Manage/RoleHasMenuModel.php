<?php
declare (strict_types=1);

namespace App\Services\Models\Manage;


use Illuminate\Database\Eloquent\Model;

/**
 * 角色绑定菜单
 * Class RoleHasMenuModel
 * @package App\Services\Models\Manage
 */
class RoleHasMenuModel extends Model
{
    protected $table = 'sys_manage_role_has_menu';

    protected $fillable = [
        'role_id', 'menu_id'
    ];
}
