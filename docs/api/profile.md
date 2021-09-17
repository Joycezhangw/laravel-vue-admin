## 管理员个人相关


> 个人信息

```
GET:/manage/v1/profile

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "success",
    "data": {
        "manage_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "username": "peadmin",
        "nickname": "超级管理员",
        "realname": "超级管理员",
        "phone": "13635000056",
        "avatar": "",
        "introduce": "",
        "is_super": 1,
        "reg_date": "2021-08-30 02:52:14",
        "reg_ip": "127.0.0.1",
        "refresh_ip": "172.0.0.1",
        "last_login_ip": "172.0.0.1",
        "last_login_time": "2021-08-31 06:14:07",
        "manage_status": 1,
        "updated_at": "2021-08-31T06:18:55.000000Z",
        "refresh_time": "2021-08-31 06:14:07",
        "roles": [
            {
                "role_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "role_name": "超级管理员"
            }
        ],
        "department": {
            "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
            "dept_name": "研发部"
        }
    }
}
```

> 更新个人信息

```
PUT:/manage/v1/profile/update

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Request-params:{
    "nickname":'昵称',
    "realname":'真实姓名',
    "phone":'联系电话',
    "introduce":'个人简介'
}

Response:{
    "code": 200,
    "message": "更新个人信息成功",
    "data": []
}
```


> 获取权限菜单

```
PUT:/manage/v1/profile/rules

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "success",
    "data": {
        "menus": {
    "code":200,
    "message":"success",
    "data":{
        "menus":[//菜单路由
            {
                "menuId":"6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "path":"\/sys",
                "name":"systemManage",
                "title":"\u7cfb\u7edf\u7ba1\u7406",
                "parentId":"3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r",
                "menuType":0,
                "component":"",
                "hidden":false,
                "menuOrder":0,
                "apiMethod":"",
                "apiPath":"",
                "updatedAt":"2021-08-31 07:05:33",
                "meta":{
                    "title":"\u7cfb\u7edf\u7ba1\u7406",
                    "icon":"icon-system",
                    "keepAlive":true
                },
                "children":[

                ]
            },
            {
                "menuId":"Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
                "path":"\/sys\/auth",
                "name":"authManage",
                "title":"\u6743\u9650\u7ba1\u7406",
                "parentId":"6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "menuType":0,
                "component":"",
                "hidden":false,
                "menuOrder":0,
                "apiMethod":"",
                "apiPath":"",
                "updatedAt":"2021-08-31 07:05:33",
                "meta":{
                    "title":"\u6743\u9650\u7ba1\u7406",
                    "icon":"icon-auth",
                    "keepAlive":true
                },
                "children":[

                ]
            },
            {
                "menuId":"rJyEv6GloKp412bwjQkjOVXzdgQb8B7n",
                "path":"\/sys\/menu",
                "name":"menuManage",
                "title":"\u83dc\u5355\u7ba1\u7406",
                "parentId":"Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
                "menuType":1,
                "component":"view\/system\/menu\/index.vue",
                "hidden":false,
                "menuOrder":0,
                "apiMethod":"",
                "apiPath":"",
                "updatedAt":"2021-08-31 07:05:33",
                "meta":{
                    "title":"\u83dc\u5355\u7ba1\u7406",
                    "icon":"icon-menu",
                    "keepAlive":true
                },
                "children":[

                ]
            }
        ],
        "power":[//权限标识
            "manage.menu.store",
            "manage.menu.update",
            "manage.menu",
            "manage.menu.destroy",
            "manage.menu.power"
        ]
    }
}
```