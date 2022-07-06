<script lang="jsx">
import { defineComponent, computed, unref } from "vue";
import { componentMap } from "../componentMap";
import { upperFirst, cloneDeep } from "lodash-es";
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

    //表单校验
    function handleRules() {
      const { rules: defRules = [], required, label, component } = props.schema;

      let rules = cloneDeep(defRules);

      //组件是否是input
      const isInput = component && ["Input"].includes(component);
      //如果是文本框，则设置 trigger 为 blur
      const ruleTrigger = isInput ? "blur" : "change";

      /**
       * 1.若设置了 required 属性，又没有其他的 rules，就创建一个验证规则；
       * 2.若设置了 required 属性，又设置了 rules，则在 rules 中部存在 required 属性时，才添加验证 required 的规则。
       *   rules 中的 required，优先级大于 required
       */
      if ((!rules || rules.length === 0) && required) {
        rules = [{ required, message: `${label}不为空`, trigger: ruleTrigger }];
      } else {
        //Reflect  反射。has 判断是否存在原型链上。 替代：Object.prototype.hasOwnProperty.call(myObject, 'foo')
        const requiredIndex = rules.findIndex((rule) =>
          Reflect.has(rule, "required")
        );

        if (requiredIndex === -1) {
          rules.push({
            required,
            message: `${label}不为空`,
            trigger: ruleTrigger,
          });
        }
      }
      //移除部希纳是的校验规则
      const requiredRuleIndex = rules.findIndex(
        (rule) =>
          Reflect.has(rule, "required") || Reflect.has(rule, "validator")
      );
      if (requiredRuleIndex !== -1) {
        const { isShow } = getShow();
        if (!isShow) {
          rules = [];
        }
      }
      return rules;
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
      const isCheck =
        component &&
        ["Switch", "Checkbox", "CheckboxGroup"].includes(component);
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

      //如果 "Switch", "Checkbox", "CheckboxGroup" 這些组件，需要重新赋值 formValues
      if (isCheck) {
        propsData.formValues = getValues.value;
      }

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
          rules={handleRules()}
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
