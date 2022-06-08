# useToggle
用于在两个状态值间切换的 Hook

## API

```javascript
const { 
  state, 
  toggle, 
  setLeft, 
  setRight 
} = useToggle(defaultValue)
const { 
   state, 
   toggle, 
   setDefault, 
   setRight 
} = useToggle(defaultValue, reverseValue)
```



## Params

| 参数         | 说明                     | 类型                                             | 默认值 |
| ------------ | ------------------------ | ------------------------------------------------ | ------ |
| defaultValue | 可选，传入的默认状态值   | string \| number \| boolean \| undefined \| null | false  |
| reverseValue | 可选，传入的取反的状态值 | string \| number \| boolean \| undefined \| null |        |



## Actions

该 Hook 返回以下函数：

| 函数名     | 说明                  | 类型                                                         |
| ---------- | --------------------- | ------------------------------------------------------------ |
| Toggle     | 触发状态更改的函数，接受传入 ``useToggle`` 的两个参数值修改状态 | ``(value) => void`` |
| setLeft |    重置回默认值      |       ``() => void ``     |
| setRight   |  设置为reverseValue         | ``() => void  ``           |



## Code

```vue
<template>
  <div>
    <p>Boolean 切换</p>
    <p>{{state}}</p>
    <button @click="toggle()">toggle</button>
    <button @click="setLeft">setLeft</button>
    <button @click="setRight">setRight</button>
  </div>
  <div>
    <p>任意两值直接切换</p>
    <p>{{stringState}}</p>
    <button @click="toggleString()">toggle</button>
    <button @click="toggleString('a')">toggle a</button>
    <button @click="toggleString('b')">toggle b</button>
    <button @click="setStringLeft">setLeft</button>
    <button @click="setStringRight">setRight</button>
  </div>
  
</template>

<script>
  import { useToggle } from "@/landao/hooks";
  export default {
    setup () {
      const {
        state,
        toggle,
        setLeft,
        setRight
      } = useToggle()

      const {
        state: stringState,
        toggle: toggleString,
        setLeft: setStringLeft,
        setRight: setStringRight
      } = useToggle('a', 'b')
      return {
        state,
        toggle,
        setLeft,
        setRight,

        stringState,
        toggleString,
        setStringLeft,
        setStringRight
      }
    }
  }
</script>
```

