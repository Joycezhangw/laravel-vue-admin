<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage', function (Blueprint $table) {
            $table->increments('manage_id')->comment('管理员主键id');
            $table->unsignedInteger('dept_id')->default(0)->index('idx_manage_dept_id')->comment('所属部门');
            $table->string('username', 50)->default('')->comment('管理员登录名');
            $table->string('nickname', 50)->default('')->comment('昵称');
            $table->string('realname', 60)->default('')->comment('真实姓名');
            $table->string('phone', 168)->default('')->comment('联系电话');
            $table->char('password',32)->default('')->comment('密码');
            $table->char('pwd_salt', 24)->default('')->comment('密码加密盐，已加密');
            $table->string('avatar', 256)->default('')->comment('头像');
            $table->string('introduce',500)->default('')->comment('个人简介');
            $table->unsignedTinyInteger('is_super')->default(0)->comment('是否超级管理员[1 是 0 否]');
            $table->unsignedInteger('reg_date')->default(0)->index('idx_manage_reg_date')->comment('注册时间');
            $table->unsignedBigInteger('reg_ip')->default(0)->comment('注册时ip');
            $table->unsignedBigInteger('refresh_ip')->default(0)->comment('刷新ip');
            $table->unsignedBigInteger('last_login_ip')->default(0)->comment('最后一次登录ip');
            $table->unsignedInteger('last_login_time')->default(0)->comment('最后一次登录时间');
            $table->unsignedTinyInteger('manage_status')->default(1)->index('idx_manage_status')->comment('用户状态。可选值[1 启用 0 停用]');
            $table->unsignedInteger('updated_at')->default(0)->comment('更新时间');
            $table->unsignedInteger('refresh_time')->default(0)->comment('刷新时间');

            $table->unique('username', 'uk_manage_username');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage` comment '系统管理员'");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage` AUTO_INCREMENT=10001");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage');
    }
}
