<script lang="jsx">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LdHelp",
  props: {
    content: {
      //提示内容
      type: String,
      default: "",
    },
    icon: {
      //图标名字，依赖 ld-icon 组件
      type: String,
      default: "icon-question",
    },
    iconSize: {
      //图标大小，依赖 ld-icon 组件
      type: [String, Number],
      default: "1em",
    },
    iconColor: {
      //图标颜色，依赖 ld-icon 组件
      type: String,
      default: "#606266",
    },
    placement: { type: String, default: "top" }, //	Tooltip 组件出现的位置
    rawContent: { type: Boolean, default: false }, //content 中的内容是否作为 HTML 字符串处理
    effect: { type: String, default: "dark" }, //Tooltip 主题，内置了 dark / light 两种
    popperClass: { type: String, default: "" }, //	为 Tooltip 的 popper 添加自定义类名
  },
  setup(props) {
    return () => {
      return (
        <el-tooltip
          content={props.content}
          placement={props.placement}
          raw-content={props.rawContent}
          effect={props.effect}
          popperClass={props.popperClass}
        >
          <icon-svg
            name={props.icon}
            size={props.iconSize}
            color={props.iconColor}
            class="schema-basic-help"
          ></icon-svg>
        </el-tooltip>
      );
    };
  },
});
</script>
<style lang="scss" scoped>
  .schema-basic-help {
    padding-left: 4px !important;
  }
</style>
