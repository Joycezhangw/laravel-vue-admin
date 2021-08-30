<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Query\Expression;
use Illuminate\Support\Facades\Schema;

class CreateSysManageLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_manage_log', function (Blueprint $table) {
            $table->id('log_id');
            $table->unsignedInteger('manage_id')->default(0)->index('idx_manage_id')->comment('管理员id');
            $table->string('manage_username', 50)->default('')->comment('管理员用户名');
            $table->string('log_action', 100)->default('')->comment('操作行为');
            $table->json('log_params')->default(new Expression('(JSON_ARRAY())'))->comment('参数');
            $table->string('log_method',10)->default('')->comment('请求类型');
            $table->bigInteger('log_ip')->default(0)->comment('ip地址');
            $table->string('log_ip_addr')->default('')->comment('ip所在区域');
            $table->string('useragent', 256)->comment('User-Agent');
            $table->unsignedInteger('created_at')->default(0)->comment('创建时间');
            $table->unsignedInteger('updated_at')->default(0)->comment('更新时间');
        });
        //表注释
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_log` comment '操作日志'");
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `sys_manage_log` AUTO_INCREMENT=10001");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_manage_log');
    }
}
