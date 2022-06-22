<template>
  <svg :class="svgClass" :style="style" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
//Vue3+vite+ts 中使用svg-icon https://juejin.cn/post/6992600484217356301
//在vue3+vite项目中使用svg https://segmentfault.com/a/1190000039255368
import { computed, defineComponent, ref } from "vue";
import { isNumber } from "lodash";

export default defineComponent({
  name: "icon-svg",
  props: {
    name: {
      type: String,
    },
    className: {
      type: String,
    },
    size: {
      type: [String, Number],
    },
  },
  setup(props) {
    console.log(props);
    const style = ref({
      fontSize: isNumber(props.size) ? props.size + "px" : props.size,
    });
    const iconName = computed(() => `#icon-${props.name}`);
    const svgClass = computed(() => {
      return [
        "icon-svg",
        `icon-svg__${props.name}`,
        String(props.className || ""),
      ];
    });
    return {
      style,
      iconName,
      svgClass,
    };
  },
});
</script>
<style scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
