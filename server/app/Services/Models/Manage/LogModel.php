<?php


namespace App\Services\Models\Manage;


use Illuminate\Database\Eloquent\Model;

/***
 * 管理员操作日志
 *
 * @author joyecZhang <zhangwei762@163.com>
 *
 * Class LogModel
 * @package App\Services\Models\Manage
 */
class LogModel extends Model
{

    /**
     * 表名
     * @var string
     */
    protected $table = 'sys_manage_log';

    /**
     * 主键字段
     * @var string
     */
    protected $primaryKey = 'log_id';

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
        'log_id',
        'manage_id',
        'manage_username',
        'log_method',
        'log_action',
        'log_params',
        'log_ip',
        'log_ip_addr',
        'useragent',
        'created_at',
        'updated_at'
    ];


    /**
     * 应进行类型转换的属性
     *
     * @var array
     */
    protected $casts = [
        'log_params' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * 注册ip地址
     * @return string
     */
    public function getLogIpAttribute()
    {
        return long2ip($this->attributes['log_ip']);
    }

}
