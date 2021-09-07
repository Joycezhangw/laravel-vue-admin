<template>
  <div class="app-topbar">
    <div class="app-topbar__collapse" @click="collapse">
      <i :class="[menuCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
    </div>
    <!--面包屑-->
    <div class="app-topbar__breadcrumb">
      <breadcrumb />
    </div>
    <div class="flex1"></div>
    <!--用户信息-->
    <div class="app-topbar__user" v-if="userInfo">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <span class="name">{{ userInfo.nickname | defaultName }}</span>
          <img class="avatar" :src="userInfo.avatar | defaultAvatar" alt />
        </span>
        <el-dropdown-menu slot="dropdown" class="popper-dropdown-menu-user">
          <el-dropdown-item command="my">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import breadcrumb from "@/layout/crumb";
export default {
  computed: {
    ...mapGetters(["userInfo", "menuCollapse"]),
  },
  components: {
    breadcrumb,
  },
  methods: {
    //折叠左侧菜单
    collapse() {
      this.$store.commit("app/COLLAPSE_MENU", !this.menuCollapse);
    },

    handleCommand(command) {
      switch (command) {
        case "exit":
          this.$store.dispatch("user/LoginOut").finally(() => {
            location.reload();
          });
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.popper-dropdown-menu-user {
  width: 120px;
}
.app-topbar {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  background-color: #fff;

  &__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    cursor: pointer;
    margin-right: 10px;
    i {
      font-size: 22px;
      color: #666;
    }
  }

  .flex1 {
    flex: 1;
  }

  &__tools {
    display: flex;
    margin-right: 20px;

    li {
      list-style: none;
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      i {
        font-size: 18px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  &__user {
    margin-right: 10px;
    cursor: pointer;

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 32px;
    }

    .name {
      white-space: nowrap;
      margin-right: 15px;
    }

    .el-icon-arrow-down {
      margin-left: 10px;
    }
  }
}
</style>