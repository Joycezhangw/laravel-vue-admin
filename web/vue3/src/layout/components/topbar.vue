<template>
  <div class="app-topbar">
    <div
      class="app-topbar__collapse"
      :class="{
        unfold: !appStore.isFold,
      }"
      @click="appStore.setFold()"
    >
      <el-icon class="el-input__icon"><iconFold /></el-icon>
    </div>
    <div class="flex1"></div>
    <toolbar />
    <div class="app-topbar__user" v-if="userStore.userInfo">
      <el-dropdown trigger="click" :hide-on-click="false" @command="onCommand">
        <span class="el-dropdown-link">
          <img class="avatar" :src="filterAvatar(userStore.userInfo.avatar)" />
          <span class="name">{{ userStore.userInfo.nickname }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="my">
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item command="github">
              <span>代码仓库</span>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useBaseStore } from "@/store";
import { useLanDao } from "@/landao/hooks";
import { Fold } from "@element-plus/icons-vue";
import { trim } from "lodash";
import defaultAvatar from "@/assets/img/default-avatar.png";
import Toolbar from "./toolbar.vue";
export default defineComponent({
  name: "appTopbar",
  components: {
    iconFold: Fold,
    Toolbar,
  },
  setup() {
    const { app: appStore, user: userStore } = useBaseStore();
    const { router } = useLanDao();

    function onCommand(name) {
      switch (name) {
        case "my": //个人中心
          router.push("/my/info");
          break;
        case "logout": //退出
          userStore.logout();
          break;
        case "github":
          window.open("https://github.com/Joycezhangw/laravel-vue-admin");
          break;
      }
    }

    function filterAvatar(avatar) {
      if (trim(avatar) == "") {
        return defaultAvatar;
      }
      return url;
    }

    return {
      appStore,
      userStore,
      onCommand,
      filterAvatar,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-topbar {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: #fff;
  &__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    cursor: pointer;

    & i {
      transform: rotateY(180deg);
    }

    &.unfold i {
      transform: rotateY(0);
    }

    i {
      font-size: 20px;
      transition: transform 0.2s ease;
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
      padding-left: 10px;
    }

    .el-icon-arrow-down {
      margin-left: 10px;
    }
  }
}
</style>
