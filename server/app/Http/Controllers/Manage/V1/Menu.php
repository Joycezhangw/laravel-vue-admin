<?php
declare (strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IMenu;
use Illuminate\Http\Request;
use JoyceZ\LaravelLib\Helpers\ResultHelper;

/**
 * 菜单
 *
 * @author joyecZhang <zhangwei762@163.com>
 * Class Menu
 * @package App\Http\Controllers\Manage\V1
 */
class Menu extends Controller
{
    public function index(Request $request, IMenu $menuRepo)
    {
        $menuList = $menuRepo->getAllList($request->all());
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, $menuRepo->parseDataRows($menuList));
    }

    public function store()
    {
        dump('store');
    }

    public function update(int $menuId)
    {
        dump('update');
    }

    public function destroy(int $menuId)
    {
        dump('destroy');
    }
}
