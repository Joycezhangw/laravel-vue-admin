# ``useBoolean``
---

优雅的管理 ``Boolean`` 状态的 ``Hook``




## API

```javascript
const {
  state,
  toggle,
  setTrue,
  setFalse
} = useBoolean(defaultValue)
```



## Params

| 参数         | 说明         | 类型    | 默认值 |
| ------------ | ------------ | ------- | ------ |
| defaultValue | 可选项，传入默认的状态值 | ``boolean`` | ``false``  |



## Methods

该 Hook 返回以下函数：

| 函数名   | 说明                     | 类型             |
| -------- | ------------------------ | ----------------- |
| toggle   |切换 state                | ``(next?: boolean) => void ``     |
| setTrue  | 设置为 true               | ``() => void``  |
| setFalse |设置为 false               |  ``() => void`` |


## Code

```vue
<template>
  <p>{{state}}</p>
  <button @click="toggle()">toggle</button>
  <button @click="setTrue">True</button>
  <button @click="setFalse">False</button>
</template>

<script>
import { useBoolean } from "@/landao/hooks";
export default {
  setup () {
    const { state, toggle,setTrue,setFalse} = useBoolean()
  }
  return {
    state,
    toggle,
    setTrue,
    setFalse
  }
}
</script>
```

