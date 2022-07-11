<template>
  <div class="role-perms">
    <el-input v-model="keyword" placeholder="请输入关键字进行过滤"></el-input>
    <div class="scroller">
      <el-tree
        :data="menuList"
        ref="treeRef"
        highlight-current
        show-checkbox
        nodeKey="menuId"
        :props="{
          label: 'title',
          children: 'children',
        }"
        :default-checked-keys="checked"
        :filter-node-method="filterNode"
        @check-change="save"
      ></el-tree>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, unref, onMounted, watch } from "vue";
import { MenuService } from "@/service";
import { deepTree } from "@/landao/utils";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "RolePerms",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    //搜索关键字
    const keyword = ref("");
    //el-tree 组件
    const treeRef = ref({});
    //菜单数据列表
    const menuList = ref([]);
    //已选中
    const checked = ref([]);

    //刷新树
    const refreshTree = (val = []) => {
      if (!val) {
        checked.value = [];
      }
      let ids = [];
      function fn(list) {
        list.forEach((ele) => {
          if (ele.children) {
            fn(ele.children);
          } else {
            ids.push(Number(ele.menuId));
          }
        });
      }
      fn(unref(menuList));
      checked.value = ids.filter((menuId) => (val || []).includes(menuId));
    };

    //刷新列表
    const refresh = async () => {
      await MenuService.getList()
        .then((res) => {
          menuList.value = deepTree(res.data);
          refreshTree(props.modelValue);
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    };
    //搜索过滤节点
    const filterNode = (val, data) => {
      if (!val) return true;
        return data.title.includes(val);
    };

    //复选框点击时触发
    const save = () => {
      //选中的节点
      const checked = treeRef.value.getCheckedKeys();
      //半选中的节点
      const halfChecked = treeRef.value.getHalfCheckedKeys();
      emit("update:modelValue", [...checked, ...halfChecked]);
    };

    //关键字搜索过滤节点
    watch(keyword, (val) => {
      unref(treeRef).filter(val);
    });

    //刷新监听
    watch(() => props.modelValue, refreshTree);

    onMounted(async () => {
      await refresh();
    });

    return {
      keyword,
      treeRef,
      menuList,
      checked,
      refresh,
      save,
      filterNode,
    };
  },
});
</script>
<style lang="scss" scoped>
.role-perms {
  width: 100%;
  .scroller {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    max-height: 200px;
    box-sizing: border-box;
    overflow-x: hidden;
    margin-top: 10px;
    padding: 5px 0;
  }
}
</style>
