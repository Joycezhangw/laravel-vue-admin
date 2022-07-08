<template>
  <div class="menu-file">
    <el-select
      v-model="path"
      allow-create
      filterable
      clearable
      placeholder="请选择"
    >
      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "menuFile",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    //扫面文件
    function findFiles() {
      const files = import.meta.globEager("/**/views/**/*.{vue,tsx}");
      let list = [];
      const reg = /components|login|error/;
      for (const key in files) {
        if (!reg.test(key)) {
          list.push({
            value: key.substr(5),
          });
        }
      }
      return list;
    }
    //路径
    const path = ref(props.modelValue);
    //文件数据列表
    const list = ref(findFiles());

    watch(
      () => props.modelValue,
      (val) => (path.value = val || "")
    );

    watch(path, (val) => {
      emit("update:modelValue", val);
    });

    return {
      path,
      list,
    };
  },
});
</script>
<style lang="scss" scoped>
.menu-file {
  width: 100%;

  .el-select {
    width: 100%;
  }

  &__module {
    display: inline-flex;

    .label {
      width: 40px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>
