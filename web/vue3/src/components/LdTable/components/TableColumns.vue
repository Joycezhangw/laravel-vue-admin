<script lang="jsx">
import { ElTableColumn } from "element-plus";
import { createVNode, defineComponent } from "vue";
import VueTypes from "vue-types";
import { omit } from "lodash-es";

export default defineComponent({
  name: "TableColumns",
  props: {
    column: VueTypes.object.isRequired,
  },
  setup(props, { slots }) {
    return () => {
      const { type = "" } = props.column;
      const attrs = {
        ...props.column,
        ...{ reserveSelection: type === "selection" },
      };
      //omit 排除掉不需要的属性
      return createVNode(ElTableColumn, omit(attrs, ["slot"]), slots.default);
    };
  },
});
</script>
