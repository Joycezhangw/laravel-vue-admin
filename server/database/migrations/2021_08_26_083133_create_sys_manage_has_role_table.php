<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageHasRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_has_role', function (Blueprint $table) {
            $table->unsignedInteger('role_id')->default(0)->index('pk_manage_role_id')->comment('角色id');
            $table->unsignedInteger('manage_id')->default(0)->index('pk_manage_id')->comment('管理员id');

            $table->foreign('role_id')
                ->references('role_id')
                ->on('sys_manage_role')
                ->onDelete('cascade');

            $table->foreign('manage_id')
                ->references('manage_id')
                ->on('sys_manage')
                ->onDelete('cascade');

            $table->primary(['role_id',  'manage_id'],
                'sys_manage_has_role_primary');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_has_role` comment '管理员绑定多个角色'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_has_role');
    }
}
