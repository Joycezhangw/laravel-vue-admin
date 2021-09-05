<template>
  <svg :class="svgClass" :style="styleValue" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { isNumber } from "@/library/utils";
export default {
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
  data() {
    return {
      styleValue: {},
    };
  },
  computed: {
    iconName() {
      return `#${this.name}`;
    },
    svgClass() {
      return ["icon-svg", `icon-svg__${this.name}`, this.className];
    },
  },
  mounted() {
    this.styleValue = {
      fontSize: isNumber(this.size) ? `${this.size}px` : this.size,
    };
  },
};
</script>
<style>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

