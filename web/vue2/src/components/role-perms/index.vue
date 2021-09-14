<template>
  <div class="lv-role-perms" v-loading="loading">
    <p v-if="title">{{ title }}</p>

    <el-input placeholder="输入关键字进行过滤" v-model="keyword" size="small">
    </el-input>

    <div class="scroller">
      <el-tree
        :data="list"
        :props="props"
        :default-checked-keys="checked"
        :filter-node-method="filterNode"
        highlight-current
        :node-key="nodeKey"
        show-checkbox
        ref="tree"
        @check-change="save"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
import menuApi from "@/api/menu";
import { deepTree } from "@/library/utils";
export default {
  name: "rolePerms",
  props: {
    value: Array,
    title: String,
    nodeKey: {
      type: String,
      default: "menuId",
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      checked: [],
      keyword: "",
      props: {
        label: "title",
        children: "children",
      },
    };
  },
  watch: {
    keyword(val) {
      this.$refs["tree"].filter(val);
    },
    value(val) {
      this.refreshTree(val);
    },
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refreshTree(val) {
      if (!val) {
        this.checked = [];
      }
      let ids = [];
      let fn = (list) => {
        list.forEach((item) => {
          if (item.children.length > 0) {
            fn(item.children);
          } else {
            ids.push(item[this.nodeKey]);
          }
        });
      };
      fn(this.list);
      this.checked = ids.filter((id) => (val || []).find((e) => e == id));
    },
    refresh() {
      menuApi
        .getList()
        .then((res) => {
          this.list = deepTree(res.data);
          this.refreshTree(this.value);
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    filterNode(val, data) {
      if (!val) return true;
      return data.title.includes(val);
    },
    save() {
      const tree = this.$refs["tree"];
      //选中节点
      const checked = tree.getCheckedKeys();
      //半选中的节点
      const halfChecked = tree.getHalfCheckedKeys();
      this.$emit("input", [...checked, ...halfChecked]);
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