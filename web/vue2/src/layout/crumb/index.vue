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
          if (route.path === "/init") {
            return item;
          } else {
            if (item.children.length > 0) {
              const ret = item.children.map(deep).find(Boolean);
              if (ret) {
                return [item, ret];
              } else {
                return [];
              }
            } else {
              return [];
            }
          }
        };
        //首页不进行追查父菜单
        if (route.path !== "/init" && route.path !== "/" && route.path!=="/my/info") {
          this.list = _(this.menuGroup)
            .map(deep)
            .filter(Boolean)
            .flattenDeep()
            .value();
        }
        //将本路由添加到面包屑中
        this.list.push(route);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb-wrap {
  /deep/ .el-breadcrumb {
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

    /deep/ .el-breadcrumb {
      display: none;
    }
  }
}
</style>