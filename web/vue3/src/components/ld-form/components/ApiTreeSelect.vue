<template>
  <el-tree-select
    :data="treeData"
    v-bind="getAttrs"
    @change="handleChange"
  ></el-tree-select>
</template>
<script>
import { computed, defineComponent, onMounted, ref, unref, watch } from "vue";
import VueTypes from "vue-types";
import { isFunction } from "@/landao/utils/is";

export default defineComponent({
  name: "ApiTreeSelect",
  props: {
    api: {
      type: Function,
      required: true,
    },
    formatData: {
      type: Function,
      default: null,
    },
    params: VueTypes.object.def({}),
    immediate: VueTypes.bool.def(true),
  },
  setup(props, { attrs, emit }) {
    const treeData = ref([]);
    const isFirstLoaded = ref(false);
    const loading = ref(false);

    const getAttrs = computed(() => {
      return {
        ...(props.api ? { treeData: unref(treeData) } : {}),
        ...attrs,
      };
    });
    //获取远程数据
    async function fetch() {
      const { api } = props;
      if (!api || !isFunction(api)) return;
      loading.value = true;
      treeData.value = [];
      const { params, formatData } = props;
      let result;
      try {
        result = await api(params);
      } catch (error) {
        console.log("ApiTreeSelect.fetch", error);
      }
      loading.value = false;
      if (!result) return;
      if (formatData && isFunction(formatData)) {
        treeData.value = formatData(result.data);
      } else {
        treeData.value = result.data || [];
      }
      isFirstLoaded.value = true;
    }

    function handleChange(...args) {
      emit("change", ...args);
    }

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoaded) && fetch();
      },
      { deep: true }
    );

    watch(
      () => props.immediate,
      (val) => {
        val && !unref(isFirstLoaded) && fetch();
      }
    );

    onMounted(() => {
      props.immediate && fetch();
    });

    return {
      getAttrs,
      loading,
      handleChange,
      treeData,
    };
  },
});
</script>
