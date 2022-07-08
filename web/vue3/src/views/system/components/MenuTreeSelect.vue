<template>
  <el-tree-select
    :data="treeData"
    v-model="pid"
    @change="onChange"
    placeholder="请选择上级节点"
    filterable
    checkStrictly
    nodeKey="menuId"
    :props="{
      label: 'title',
      children: 'children',
    }"
  ></el-tree-select>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { MenuService } from "@/service";
import { deepTree } from "@/landao/utils";

export default defineComponent({
  name: "MenuTreeSelect",
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const treeData = ref([]);
    console.log("已选上级菜单", props.modelValue);
    //已选上级菜单
    const pid = ref(props.modelValue);
    async function refresh() {
      await MenuService.getList()
        .then((res) => {
          const _list = res.data.filter((item) => item.menuType != 2);

          _list.unshift({
            title: "一级菜单",
            menuId: 0,
          });

          treeData.value = deepTree(_list);
        })
        .catch((err) => {});
    }
    watch(
      () => props.modelValue,
      (val) => {
        pid.value = val;
      }
    );

    function onChange(val) {
      emit("update:modelValue", val);
    }

    onMounted(() => {
      refresh();
    });

    return {
      treeData,
      pid,
      refresh,
      onChange,
    };
  },
});
</script>
