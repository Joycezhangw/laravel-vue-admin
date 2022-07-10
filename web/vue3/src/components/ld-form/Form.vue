<template>
  <el-form
    v-bind="{ ...$attrs, ...$props, ...getProps }"
    ref="formElRef"
    :model="formModel"
  >
    <el-row>
      <template v-for="schema in getSchema" :key="schema.field">
        <schema-form-item
          :schema="schema"
          :formProps="getProps"
          :formElRef="formElRef"
          :formModel="formModel"
          :setFormModel="setFormModel"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data"></slot>
          </template>
        </schema-form-item>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  unref,
  watch,
  onMounted,
} from "vue";
import { basicProps } from "./props";
import SchemaFormItem from "./components/SchemaFormItem";
import { useFormValues } from "./hooks/useFormValues";
import { useFormEvents } from "./hooks/useFormEvents";
import { deepMerge } from "@/landao/utils";
export default defineComponent({
  name: "ldForm",
  components: { SchemaFormItem },
  props: basicProps,
  emits: ["submit", "reset"],
  setup(props, { emit }) {
    const formElRef = ref(null); //表单ref
    const formModel = reactive({}); //表单model
    const propsRef = ref({}); //外部定义表单属性
    const defaultValueRef = ref({}); //表单配置定义的默认值
    const schemaRef = ref(null); //动态删除表单项

    //获取表单基础配置
    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    //处理表单配置和校验规则
    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || unref(getProps).schemas;
      const passRules = unref(getProps).rules;
      for (const schema of schemas) {
        const { field, rules = [] } = schema;
        // 处理表单校验规则
        if (passRules) {
          schema.rules = unref(getProps).rules[field] || rules;
        }
      }
      return schemas;
    });

    /**
     * 从schemas 提取，设置 表单 model 值，
     * 动态新增formModel
     */
    function setFormModel(key, value) {
      formModel[key] = value;
    }

    //表单初始化，根据 schema 设置 formModel
    const { initDefault, handleFormValues } = useFormValues({
      getSchema,
      formModel,
      defaultValueRef,
    });

    // 监听 getSchema 属性 初始化
    watch(
      () => {
        getSchema.value;
      },
      (schema) => {
        if (schema.length >= 0) {
          initDefault();
        }
      }
    );
    //向外暴露的表单事件
    const {
      resetFields,
      handleSubmit,
      validate,
      getFieldsValue,
      clearValidate,
      validateField,
      scrollToField,
      setFieldsValue,
      updateSchema
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      formElRef,
      schemaRef,
      defaultValueRef,
      handleFormValues,
    });

    //通过外部函数设置表单参数
    async function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }
    //向外暴露的表单事件
    const formActionType = {
      setProps,
      validate,
      resetFields,
      handleSubmit,
      getFieldsValue,
      clearValidate,
      validateField,
      scrollToField,
      setFieldsValue,
      updateSchema,
      
    };
    //初始表单
    onMounted(() => {
      initDefault();
    });
    return {
      formElRef,
      formModel,
      getProps,
      getSchema,
      setFormModel,
      ...formActionType,
    };
  },
});
</script>
