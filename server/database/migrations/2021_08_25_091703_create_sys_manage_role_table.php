<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_role', function (Blueprint $table) {
            $table->increments('role_id')->comment('管理员角色主键id');
            $table->string('role_name', 50)->default('')->comment('角色名称');
            $table->unsignedTinyInteger('is_default')->default(0)->comment('是否默认角色[1 是 0 否]');
            $table->string('role_desc', 512)->default('')->comment('角色描述');
            $table->unsignedInteger('created_at')->default(0)->comment('创建时间');
            $table->unsignedInteger('updated_at')->default(0)->comment('更新时间');
            //角色名称唯一索引
            $table->unique('role_name', 'uk_manage_role_name');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_role` comment '管理员角色'");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_role` AUTO_INCREMENT=10001");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_role');
    }
}
