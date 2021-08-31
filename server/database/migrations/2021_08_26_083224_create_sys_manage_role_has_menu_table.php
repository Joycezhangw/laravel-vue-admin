<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageRoleHasMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_role_has_menu', function (Blueprint $table) {
            $table->unsignedInteger('role_id')->default(0)->index('pk_manage_role_id')->comment('角色id');
            $table->unsignedInteger('menu_id')->default(0)->index('pk_manage_menu_id')->comment('权限菜单id');

            $table->foreign('role_id')
                ->references('role_id')
                ->on('sys_manage_role')
                ->onDelete('cascade');

            $table->foreign('menu_id')
                ->references('menu_id')
                ->on('sys_manage_menu')
                ->onDelete('cascade');

            $table->primary(['role_id',  'menu_id'],
                'sys_manage_role_has_menu_primary');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_role_has_menu` comment '角色绑定多个权限菜单'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_role_has_menu');
    }
}
