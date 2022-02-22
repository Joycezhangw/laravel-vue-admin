<?php


namespace App\Services\Models\Manage;


use App\Services\Enums\Common\YesOrNoEnum;
use App\Services\Enums\Manage\ManageStatusEnum;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use JoyceZ\LaravelLib\Traits\EncryptTableDbAttribute;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * 管理员
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class ManageModel
 * @package App\Services\Models\Manage
 */
class ManageModel extends Authenticatable implements JWTSubject
{
    use Notifiable,EncryptTableDbAttribute;

    /**
     * 表名
     * @var string
     */
    protected $table = 'sys_manage';

    /**
     * 主键字段
     * @var string
     */
    protected $primaryKey = 'manage_id';

    const CREATED_AT = 'reg_date'; //创建时间，注册时间
    const UPDATED_AT = 'updated_at'; //修改时间

    /**
     * 指示是否自动维护时间戳
     * @var bool
     */
    public $timestamps = true;

    /**
     * 黑名单
     *
     * @var array
     */
    protected $guarded = [
        'is_super'
    ];

    /**
     * 模型日期列的存储格式。
     * @var string
     */
    protected $dateFormat = 'U';

    protected $fillable = [
        'manage_id',
        'username',
        'nickname',
        'realname',
        'dept_id',
        'password',
        'pwd_salt',
        'phone',
        'avatar',
        'api_token',
        'introduce',
        'reg_date',
        'reg_ip',
        'last_login_ip',
        'last_login_time',
        'refresh_ip',
        'refresh_time',
        'manage_status'
    ];

    /**
     * 隐藏字段
     * @var array
     */
    protected $hidden = [
        'password', 'pwd_salt', 'pivot'
    ];

    /**
     * Eloquent 的 属性类型转换
     * @var array
     */
    protected $casts = [
        'reg_date' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * 创建虚拟字段
     * @var array
     */
    protected $appends=[
        'manage_status_txt',
        'is_super_txt',
    ];

    /**
     * 需要加解密字段
     * @var array
     */
    protected $encryptTable = [
        'phone','pwd_salt'
    ];

    /**
     * 最后登录时间
     * @return false|string
     */
    public function getLastLoginTimeAttribute()
    {
        return $this->attributes['last_login_time'] > 0 ? date('Y-m-d H:i:s', $this->attributes['last_login_time']) : '-';
    }

    /**
     * 最后刷新token时间
     * @return false|string
     */
    public function getRefreshTimeAttribute()
    {
        return $this->attributes['refresh_time'] > 0 ? date('Y-m-d H:i:s', $this->attributes['refresh_time']) : '-';
    }

    /**
     * 注册ip地址
     * @return string
     */
    public function getRegIpAttribute()
    {
        return $this->attributes['reg_ip'] > 0 ? long2ip($this->attributes['reg_ip']) : '-';
    }

    /**
     * 最后刷新 token ip
     * @return string
     */
    public function getRefreshIpAttribute()
    {
        return $this->attributes['refresh_ip'] > 0 ? long2ip($this->attributes['refresh_ip']) : '-';
    }

    /**
     * 最后登录ip地址
     * @return string
     */
    public function getLastLoginIpAttribute()
    {
        return $this->attributes['last_login_ip'] > 0 ? long2ip($this->attributes['last_login_ip']) : '-';
    }

    /**
     * 管理员状态值说明
     * @return mixed|string
     */
    public function getManageStatusTxtAttribute()
    {
        return isset($this->attributes['manage_status']) ? (ManageStatusEnum::getValue($this->attributes['manage_status']) ?? '') : '';
    }

    /**
     * 管理员状态值说明
     * @return mixed|string
     */
    public function getIsSuperTxtAttribute()
    {
        return isset($this->attributes['is_super']) ? (YesOrNoEnum::getValue($this->attributes['is_super']) ?? '') : '';
    }

    /**
     * 关联用户下多个角色
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(RoleModel::class, 'sys_manage_has_role', 'manage_id', 'role_id')
            ->select('sys_manage_role.role_id', 'sys_manage_role.role_name');
    }

    /**
     * 所属部门
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function department()
    {
        return $this->belongsTo(DepartmentModel::class, 'dept_id', 'dept_id')
            ->select('sys_manage_department.dept_id', 'sys_manage_department.dept_name');
    }

    /**
     * 某个用户下的所有操作日志
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function logs()
    {
        return $this->hasMany(LogModel::class, 'manage_id', 'manage_id');
    }

    /**
     * 获取存储在 JWT 申明的标识
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * 返回 JWT
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['role' => 'admin'];
    }


}
