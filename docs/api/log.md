## 请求日志管理

> 后台日志列表

```
GET:/manage/v1/log

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "success",
    "data": {
        "pagination": {
            "total": 2717,
            "page_size": 20,
            "current_page": 1
        },
        "list": [
            {
                "log_id": "vAVW6GD58Kyg7qmL5axeaYEbp9o13MBr",
                "manage_id": "6vZjodnGwmEPMkarjlxlJXz5yW30Db4O",
                "manage_username": "peadmin",
                "log_method": "GET",
                "log_action": "http://www.laravelvue.com/manage/v1/log",
                "log_params": "[]",
                "log_ip": "172.0.0.1",
                "log_ip_addr": "",
                "useragent": "PostmanRuntime/7.26.8",
                "created_at": "2021-09-17 14:55:49",
                "updated_at": "2021-09-17T14:55:49.000000Z"
            }
        ]
    }
}
```

> 删除日志

```
DELETE:/manage/v1/log/delete/{LogId}

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "删除成功",
}
```