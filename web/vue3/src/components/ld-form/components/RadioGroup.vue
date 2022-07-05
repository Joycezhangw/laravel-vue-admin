<script lang="jsx">
import { defineComponent, computed } from "vue";
import VueTypes, { oneOf } from "vue-types";
import { isStringArray } from "@/landao/utils/is";
import { useAttrs } from "../hooks/useAttrs";
import { useRuleFormItem } from "../hooks/useRuleFormItem";

export default defineComponent({
  name: "RadioGroup",
  props: {
    value: {
      type: String,
    },
    type: VueTypes.string.def(""),
    border: VueTypes.bool.def(false),
    size: oneOf(["", "large", "default", "small"]).def("default"), //用于控制该表单内组件的尺寸
    options: VueTypes.array.def([]),
  },
  setup(props) {
    const attrs = useAttrs();
    const [state] = useRuleFormItem(props);

    //获取 Radio 预设值选项
    const getOptions = computed(() => {
      const { options } = props;
      if (!options || options?.length === 0) return [];
      const isStringArr = isStringArray(options);
      if (!isStringArr) return options;
      return options.map((item) => ({ label: item, value: item }));
    });

    const compAttr = {
      ...attrs,
      modelValue: state,
    };

    function getContent() {
      const { type, border, size } = props;
      return getOptions.value.map((item) => {
        return type === "button" ? (
          <el-radio-button size={size} label={item.value}>
            {item.label}
          </el-radio-button>
        ) : (
          <el-radio border={border} size={size} label={item.value}>
            {item.label}
          </el-radio>
        );
      });
    }

    return () => {
      return <el-radio-group {...compAttr}>{getContent()}</el-radio-group>;
    };
  },
});
</script>
