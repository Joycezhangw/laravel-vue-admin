<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSysManageMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_menu', function (Blueprint $table) {
            $table->increments('menu_id');
            $table->unsignedInteger('parent_id')->default(0)->comment('父菜单ID');
            $table->string('menu_name',60)->default('')->comment('菜单名称');
            $table->string('menu_title')->default('')->comment('菜单标题');
            $table->string('menu_router')->default('')->comment('菜单前端路由地址');
            $table->unsignedTinyInteger('menu_type')->default(0)->comment('类型[0:目录;1:菜单;2:按钮]');
            $table->string('menu_icon')->default('')->comment('菜单图标');
            $table->unsignedInteger('menu_order')->default(0)->comment('排序');
            $table->unsignedTinyInteger('keep_alive')->default(1)->comment('路由缓存[0:否;1:是]');
            $table->unsignedTinyInteger('is_show')->default(1)->comment('显示菜单[0:否;1:是]');
            $table->string('menu_component')->default('')->comment('视图地址');
            $table->string('api_method',6)->default('')->comment('api请求方式[创建:POST;查看:GET;更新:PUT;删除:DELETE]');
            $table->string('api_path')->default('')->comment('api请求地址');
            $table->unsignedInteger('created_at')->default(0)->comment('创建时间');
            $table->unsignedInteger('updated_at')->default(0)->comment('更新时间');
            //路由名唯一索引
            $table->unique('menu_name', 'uk_manage_menu_name');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_menu` comment '前端管理菜单'");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_menu` AUTO_INCREMENT=10001");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_menu');
    }
}
