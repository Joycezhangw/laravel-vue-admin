## 橘色管理

> 角色列表

```
GET:/manage/v1/role

Request-params:{
    page: 1,//页码
    page_size: "",//显示总书
    search_text: "",//关键字搜索
    order: "updated_at",//排序字段
    sort: 'desc',//排序方式
}

Response:{
    "code": 200,
    "message": "success",
    "data": {
        "pagination": {
            "total": 2,//总数
            "page_size": 20,//一页显示数量
            "current_page": 1//页码
        },
        "list": [
            {
                "role_id": "rJyEv6GloKp412bwjQkjOVXzdgQb8B7n",
                "role_name": "测试角色1",
                "is_default": 0,
                "role_desc": "测试角色1",
                "created_at": "2021-09-13 02:16:11",
                "updated_at": "2021-09-13 02:57:45"
            },
            {
                "role_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "role_name": "超级管理员",
                "is_default": 1,
                "role_desc": "超级管理员角色，不可操作",
                "created_at": "2021-08-30 02:52:14",
                "updated_at": "2021-08-30 02:52:14"
            }
        ]
    }
}
```

> 角色详情

```
POST:/manage/v1/role/read/{roleId}


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


> 新建角色

```
POST:/manage/v1/role/store

Request-params:{
    "role_name":"测试角色",//角色名称
    "role_desc":"测试角色",//备注
    "menus":[//绑定菜单id
        "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
        "rJyEv6GloKp412bwjQkjOVXzdgQb8B7n",
        "dGwzpanX3VB0Px3mGR2JQNg4Zj59K7bM",
        "maAeB3dJ9DRoNqoA6ok5PGwvElrOnLKV",
        "RXYjVy5Pv7g8N2ObQeq90Qar1znweOZb",
        "PbN60o9dmvY3rxXBlM2VXRABMLgjQna5",
        "n8Mr13Yj76N5O29pJOqaRwVWP9lLpAdJ"
    ]
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 更新角色

```
PUT:/manage/v1/role/update/{roleId}

Request-params:{
    "role_name":"测试角色",//角色名称
    "role_desc":"测试角色",//备注
    "menus":[//绑定菜单id
        "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
        "rJyEv6GloKp412bwjQkjOVXzdgQb8B7n",
        "dGwzpanX3VB0Px3mGR2JQNg4Zj59K7bM",
        "maAeB3dJ9DRoNqoA6ok5PGwvElrOnLKV",
        "RXYjVy5Pv7g8N2ObQeq90Qar1znweOZb",
        "PbN60o9dmvY3rxXBlM2VXRABMLgjQna5",
        "n8Mr13Yj76N5O29pJOqaRwVWP9lLpAdJ"
    ]
}

Response:{
    "code": 200,
    "message": "更新成功",
}
```

> 删除角色

删除角色，同时会删除掉绑定的菜单中间表数据

```
DELETE:/manage/v1/role/delete/{roleId}

Response:{
    "code": 200,
    "message": "删除成功",
}
```
