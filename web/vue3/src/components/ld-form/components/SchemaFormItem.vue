<script lang="tsx">
import { defineComponent, computed, unref } from "vue";
import { componentMap } from "../componentMap";
import { upperFirst } from "lodash-es";
import { isFunction } from "@/landao/utils/is";
import { createPlaceholderMessage } from "../helper";

export default defineComponent({
  name: "SchemaFormItem",
  props: {
    schema: {
      type: Object,
      default: () => {},
    },
    formProps: {
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
    const getValues = computed(() => {
      const { formModel, schema } = props;
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...formModel,
        },
        schema: schema,
      };
    });

    //获取组件 props
    const getComponentsProps = computed(() => {
      const { schema, formModel } = props;
      const { componentProps = {} } = schema;
      if (!isFunction(componentProps)) {
        //不是函数,直接返回配置
        return componentProps;
      }
      //渲染函数
      return componentProps({ schema, formModel });
    });

    //获取组件 disabled 属性
    const getDisabled = computed(() => {
      //表单级别的 disabled 属性，
      const { disabled: globDisabled } = props.formProps;
      //组件级别的 disabled 属性
      const { disabled: itemDisabled } = unref(getComponentsProps);
      //表单级别 高于 组件级别的 disabled
      let disabled = !!globDisabled || !!itemDisabled;
      return disabled;
    });

    //渲染 form-item 内容
    function renderFormItemComponent() {
      /**
       * component 组件类型，见 ../componentMap
       * changeEvent 控件事件
       * field 字段名
       * label 标签名
       */
      const {
        component,
        changeEvent = "change",
        field,
        renderComponentContent,
      } = props.schema;

      //组件是否是input
      const isInput = component && ["Input"].includes(component);
      //获取组件对应的VNode
      const Comp = componentMap.get(component);
      //组件props
      const propsData = {
        ...unref(getComponentsProps),
        disabled: unref(getDisabled),
      };

      //组件 placeholder
      let placeholder =
        unref(getComponentsProps).placeholder ||
        createPlaceholderMessage(component);
      propsData.placeholder = placeholder;

      //设置监听事件
      const eventKey = isInput ? "onInput" : `on${upperFirst(changeEvent)}`;

      //执行事件
      const on = {
        [eventKey]: (event) => {
          if (propsData[eventKey]) {
            //执行组件定义函数
            propsData[eventKey](event);
          }
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
        ...propsData,
      };
      
      //如果没有设定组件插槽
      if (!renderComponentContent) {
        //返回组件
        return <Comp {...compAttr}></Comp>;
      }
      //Input 插槽
      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : { default: () => renderComponentContent };
      return <Comp {...compAttr}>{compSlot}</Comp>;
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
