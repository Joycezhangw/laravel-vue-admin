<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageRoleHasDepartmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_role_has_department', function (Blueprint $table) {
            $table->unsignedInteger('role_id')->default(0)->index('pk_manage_role_id')->comment('角色id');
            $table->unsignedInteger('dept_id')->default(0)->index('pk_manage_dept_id')->comment('部门id');

            $table->foreign('role_id')
                ->references('role_id')
                ->on('sys_manage_role')
                ->onDelete('cascade');

            $table->foreign('dept_id')
                ->references('dept_id')
                ->on('sys_manage_department')
                ->onDelete('cascade');

            $table->primary(['role_id',  'dept_id'],
                'sys_manage_role_has_department_primary');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_role_has_department` comment '角色绑定多个部门'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_role_has_department');
    }
}
