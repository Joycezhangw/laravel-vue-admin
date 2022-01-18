<template>
  <div class="breadcrumb-wrap">
    <p class="title">{{ lastName }}</p>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/init' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
        (item.meta && item.meta.title) || item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "lv-breadcrumb",
  data() {
    return { list: [] };
  },
  computed: {
    ...mapGetters(["menuGroup"]),
    lastName() {
      return _.last(this.list).name;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.list.length = 0;
        const deep = (item) => {
          if (route.path === "/" || route.path === "/init") {
            return false;
          }
          if (item.name == route.name) {
            return item;
          } else {
            if (item.children) {
              const ret = item.children.map(deep).find(Boolean);
              if (ret) {
                return [item, ret];
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        };
        this.list = _(this.menuGroup)
          .map(deep)
          .filter(Boolean)
          .flattenDeep()
          .value();
        //面包屑不存在，就把当前路由添加到面包屑中
        if (isEmpty(this.list)) {
          this.list.push(route);
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb-wrap {
  ::v-deep .el-breadcrumb {
    margin: 0 10px;

    &__inner {
      font-size: 13px;
      padding: 0 10px;
      font-weight: normal;
      letter-spacing: 1px;
    }
  }
  .title {
    display: none;
    font-size: 15px;
    font-weight: 500;
    margin-left: 5px;
  }

  @media only screen and (man-width: 768px) {
    .title {
      display: block;
    }

    ::v-deep .el-breadcrumb {
      display: none;
    }
  }
}
</style>
