# LdForm 表单组件

对 `element-plus` 的 form 组件进行封装，扩展一些常用的功能

## 用法

### template 方式

```vue
<template>
  <div class="ld-form">
    <ld-form label-position="right" label-width="150px" :schemas="schemas">
    </ld-form>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  components: { menuFile },
  setup() {
    const formRef = ref(null);

    const schemas = [
      {
        field: "menu_title",
        label: "菜单名称：",
        component: "Input",
        required: true,
        colProps: {
          span: 8,
        },
      },
    ];

    return {
      formRef,
      schemas,
    };
  },
});
</script>
```

## Props

::: tip 温馨提醒



:::

| 属性 | 类型 | 默认值 | 可选值 | 说明 | 版本 |
| --- | --- | --- | --- | --- | -- |
| schemas | `Schema[]` | - | - | 表单配置，见下方 `FormSchema` 配置 |  |
| labelPosition | `string` | - | `'right', 'left', 'top'` | 表单域标签的位置 |  |
| labelWidth | `number , string` | - | - | 扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用 |  |
| size | `string` | `default` | `'large', 'default', 'small'` | 向表单内所有组件传递 size 参数,自定义组件需自行实现 size 接收 |  |
| disabled | `boolean` | `false` | `'false', 'true'` | 向表单内所有组件传递 disabled 属性，自定义组件需自行实现 disabled 接收 |  |

### ColEx

见[element-plus(Layout 布局)](https://element-plus.org/zh-CN/component/layout.html#col-%E5%B1%9E%E6%80%A7)

### FormSchema

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| field | `string` | - | - | 字段名 |
| label | `string` | - | - | 标签名 |
| changeEvent | `string` | - | - | 表单更新事件名称 |
| labelWidth | `string , number` | - | - | 覆盖统一设置的 labelWidth |
| component | `string` | - | - | 组件类型，见下方 ComponentType |
| required | `boolean` | - | - | 简化 rules 配置，为 true 则转化成 [{required:true}] |
| colProps | `ColEx` | - | - | 参考上方 ColEx |
| componentProps | `any,()=>{}` | - | - | 所渲染的组件的 props |
| renderComponentContent | `()=>{}` | - | - | 自定义渲染组内部的 slot(见下文) |
| slot | `string` | - | - | 自定义 slot，渲染组件 |
| helpMessage | `string` | - | - | 标签右侧温馨提示 |
| helpComponentProps | `Object` | - | - | 标签名右侧温馨提示组件 `props`, 部分继承 `el-tootip` 属性,见下方 `HelpComponentProps` |
| ifShow | `boolean / ((renderCallbackParams) => boolean)` | `true` | - | 动态判断当前组件是否显示，js 控制，会删除 dom,见下方`renderCallbackParams` |
| show | `boolean / ((renderCallbackParams) => boolean)` | `true` | - | 动态判断当前组件是否显示，css 控制，不会删除 dom,见下方`renderCallbackParams` |

**componentProps**

- 当值为对象类型时,该对象将作为`component`所对应组件的的 props 传入组件.见[element-plus(Form 表单组件)](https://element-plus.org/zh-CN/component/input.html)

- 当值为一个函数时候

参数有 4 个

`schema`: 表单的整个 schemas

`formModel`: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作

```tsx
{
  // 简单例子，值改变的时候操作表格或者修改表单内其他元素的值
  component:'Input',
  componentProps: ({ schema,  formModel }) => {
    return {
      onChange:(e)=>{
      }
    };
  };
}
```

**renderComponentContent**

见[element-plus(input-插槽)](https://element-plus.org/zh-CN/component/input.html#input-%E6%8F%92%E6%A7%BD)

```tsx
{
  // 简单例子，组件内部slot
  component:'Input',
  renderComponentContent: () => {
    return {
        prefix: () => 'Search',
        append: () => ".com",
    };
}
```

**renderCallbackParams**
回调参数
```js
return {
        field: schema.field,//当前字段名
        model: formModel,//双向绑定
        values: {//双向绑定值
          ...formModel,
        },
        schema: schema,//配置参数
      };
```


**slot** 
自定义插槽渲染内容

```vue

<template>
 <div class="ld-form">
    <ld-form label-position="right" label-width="150px" :schemas="schemas">
        <!-- #slotName 或 v-slot:slotName -->
      <template #menuFileSlot="{ model, field, values }">
        <menu-file v-model="model[field]" />
      </template>
    </ld-form>
  </div>
</template>
<script>
  import { defineComponent } from 'compatible-vue';
  import menuFile from "@/views/system/components/menu-file";
  export default defineComponent({
    name: 'FormDemo',
     components: { menuFile },
    setup(props) {
      const schemas = [
      {
        field: "menu_component",
        label: "文件路径：",
        slot: "menuFileSlot",
      },
    ];

    return {
      schemas,
    };
    },
  });
</script>
```

**helpComponentProps**

见[element-plus(Tooltip 文字提示)](https://element-plus.gitee.io/zh-CN/component/tooltip.html#%E5%B1%9E%E6%80%A7)
```tsx
export default defineComponent({
  props: {
    icon: {
      //图标名字，依赖 ld-icon 组件
      type: String,
      default: "icon-question",
    },
    iconSize: {
      //图标大小，依赖 ld-icon 组件
      type: [String, Number],
      default: "1em",
    },
    iconColor: {
      //图标颜色，依赖 ld-icon 组件
      type: String,
      default: "#606266",
    },
    placement: { type: String, default: "top" }, //	Tooltip 组件出现的位置
    rawContent: { type: Boolean, default: false }, //content 中的内容是否作为 HTML 字符串处理
    effect: { type: String, default: "dark" }, //Tooltip 主题，内置了 dark / light 两种
    popperClass: { type: String, default: "" }, //	为 Tooltip 的 popper 添加自定义类名
  },
});
```

**ComponentType**

schema 内组件的可选类型

```tsx
export type ComponentType =
  | 'Input'
  | 'Switch'
  | 'Radio'
  | 'RadioGroup'
  | 'InputNumber'
  | 'Rate'
  | 'Cascader'
  | 'Checkbox'
  | 'DatePicker'
  | 'TimeSelect'
  | 'TimePicker'
  | 'ApiSelect'
```

## ApiSelect 组件

远程下拉加载组件，其他`componentProps`可参见`el-select`配置

注意：

- 组件内会将数据转换成`{label:labelField,value:valueField,disabled:disabledField}`
- 若返回的值是`['manage.passport.captcha', 'manage.passport.login']` 组件依然转换成：`{label:value,value:value,disabled:false}`

### 使用

```js
const schemas = [
 {
    field: "api_path",
    label: "权限标识",
    required: true,
    component: "ApiSelect",
    defaultValue: "",
    componentProps: {
      placeholder: "请选择权限标识",
      api: MenuService.getPower,
      immediate: true,
      filterable: true,
    },
 }
];
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| api | `()=>{}` | - | 数据接口，接受一个 Promise 对象 |
| params | `object` | - | 接口参数。此属性改变时会自动重新加载接口数据 |
| labelField | `string` | `label` | 下拉数组项内`label`显示文本的字段|
| valueField | `string` | `value` | 下拉数组项内`value`实际值的字段 |
| disabledField | `boolean` | `disabled` | 下拉数组项内`disabled`实际值的字段 |
| immediate | `boolean` | `true` | 是否立即请求接口，否则将在第一次点击时候触发请求 |