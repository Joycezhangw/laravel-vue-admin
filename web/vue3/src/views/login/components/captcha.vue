<template>
  <div class="captcha" @click="refresh" v-loading="loading">
    <img class="img" :src="base64" alt="更新验证码" />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRequest } from "@/landao/hooks";
import { PassportService } from "@/service";
export default defineComponent({
  name: "Captcha",
  emits: ["update:modelValue", "change"],
  setup(_, { emit }) {
    const base64 = ref("");
    const { loading, run: refresh } = useRequest(PassportService.captcha, {
      onSuccess(res) {
        const { captcha, captcha_uniqid } = res;
        base64.value = captcha;
        emit("update:modelValue", captcha_uniqid);
        emit("change", { captcha, captcha_uniqid });
      },
    });
    return {
      refresh,
      base64,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
.captcha {
  width: 120px;
  height: 40px;
  margin-left: 3px;
  float: right !important;
  background: #ccc;
  cursor: pointer;
  .img {
    width: 100%;
    height: 100%;
  }
  .svg {
    height: 100%;
    width: 100%;
    position: relative;
  }
}
</style>
