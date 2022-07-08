<template>
  <el-popover placement="bottom-start" width="660px" popper-class="icon-check">
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in getIconList()"
        :key="index"
        :span="2"
        :xs="4"
      >
        <el-button
          :class="{ 'is-active': item === name }"
          @click="onChange(item)"
        >
          <icon-svg :name="item" />
        </el-button>
      </el-col>
    </el-row>
    <template #reference>
      <el-input
        v-model="name"
        placeholder="请选择图标"
        clearable
        @click="open"
        @input="onChange"
      ></el-input>
    </template>
  </el-popover>
</template>
<script>
import { defineComponent, watch, ref, onMounted } from "vue";
import { basename } from "@/landao/utils";

export default defineComponent({
  name: "IconForm",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    //是否可见
    const visible = ref(false);
    //已选图标
    const name = ref(props.modelValue);

    /**
     * 获取命名为  icon- 开头的图标
     */
    function getIconList() {
      // svg 图标加载
      const svgFiles = import.meta.globEager("/src/icons/svg/**/icon-*.svg");
      const iconList = [];

      for (const i in svgFiles) {
        iconList.push(basename(i).replace(".svg", ""));
      }
      return iconList;
    }

    watch(
      () => props.modelValue,
      (val) => {
        name.value = val;
      }
    );

    function open() {
      visible.value = true;
    }
    function close() {
      visible.value = false;
    }

    function onChange(val) {
      emit("update:modelValue", val);
      close();
    }

    onMounted(() => {
      getIconList();
    });

    return {
      visible,
      name,
      getIconList,
      open,
      close,
      onChange,
    };
  },
});
</script>
<style lang="scss">
.icon-check {
  box-sizing: border-box;

  .el-button {
    margin-bottom: 10px;
    height: 40px;
    width: 100%;
    padding: 0;

    .icon-svg {
      font-size: 18px;
      color: #444;
    }
  }
}
</style>
