<script lang="jsx">
import { defineComponent, computed, unref } from "vue";
import { componentMap } from "../componentMap";
import { upperFirst } from "lodash-es";
import { isFunction, isBoolean } from "@/landao/utils/is";
import { createPlaceholderMessage, getSlot } from "../helper";

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
    //定义回调值，包含 slot 、 ifShow 等等
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

    //获取 schema 是否显示
    function getShow() {
      const { ifShow, show } = props.schema;
      let isIfShow = true;
      let isShow = true;
      //如果传入的的 boolean
      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isBoolean(show)) {
        isShow = isShow;
      }
      //如果传入的是function
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues));
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues));
      }
      return { isIfShow, isShow };
    }

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

    //渲染标签右边温馨提示
    function renderLabelHelpMessage() {
      const { label, helpMessage, helpComponentProps } = props.schema;
      if (!helpMessage) return label;
      return (
        <>
          {label}
          <ld-help content={helpMessage} {...helpComponentProps}></ld-help>
        </>
      );
    }

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
      const { field, labelWidth, slot } = props.schema;

      //获取组件内容
      const getContent = () => {
        //自定义插槽存在，则渲染插槽组件。否则渲染内置组件
        return slot
          ? getSlot(slots, slot, unref(getValues))
          : renderFormItemComponent();
      };

      return (
        <el-form-item
          v-slots={{ label: () => renderLabelHelpMessage() }} //Form Item label插槽
          prop={field}
          labelWidth={labelWidth}
        >
          {getContent()}
        </el-form-item>
      );
    }

    return () => {
      const { colProps = {} } = props.schema;

      //判断组件是否显示隐藏
      const { isIfShow, isShow } = getShow();

      const getContent = () => {
        return renderFormItem();
      };
      return (
        isIfShow && (
          <el-col {...colProps} v-show={isShow}>
            {getContent()}
          </el-col>
        )
      );
    };
  },
});
</script>
