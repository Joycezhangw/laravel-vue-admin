<template>
  <div class="lv-menu-icons">
    <el-popover
      ref="iconPopover"
      placement="bottom-start"
      trigger="click"
      popper-class="popper-menu-icon"
    >
      <el-row :gutter="10" class="list">
        <el-col :span="3" :xs="4" v-for="(item, index) in list" :key="index">
          <el-button
            size="mini"
            :class="{ 'is-active': item === value }"
            @click="onUpdate(item)"
          >
            <icon-svg :name="item"></icon-svg>
          </el-button>
        </el-col>
      </el-row>
    </el-popover>

    <el-input
      v-model="name"
      v-popover:iconPopover
      size="small"
      placeholder="请选择"
      @input="onUpdate"
    ></el-input>
  </div>
</template>

<script>
const req = require.context("@/icons/svg/", false, /\.svg$/);

export default {
  name: "menu-icons",

  props: {
    value: String,
  },

  data() {
    return {
      list: [],
      name: "",
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.name = val;
      },
    },
  },

  mounted() {
    this.list = this.iconList();
  },

  methods: {
    onUpdate(icon) {
      this.$emit("input", icon);
    },
    iconList() {
      return req
        .keys()
        .map(req)
        .map((item) => item.default.id)
        .filter((item) => item.includes("icon"))
        .sort();
    },
  },
};
</script>
<style lang="scss">
.popper-menu-icon {
  width: 480px;
  max-width: 90%;
  box-sizing: border-box;

  .list {
    height: 250px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
  }

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
