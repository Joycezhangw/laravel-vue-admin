<?php
declare (strict_types=1);

namespace App\Services\Repositories\Manage;


use App\Services\Enums\Manage\MenuTypeEnum;
use App\Services\Models\Manage\MenuModel;
use App\Services\Models\Manage\RoleHasMenuModel;
use App\Services\Repositories\Manage\Interfaces\IMenu;
use App\Support\HashIdsSup;
use JoyceZ\LaravelLib\Helpers\TreeHelper;
use JoyceZ\LaravelLib\Repositories\BaseRepository;

/**
 * 实现管理端菜单和权限接口
 *
 * Class MenuRepo
 *
 * @author joyecZhang <zhangwei762@163.com>
 * @package App\Services\Repositories\Manage
 */
class MenuRepo extends BaseRepository implements IMenu
{
    public function __construct(MenuModel $model)
    {
        parent::__construct($model);
    }

    /**
     * 解析菜单数据
     * @param array $row
     * @return array
     */
    public function parseDataRow(array $row): array
    {
        return (new HashIdsSup())->encode($row);
    }

    /**
     * 获取全部菜单列表
     * @param array $params
     * @return array
     */
    public function getAllList(array $params): array
    {
        $menuList = $this->model->orderBy('menu_order', 'ASC')->get([
            'menu_id',
            'parent_id',
            'menu_name',
            'menu_title',
            'menu_router',
            'menu_type',
            'menu_icon',
            'menu_order',
            'keep_alive',
            'is_show',
            'menu_component',
            'api_method',
            'api_path',
            'updated_at'
        ])->toArray();
        return $this->buildMenu($menuList);
    }

    private function buildMenu(array $menuList): array
    {
        $list = [];
        foreach ($menuList as $item) {
            $list[] = [
                'menuId' => $item['menu_id'],
                'path' => $item['menu_router'],
                'name' => $item['menu_name'],
                'title' => $item['menu_title'],
                'parentId' => $item['parent_id'],
                'menuType' => $item['menu_type'],
                'component' => $item['menu_component'],
                'isShow' => $item['is_show'],
                'menuOrder' => $item['menu_order'],
                'apiMethod' => $item['api_method'],
                'apiPath' => $item['api_path'],
                'updatedAt' => $item['updated_at'],
                'meta' => [
                    'title' => $item['menu_title'],
                    'icon' => $item['menu_icon'],
                    'keepAlive' => $item['keep_alive']
                ],
                'children' => []
            ];
        }
        return $list;
    }


    /**
     * 获取角色对应 菜单和权限
     * @param array $roleIds 角色ids
     * @param bool $isSuper 是否超级管理员
     * @return array
     */
    public function generatePermission(array $roleIds = [], $isSuper = false): array
    {
        $menuIds = [];
        //获取角色关联权限菜单ids
        if (!$isSuper && count($roleIds) > 0) {
            $menuIdsList = RoleHasMenuModel::whereIn('role_id', $roleIds)->pluck('menu_id')->toArray();
            $menuIds = array_unique($menuIdsList);
        }
        $menuListRet = $this->model->where(function ($query) use ($menuIds) {
            if (count($menuIds) > 0) {
                $query->whereIn('menu_id', $menuIds);
            }
        })->orderBy('menu_order', 'ASC')->get([
            'menu_id',
            'parent_id',
            'menu_name',
            'menu_title',
            'menu_router',
            'menu_type',
            'menu_icon',
            'menu_order',
            'keep_alive',
            'is_show',
            'menu_component',
            'api_method',
            'api_path',
            'updated_at'
        ])->toArray();
        $menus = $power = [];
        $menuList = $this->buildMenu($menuListRet);

        foreach ($menuList as $item) {
            //目录和菜单
            if (in_array($item['menuType'], [MenuTypeEnum::MENU_TYPE_CATALOG, MenuTypeEnum::MENU_TYPE_MENU])) {
                $menus[] = $item;
                continue;
            } elseif ($item['menuType'] == MenuTypeEnum::MENU_TYPE_BUTTON) {//按钮权限
                $power[] = $item['apiPath'];//(new HashIdsSup())->encode($item)['menuId'];
                continue;
            }
        }
        $menuGroup=TreeHelper::listToTree($menus,0,'menuId','parentId');
        return compact('menus', 'power','menuGroup');
    }

}
