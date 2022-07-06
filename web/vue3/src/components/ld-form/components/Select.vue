<template>
  <el-select v-bind="attrs">
    <el-option
      v-for="(item, index) in getOptions"
      :key="item.value + index"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>
<script>
import { defineComponent, computed } from "vue";
import VueTypes from "vue-types";
import { oneOf } from "vue-types";
import { isStringArray } from "@/landao/utils/is";

export default defineComponent({
  name: "Select",
  props: {
    options: VueTypes.array.def([]),
    size: oneOf(["", "large", "default", "small"]).def("default"), //用于控制该表单内组件的尺寸
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    const getOptions = computed(() => {
      const { options } = props;
      if (!options || options?.length === 0) return [];

      const isStringArr = isStringArray(options);
      if (!isStringArr) return options;
      return options.map((item) => ({ label: item, value: item }));
    });
    return {
      getOptions,
      attrs,
    };
  },
});
</script>
