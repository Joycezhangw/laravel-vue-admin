<template>
  <el-col v-bind="actionColAttr" v-if="showActionButtonGroup">
    <el-form-item>
      <div
        style="width: 100%"
        :style="{ textAlign: actionColAttr.style.textAlign }"
      >
        <el-button
          v-if="showResetButton"
          v-bind="resetBtnAttr"
          @click="resetAction"
        >
          {{ resetBtnAttr.label }}
        </el-button>
        <el-button
          type="primary"
          v-if="showSubmitButton"
          v-bind="submitBtnAttr"
          @click="submitAction"
        >
          {{ submitBtnAttr.label }}
        </el-button>
      </div>
    </el-form-item>
  </el-col>
</template>
<script>
import { computed, defineComponent } from "vue";
import VueTypes from "vue-types";
import { useFormContext } from "../hooks/useFormContext";

export default defineComponent({
  name: "FormAction",
  props: {
    showResetButton: VueTypes.bool.def(true),
    showSubmitButton: VueTypes.bool.def(true),
    showActionButtonGroup: VueTypes.bool.def(true),
    actionColOptions: VueTypes.object.def({}),
    resetButtonOptions: VueTypes.object.def({}),
    submitButtonOptions: VueTypes.object.def({}),
  },
  setup(props) {
    //el-col 配置
    const actionColAttr = computed(() => {
      const { actionColOptions } = props;
      const actionColOpt = {
        style: { textAlign: "right" },
        ...actionColOptions,
      };
      return actionColOpt;
    });

    //重置按钮配置
    const resetBtnAttr = computed(() => {
      return Object.assign({ label: "重 置" }, props.resetButtonOptions);
    });

    //提交按钮配置
    const submitBtnAttr = computed(() => {
      return Object.assign({ label: "提 交" }, props.submitButtonOptions);
    });

    return {
      actionColAttr,
      resetBtnAttr,
      submitBtnAttr,
      ...useFormContext(),
    };
  },
});
</script>
