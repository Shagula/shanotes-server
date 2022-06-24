### 0. 简表

| 接口名        | 方法 | 进度  |
| ------------- | ---- | ----- |
| create_folder | post | OK    |
| create_notes  | post | OK    |
| del_link      | post | OK    |
| update_link   | post | OK    |
| read_link     | get  | OK    |
| rename_link   | post | to-do |

### 1. 创建文件夹
1. url: `/notes/create_folder`
2. method: post 
3. parameter

| parameter | type   | remark                                  |
| --------- | ------ | --------------------------------------- |
| parent    | int    | the folder parent, 0 as the root folder |
| title     | string | the folder name                         |

4. return
```json
{
    "meta": {
        "status": 200,
        "message": "okay"
    }
}
```

### 2. 创建笔记
1. url: `/notes/create_note`
2. method: post
3. parameter

| parameter | type   | remark                              |
| --------- | ------ | ----------------------------------- |
| parent    | int    | the note parent, 0 as the root note |
| title     | string | the note name                       |

4. return
```json
{
    "meta": {
        "status": 200,
        "message": "okay"
    }
}
```
### 3. 删除笔记/文件夹
1. url: `/notes/del_link`
2. method: post
3. parameter
4. warning: the user can only delete his/her own file/folder, or he/she will get 400 status.


| parameter | type | remark                     |
| --------- | ---- | -------------------------- |
| path_id   | int  | the id of the notes/folder |

4. return
```json
{
    "meta": {
        "status": 200,
        "message": "okay"
    }
}
```

### 4. 修改笔记/文件夹内容
1. url: `/notes/update_link`
2. method: post
3. parameter
4. warning: the user can only edit his/her own file/folder, or he/she will get 400 status.

| parameter | type   | remark          |
| --------- | ------ | --------------- |
| path_id   | int    | path id         |
| content   | string | the new content |

4. return 

```json
{
    "meta": {
        "status": 200,
        "message": "更新成功"
    }
}
```

### 5. 查看笔记/文件夹内容
1. url: `/notes/read_link`
2. method: get
3. parameter

| parameter | type | remark             |
| --------- | ---- | ------------------ |
| path_id   | int  | the id of the path |

4. return
```json
{
    "content": {
        "id": 23,
        "parent": 17,
        "link_type": 2,
        "title": "求导",
        "content": "求导是一门技术活",
        "author": 2,
        "create_time": "2022-06-19 23:54:33",
        "update_time": "2022-06-20 00:04:23"
    },
    "meta": {
        "status": 200,
        "message": "okay"
    }
}
```

### 6. 查看文件夹内容
1. url: `/notes/read_child`
2. method: post 
3. parameter

| parameter | type   | remark                                  |
| --------- | ------ | --------------------------------------- |
|path_id    | int    | the id of a folder|

4. return 

```json
{
    "value": [
        {
            "id": 8,
            "link_type": 1,
            "title": "Goodmain.md",
            "create_time": "2022-06-23 23:34:29",
            "update_time": "2022-06-23 23:34:29"
        }
    ],
    "meta": {
        "status": 200,
        "message": "okay"
    }
}
```
