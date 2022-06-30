<template>
  <el-form
    v-bind="{ ...$attrs, ...$props, ...getProps }"
    ref="formElRef"
    :model="formModel"
  >
    <template v-for="schema in getSchema" :key="schema.field">
      <schema-form-item
        :schema="schema"
        :formElRef="formElRef"
        :formModel="formModel"
        :setFormModel="setFormModel"
      >
      </schema-form-item>
    </template>
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
import SchemaFormItem from "./components/schemaFormItem.vue";
import { useFormValues } from "./hooks/useFormValues";
export default defineComponent({
  name: "ldForm",
  components: { SchemaFormItem },
  props: basicProps,
  emits: ["submit", "reset"],
  setup(props, { emit }) {
    const formElRef = ref(null);
    const formModel = reactive({});
    const propsRef = ref({}); //外部定义表单属性

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    const getSchema = computed(() => {
      const schemas = unref(getProps).schemas;
      const passRules = unref(getProps).rules;
      for (const schema of schemas) {
        const { field, rules = [] } = schema;
        //处理表单校验规则
        if (passRules) {
          schema.rules = unref(getProps).rules[field] || rules;
        }
      }
      return schemas;
    });

    /**
     * 从schemas 提取，设置 表单 model 值，
     */
    function setFormModel(key, value) {
      formModel[key] = value;
    }

    const { initDefault } = useFormValues({ getSchema, formModel });

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
    onMounted(() => {
      initDefault();
    });
    return {
      formElRef,
      formModel,
      getProps,
      getSchema,
      setFormModel,
    };
  },
});
</script>
