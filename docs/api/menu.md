## 权限菜单管理

> 菜单列表

```
GET:/manage/v1/menu


Response:{
    "code":200,
    "message":"success",
    "data":[
        {
            "menuId":"6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
            "path":"/sys",
            "name":"systemManage",
            "title":"系统管理",
            "parentId":"3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r",
            "menuType":0,
            "component":"",
            "hidden":false,
            "menuOrder":0,
            "apiMethod":"",
            "apiPath":"",
            "updatedAt":"2021-08-31 07:05:33",
            "meta":{
                "title":"系统管理",
                "icon":"icon-system",
                "keepAlive":true
            },
            "children":[

            ]
        },
        {
            "menuId":"Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
            "path":"/sys/auth",
            "name":"authManage",
            "title":"权限管理",
            "parentId":"6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
            "menuType":0,
            "component":"",
            "hidden":false,
            "menuOrder":0,
            "apiMethod":"",
            "apiPath":"",
            "updatedAt":"2021-08-31 07:05:33",
            "meta":{
                "title":"权限管理",
                "icon":"icon-auth",
                "keepAlive":true
            },
            "children":[

            ]
        }
    ]
}
```

> 新建菜单

```
POST:/manage/v1/menu/read/{menuId}


Response:{
    "code": 200,
    "message": "success",
    "data": {
        "menu_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "parent_id": "3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r",
        "menu_name": "systemManage",
        "menu_title": "系统管理",
        "menu_router": "/sys",
        "menu_type": 0,
        "menu_icon": "icon-system",
        "menu_order": 0,
        "keep_alive": true,
        "is_show": true,
        "menu_component": "",
        "api_method": "",
        "api_path": "",
        "created_at": "2021-08-31 07:05:33",
        "updated_at": "2021-08-31 07:05:33"
    }
}
```

> 新建菜单

```
POST:/manage/v1/menu/store

Request-params:{
    menu_type: 0,//菜单类型[0:目录;1:菜单;2:权限]
    menu_title: "",//菜单中文名称
    parent_id: "",//菜单父级id
    menu_name: "",//唯一英文标识，前端路由 name
    is_show: true,//是否显示 bool
    keep_alive: true,//是否缓存 bool
    menu_order: 0,//排序
    menu_router: "",//前端路由 path
    menu_icon: "",//图标
    menu_component: "",//前端文件路径
    api_path: "",//后端路由别名权限标识
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 更新菜单

```
PUT:/manage/v1/menu/update/{id}

Request-params:{
    menu_type: 0,//菜单类型[0:目录;1:菜单;2:权限]
    menu_title: "",//菜单中文名称
    parent_id: "",//菜单父级id
    menu_name: "",//唯一英文标识，前端路由 name
    is_show: true,//是否显示 bool
    keep_alive: true,//是否缓存 bool
    menu_order: 0,//排序
    menu_router: "",//前端路由 path
    menu_icon: "",//图标
    menu_component: "",//前端文件路径
    api_path: "",//后端路由别名权限标识
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 更新菜单

删除菜单，同时会删除掉绑定的角色中间表数据

```
DELETE:/manage/v1/menu/delete/{id}

Response:{
    "code": 200,
    "message": "删除成功",
}
```

> 获取后端权限标识

```
GET:/manage/v1/menu/power

Response:{
    "code":200,
    "message":"success",
    "data":[
        "manage.menu.index",
        "manage.menu.store",
        "manage.menu.update",
        "manage.menu.destroy",
        "manage.menu.power",
        "manage.role.index",
        "manage.role.store",
        "manage.role.update",
        "manage.role.destroy"
    ]
}
```