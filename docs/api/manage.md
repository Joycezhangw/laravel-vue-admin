## 后台用户管理

> 用户列表

```
GET:/manage/v1/user

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
            "total": 1,
            "page_size": 20,
            "current_page": 1
        },
        "list": [
            {
                "manage_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "username": "peadmin",
                "nickname": "超级管理员",
                "realname": "超级管理员",
                "phone": "136****2056",
                "avatar": "",
                "introduce": "",
                "is_super": 1,
                "reg_date": "2021-08-30 02:52:14",
                "reg_ip": "127.0.0.1",
                "refresh_ip": "172.0.0.1",
                "last_login_ip": "172.0.0.1",
                "last_login_time": "2021-09-14 08:52:55",
                "manage_status": 1,
                "updated_at": "2021-09-14 08:52:55",
                "refresh_time": "2021-09-14 08:52:55",
                "department": {//部门
                    "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                    "dept_name": "研发部"
                },
                "roles": [//角色
                    {
                        "role_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                        "role_name": "超级管理员"
                    }
                ]
            }
        ]
    }
}
```

> 用户详情

```
POST:/manage/v1/user/read/{manageId}


Response:{
    "code": 200,
    "message": "success",
    "data": {
        "manage_id": "Jezj8Ey7bgRoG2WYBZxW9KB56AOYda4X",
        "dept_id": "maAeB3dJ9DRoNqoA6ok5PGwvElrOnLKV",
        "username": "testuser",
        "nickname": "测试人员",
        "realname": "测试人员",
        "phone": "",
        "avatar": "",
        "introduce": "",
        "is_super": 0,
        "reg_date": "2021-09-15 07:14:53",
        "reg_ip": "127.0.0.1",
        "refresh_ip": "172.0.0.1",
        "last_login_ip": "172.0.0.1",
        "last_login_time": "2021-09-15 08:10:09",
        "manage_status": 1,
        "updated_at": "2021-09-15 08:54:49",
        "refresh_time": "2021-09-15 08:54:49",
        "roles": [
            {
                "role_id": "rJyEv6GloKp412bwjQkjOVXzdgQb8B7n",
                "role_name": "测试角色"
            },
            {
                "role_id": "dGwzpanX3VB0Px3mGR2JQNg4Zj59K7bM",
                "role_name": "开发人员"
            }
        ],
        "department": {
            "dept_id": "maAeB3dJ9DRoNqoA6ok5PGwvElrOnLKV",
            "dept_name": "测试部门"
        },
        "manage_status_txt": "启用"
    }
}



> 新建用户

```
POST:/manage/v1/user/store

Request-params:{
    "dept_id": "",
    "username": "",
    "realname": "",
    "nickname": "",
    "manage_status": 1,
    "phone": "",
    "introduce": "",
    "roles": ["rJyEv6GloKp412bwjQkjOVXzdgQb8B7n","dGwzpanX3VB0Px3mGR2JQNg4Zj59K7bM"],
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 更新用户

```
PUT:/manage/v1/user/update/{manageId}

Request-params:{
    "dept_id": "",
    "username": "",
    "realname": "",
    "nickname": "",
    "manage_status": 1,
    "phone": "",
    "introduce": "",
    "roles": ["rJyEv6GloKp412bwjQkjOVXzdgQb8B7n","dGwzpanX3VB0Px3mGR2JQNg4Zj59K7bM"],
}

Response:{
    "code": 200,
    "message": "更新成功",
}
```

> 删除用户

删除用户同时删除关联角色中间表数据

```
DELETE:/manage/v1/user/delete/{roleId}

Response:{
    "code": 200,
    "message": "删除成功",
}
```
