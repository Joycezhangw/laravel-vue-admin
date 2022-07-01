<script lang="tsx">
import { defineComponent } from "vue";
import { componentMap } from "../componentMap";
import { upperFirst } from "lodash-es";

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
      /**
       * component 组件类型，见 ../componentMap
       * changeEvent 控件事件
       * field 字段名
       * label 标签名
       */
      const { component, changeEvent = "change", field } = props.schema;

      const isInput = component && ["Input"].includes(component);
      const Comp = componentMap.get(component);

      //设置监听事件
      const eventKey = isInput ? "onInput" : `on${upperFirst(changeEvent)}`;

      //执行事件
      const on = {
        [eventKey]: (event) => {
          const target = event ? event.target : null;
          const value = target ? target.value : event;
          //设置 FormModel
          props.setFormModel(field, value);
        },
      };

      //绑定model
      const bindValue = {
        ["modelValue"]: props.formModel[field],
      };

      //组件props v-bind
      const compAttr = {
        ...bindValue,
        ...on,
      };
      //返回组件
      return <Comp {...compAttr}></Comp>;
    }

    //渲染组件
    function renderFormItem() {
      const { field, label, labelWidth } = props.schema;

      //获取组件内容
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
      const { colProps = {} } = props.schema;
      const getContent = () => {
        return renderFormItem();
      };
      return <el-col {...colProps}> {getContent()}</el-col>;
    };
  },
});
</script>
