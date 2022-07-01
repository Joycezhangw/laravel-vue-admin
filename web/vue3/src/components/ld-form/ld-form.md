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
```