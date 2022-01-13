<template>
  <div class="lv-menu-file">
    <el-select
      v-model="newValue"
      allow-create
      filterable
      clearable
      placeholder="请选择"
    >
      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label="item.value"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
const files = require
  .context(
    "@/",
    true,
    /view\/(?!(components)|(.*\/components)|(error)|(login)|(index\.js)).*.(js|vue)/
  )
  .keys();
export default {
  name: "view-file",
  props: {
    value: [String],
  },
  data() {
    return { newValue: "", list: [] };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.newValue = val || "";
      },
    },
    newValue(val) {
      this.$emit("input", val);
    },
  },
  created() {
    this.list = files.map((item) => {
      return { value: item.substr(2) };
    });
  },
};
</script>

<style lang="scss" scoped>
.lv-menu-file {
  width: 100%;

  ::v-deep .el-select {
    width: 100%;
  }

  &__module {
    display: inline-flex;

    .label {
      width: 40px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>
