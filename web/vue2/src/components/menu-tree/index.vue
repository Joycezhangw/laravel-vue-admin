<template>
  <div class="lv-menu-tree">
    <el-popover
      ref="popover"
      placement="bottom-start"
      trigger="click"
      popper-class="popper-menu-tree"
    >
      <el-input size="small" v-model="filterValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-tree
        ref="tree"
        :node-key="nodeKey"
        :data="treeList"
        :props="props"
        :highlight-current="true"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="filterNode"
        @current-change="currentChange"
      >
      </el-tree>
    </el-popover>
    <el-input
      v-model="name"
      v-popover:popover
      readonly
      placeholder="请选择"
    ></el-input>
  </div>
</template>
<script>
import { deepTree } from "@/library/utils";
import { treeParentId } from "@/config/env";
export default {
  name: "menu-tree",
  props: {
    value: [Number, String],
    menuList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    nodeKey: {
      type: String,
      default: "menuId",
    },
  },
  data() {
    return {
      filterValue: "",
      props: {
        label: "title",
        children: "children",
      },
      expandedKeys: [],
    };
  },
  watch: {
    filterValue(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed: {
    name() {
      const item = this.menuList.find(
        (item) => item[this.nodeKey] == this.value
      );
      return item ? item.title : "一级菜单";
    },
    treeList() {
      this.menuList.unshift({
        title: "一级菜单",
        menuId: treeParentId,
      });
      return deepTree(this.menuList);
    },
  },
  methods: {
    currentChange({ menuId }) {
      this.$emit("input", menuId);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
  },
};
</script>
<style lang="scss" scoped>
.popper-menu-tree {
  width: 480px;
  box-sizing: border-box;

  .el-input {
    margin-bottom: 10px;
  }
}
</style>