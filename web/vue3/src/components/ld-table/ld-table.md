# ld-table 表格数据展示


### 引入

已全局 引入

```js
import ldTable from "@/components/ld-table"
export default {
		components: {
			ldTable
		}
	}
```

## 代码演示

### 基础用法

```html
<ld-table
      ref="logTableRef"
      :service-api="serviceApi"
      :table-config="tableConfig"
      :filter-data="filterData"
      :is-pagination="true"
    >
      <template #toolbar>
      <el-button type="primary" >新增</el-button>
    </template>
      <template #filter>
        <el-form-item prop="search_text">
          <el-input
            class="ld-search-key__input"
            v-model="filterData.search_text"
            placeholder="请输入用户名称"
            clearable
            size="small"
          />
        </el-form-item>
      </template>
      <template v-slot:operatorSlot="{ scopeData }">
        <el-button type="danger" size="small" @click="handleDel(scopeData.row)"
          >删除</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleEdit(scopeData.row)"
          >编辑</el-button
        >
      </template>
    </ld-table>
```
### slot 说明

#### 表格顶部左边工具条 `#toolbar`

顶部有一个固定`刷新`按钮，刷新数据，刷新按钮会重置页码为第一条，且重置搜索表单为初始值
```html
<template #toolbar> </template>
```
#### 表格顶部右边搜索表达那 `#filter`

此处没有定义 `#filter` 右上角就没有搜索表达那，已在组件内部预设搜索按钮和`el-form`
注意 `<el-form-item/>` 要设置 `prop`,否则刷新数据，无法重置表单为初始值
```html
<template #filter> </template>
```

#### 表格自定义 `v-slot:operatorSlot="{ scopeData }"`
此处需要`tableConfig.columns`配合使用，需要在 `columns`中设置 ` customSlot: "operatorSlot",`
`scopeData` 该行数据
```html
 <template v-slot:operatorSlot="{ scopeData }">
        <el-button type="danger" size="small" @click="handleDel(scopeData.row)"
          >删除</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleEdit(scopeData.row)"
          >编辑</el-button
        >
      </template>
```



## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| service-api | api请求接口 | *Function* | 必传 | - |
| table-config | 表格配置参数 | *Object* | 必传 | - |
| filter-data | 搜索条件表单 | *Object* | 非必传`{}` | - |
| is-pagination | 是否开启分页 | *Boolean* | `true` | - |

### `filter-data` 表单 `v-model`

```javascript
 const filterData = reactive({ search_text: "" });
```
### `table-config` 表格配置

```javascript
const tableConfig = {
      attrs: {
        rowKey: "log_id", //表格索引
        size: "small", //表格和搜索表单尺寸
      },
      formatData: deepTree, //格式化数据，一维数组转树形数组。若无需格式化数据源，此配置无需填写
      columns: [
        {//此配置为表格有序索引值，会根据分页和总条数累加有序数字值，不获取数据源数据。type 必须设置为“index”
          title: "#",
          width: 200,
          align: "center",
          fixed: "left",//固定列，默认不设置固定列
          type: "index",
        },
        {
          title: "用户名",//名称
          width: 200,//宽度，默认没有宽度
          align: "center",//居中，默认 居左
          key: "manage_username",//数据源key
        },
        {
          title: "请求地址",
          width: 200,
          align: "center",
          key: "log_action",
        },
        {
          title: "请求参数",
          width: 200,
          align: "center",
          key: "log_params",
        },
        {
          title: "请求IP",
          width: 200,
          align: "center",
          key: "log_ip",
        },
        {
          title: "创建时间",
          width: 150,
          align: "center",
          key: "created_at",
        },
        {
          title: "操作",
          width: 200,
          fixed: "right",
          align: "center",
          customSlot: "operatorSlot",//自定义 slot
        },
      ],
    };
```




