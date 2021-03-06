## 部门管理

> 部门列表

```
GET:/manage/v1/dept

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "success",
    "data": [
        {
            "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
            "parent_id": "3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r",
            "dept_name": "研发部",
            "dept_order": 0,
            "dept_desc": "研发部门，超管所在",
            "created_at": "2021-08-30 02:52:14",
            "updated_at": "2021-08-30 02:52:14"
        }
    ]
}
```

> 部门详情

```
POST:/manage/v1/dept/read/{deptId}

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "success",
    "data": {
        "dept_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
        "parent_id": "3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r",
        "dept_name": "研发部",
        "dept_order": 0,
        "dept_desc": "研发部门，超管所在",
        "created_at": "2021-08-30 02:52:14",
        "updated_at": "2021-08-30 02:52:14"
    }
}
```

> 新建部门

```
POST:/manage/v1/dept/store

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Request-params:{
    dept_name: "",//部门名称
    dept_desc: "",//备注
    parent_id: "",//上级部门(加密后)
    dept_order: 0,//排序
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 更新部门

```
PUT:/manage/v1/dept/update/{id}

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Request-params:{
    dept_name: "",//部门名称
    dept_desc: "",//备注
    parent_id: "",//上级部门(加密后)
    dept_order: 0,//排序
}

Response:{
    "code": 200,
    "message": "新建成功",
}
```

> 删除部门

```
DELETE:/manage/v1/dept/delete/{id}

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "删除成功",
}
```