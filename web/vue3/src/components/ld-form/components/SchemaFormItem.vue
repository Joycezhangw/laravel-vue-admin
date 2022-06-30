<script lang="tsx">
import { defineComponent } from "vue";
import { componentMap } from "../componentMap";

export default defineComponent({
  name: "SchemaFormItem",
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
    formModel: {
      type: Object,
      default: () => {},
    },
    formElRef: {
      type: Object,
    },
    setFormModel: {
      type: Function,
      default: null,
    },
  },
  inheritAttrs: false,
  setup(props, { slots }) {
    //渲染 form-item 内容
    function renderFormItemComponent() {
      //field 字段名
      //label 标签名
      //component 组件类型，见 ../componentMap
      //labelWidth el-form 设置 labelWidth
      const { component, field } = props.schema;

      const isInput = component && ["Input"].includes(component);
      const Comp = componentMap.get(component);

      //绑定model
      const bindValue = {
        ["modelValue"]: props.formModel[field],
      };

      const compAttr = {
        ...bindValue,
      };

      return <Comp {...compAttr}></Comp>;
    }

    //渲染组件
    function renderFormItem() {
      const { field, label, labelWidth } = props.schema;

      const getContent = () => {
        return renderFormItemComponent();
      };

      return (
        <el-form-item label={label} prop={field} labelWidth={labelWidth}>
          {getContent()}
        </el-form-item>
      );
    }

    return () => {
      const { customrComponent } = props.schema;
      const getContent = () => {
        return customrComponent ? customrComponent() : renderFormItem();
      };
      return getContent();
    };
  },
});
</script>
