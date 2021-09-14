<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageDepartmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_department', function (Blueprint $table) {
            $table->increments('dept_id');
            $table->unsignedInteger('parent_id')->default(0)->comment('上级部门');
            $table->string('dept_name', 50)->default('')->comment('部门名称');
            $table->unsignedInteger('dept_order')->default(0)->comment('排序');
            $table->string('dept_desc')->default('')->comment('部门描述');
            $table->unsignedInteger('created_at')->default(0)->comment('创建时间');
            $table->unsignedInteger('updated_at')->default(0)->comment('更新时间');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_department` comment '部门管理'");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_department` AUTO_INCREMENT=10001");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_department');
    }
}
