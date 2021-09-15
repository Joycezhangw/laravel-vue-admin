<template>
  <div class="lv-dept-tree" v-loading="deptLoading">
    <div class="scroller">
      <el-tree
        ref="tree"
        :data="list"
        :props="{ label: 'dept_name' }"
        node-key="dept_id"
        highlight-current
        @node-click="selectRow"
      ></el-tree>
    </div>
  </div>
</template>
<script>
import deptApi from "@/api/dept";
import { deepTree } from "@/library/utils";
import { treeParentId } from "@/config/env";
export default {
  name: "deptTree",
  props: {
    value: [Number, String],
    formType: {
      type: String,
      default: "dept",
    },
  },
  watch: {
    value() {
      // 值更改，重新获取数据
      this.renderTree();
    },
  },
  data() {
    return {
      list: [],
      deptLoading: false,
    };
  },
  async mounted() {
    await this.getList();
  },
  methods: {
    async getList() {
      this.deptLoading = true;
      await deptApi
        .getList()
        .then((res) => {
          //如果是部门表单，追加一级部门选项
          if (this.formType === "dept") {
            res.data.unshift({
              dept_name: "一级部门",
              dept_id: treeParentId,
            });
          }
          //一维数组转树形数据
          this.list = deepTree(res.data, "dept_id", "parent_id", "dept_order");
          //设置默认选中状态，一定要再nextTick之后
          this.renderTree();
          this.deptLoading = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.deptLoading = false;
        });
    },
    refresh() {
      this.getList();
    },
    renderTree() {
      if (this.value != "") {
        this.$nextTick(() => {
          //选中当前节点
          this.$refs.tree.setCurrentKey(this.value);
          //展开所有父节点
          let selected = this.$refs.tree.getCurrentNode();
          if (
            this.$refs.tree.getNode(selected) &&
            this.$refs.tree.getNode(selected).parent
          ) {
            this.expandParents(this.$refs.tree.getNode(selected).parent);
          }
        });
      }
    },
    //选中事件
    selectRow(e) {
      this.$emit("input", e);
    },
    //展开所有父节点
    expandParents(node) {
      node.expanded = true;
      if (node.parent) {
        this.expandParents(node.parent);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.scroller {
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  border-radius: 3px;
  max-height: 200px;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 5px 0;
}
</style>