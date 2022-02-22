<?php

namespace Database\Seeders;

use App\Services\Enums\Common\YesOrNoEnum;
use App\Services\Enums\Manage\ManageStatusEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use JoyceZ\LaravelLib\Aop\AopCrypt;
use JoyceZ\LaravelLib\Aop\AopPassword;
use JoyceZ\LaravelLib\Helpers\StrHelper;

class SysManageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //创建部门
        $deptId = DB::table('sys_manage_department')->insertGetId([
            'parent_id' => 0,
            'dept_name' => '研发部',
            'dept_desc' => '研发部门，超管所在',
            'created_at' => now()->timestamp,
            'updated_at' => now()->timestamp
        ]);
        //创建超级管理员
        $salt = Str::random(6);
        $manageId = DB::table('sys_manage')->insertGetId([
            'username' => 'peadmin',
            'nickname' => '超级管理员',
            'realname' => '超级管理员',
            'dept_id' => $deptId,
            'phone' => '',
            'password' => (new AopPassword())->withSalt(config('laraveladmin.passport.password_salt'))->encrypt('123456qwe@A', $salt),
            'pwd_salt' =>(new AopCrypt())->withScrectKey(config('laraveladmin.crypt.screct_key'))->encrypt($salt),
            'avatar' => '',
            'is_super' => YesOrNoEnum::COMMON_YES,
            'reg_date' => now()->timestamp,
            'reg_ip' => StrHelper::ip2long(),
            'last_login_ip' => StrHelper::ip2long(),
            'last_login_time' => now()->timestamp,
            'manage_status' => ManageStatusEnum::USER_STATE_ENABLE,
            'updated_at' => now()->timestamp
        ]);
        //创建角色
        $roleId = DB::table('sys_manage_role')->insertGetId([
            'role_name' => '超级管理员',
            'is_default' => YesOrNoEnum::COMMON_YES,
            'role_desc' => '超级管理员角色，不可操作',
            'created_at' => now()->timestamp,
            'updated_at' => now()->timestamp
        ]);
        //绑定角色
        DB::table('sys_manage_has_role')->insert([
            [
                'role_id' => $roleId,
                'manage_id' => $manageId
            ]
        ]);
        //绑定部门
        DB::table('sys_manage_role_has_department')->insert([
            [
                'role_id' => $roleId,
                'dept_id' => $deptId
            ]
        ]);
    }
}
