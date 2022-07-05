<template>
  <el-checkbox-group v-model="state" v-bind="attrs">
    <el-checkbox
      v-for="item in getOptions"
      :label="item.value"
      :key="item.value"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
import { defineComponent, computed, watch } from "vue";
import VueTypes from "vue-types";
import { oneOf } from "vue-types";
import { isStringArray } from "@/landao/utils/is";
import { useRuleFormItem } from "../hooks/useRuleFormItem";
import { useAttrs } from "../hooks/useAttrs";

export default defineComponent({
  name: "CheckboxGroup",
  props: {
    value: VueTypes.array.def([]),
    field: VueTypes.string.def(""),
    options: VueTypes.array.def([]),
    type: VueTypes.string.def(""),
    border: VueTypes.bool.def(false),
    size: oneOf(["", "large", "default", "small"]).def("default"), //用于控制该表单内组件的尺寸
    formValues: {
      type: Object,
      default: () => {},
    },
  },
  inheritAttrs: false,
  setup(props) {
    const attrs = useAttrs({ excludeKeys: ["modelValue"] });
    // 嵌入到表单中，只需使用钩子绑定来执行表单验证
    const [state, setState] = useRuleFormItem(props);

    const { model, field } = props.formValues;

    //排除初始化值不在选项组内
    const initState = computed(() => {
      const { formValues, options } = props;

      if (!formValues.schema.defaultValue) return;
      let opt = [],
        def = formValues.schema.defaultValue,
        isStringArr = isStringArray(options);
      if (isStringArr) {
        opt = options;
      } else {
        options.forEach((item) => {
          opt.push(item.value);
        });
      }
      for (let val of def) {
        if (!opt.includes(val)) return [];
      }
      return def;
    });

    watch(
      () => model[field],
      (val) => {
        setState(val || initState.value);
      }
    );

    if (initState.value && Array.isArray(initState.value)) {
      setState(initState.value);
    }

    const getOptions = computed(() => {
      const { options } = props;
      if (!options || options?.length === 0) return [];

      const isStringArr = isStringArray(options);
      if (!isStringArr) return options;
      return options.map((item) => ({ label: item, value: item }));
    });
    return {
      getOptions,
      state,
      attrs,
    };
  },
});
</script>
