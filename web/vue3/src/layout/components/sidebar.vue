<template>
  <div class="app-slider">
    <div class="app-slider__logo">
      <img src="@/assets/logo.png" />
      <span v-if="!appStore.isFold || appStore.browser.isMini">{{
        appStore.appInfo.name
      }}</span>
    </div>
    <div class="app-slider__container">
      <menu-nav />
    </div>
  </div>
</template>
<script lang="jsx">
import { defineComponent, h } from "vue";
import { useBaseStore } from "@/store";
import { useLanDao } from "@/landao/hooks";

export default defineComponent({
  name: "appSidebar",
  components: {
    MenuNav: {
      name: "menuNav",
      setup() {
        const { menu: menuStore } = useBaseStore();
        const { route, router } = useLanDao();
        //跳转页面
        function toView(url) {
          if (url != route.path) {
            router.push(url);
          }
        }
        return {
          route,
          menuStore,
          toView,
        };
      },
      render(ctx) {
        const { app: appStore } = useBaseStore();
        function deepMenu(list, index) {
          return list
            .filter((e) => e.isShow)
            .map((item) => {
              let html = null;
              console.log("isFold", appStore.isFold);
              //目录菜单
              if (item.menuType === 0) {
                html = h(
                  <el-sub-menu></el-sub-menu>,
                  {
                    index: String(item.menuId),
                    key: item.menuId,
                    popperClass: "app-slider__menu",
                  },
                  {
                    title() {
                      return (
                        <div class="wrap">
                          <icon-svg name={item.meta.icon}></icon-svg>
                          <span>{item.meta.title}</span>
                        </div>
                      );
                    },
                    default() {
                      if (item.children) {
                        return deepMenu(item.children, index + 1);
                      }
                    },
                  }
                );
              } else {
                html = h(
                  <el-menu-item></el-menu-item>,
                  {
                    index: item.path,
                    key: item.menuId,
                  },
                  {
                    default() {
                      return (
                        <div class="wrap">
                          <icon-svg name={item.meta.icon}></icon-svg>
                          <span>{item.meta.title}</span>
                        </div>
                      );
                    },
                  }
                );
              }
              return html;
            });
        }

        const children = deepMenu(ctx.menuStore.menuGroup);

        return (
          <div class="app-slider__menu">
            <el-menu
              default-active={ctx.route.path}
              background-color="transparent"
              collapse-transition={false}
              collapse={appStore.browser.isMini ? false : appStore.isFold}
              onSelect={ctx.toView}
            >
              {children}
            </el-menu>
          </div>
        );
      },
    },
  },
  setup() {
    const { app: appStore } = useBaseStore();
    return {
      appStore,
    };
  },
});
</script>

<style lang="scss">
.app-slider {
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #2f3447;
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    cursor: pointer;

    img {
      height: 30px;
      width: 30px;
    }

    span {
      color: #fff;
      font-weight: bold;
      font-size: 26px;
      margin-left: 10px;
      font-family: inherit;
      white-space: nowrap;
    }
  }

  &__container {
    height: calc(100% - 80px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__menu {
    &.el-popper {
      &.is-light {
        border: 0;
      }
    }
    .el-menu {
      border-right: 0;
      background-color: transparent;
      &--popup {
        .icon-svg,
        span {
          color: #000;
        }
      }
      .el-sub-menu__title,
      &-item {
        &.is-active,
        &:hover {
          background-color: #4165d7 !important;

          .icon-svg,
          span {
            color: #fff;
          }
        }
      }
      .el-sub-menu__title,
      &-item,
      &__title {
        color: #eee;
        letter-spacing: 0.5px;
        height: 50px;
        line-height: 50px;

        .wrap {
          width: 100%;
        }

        .icon-svg {
          font-size: 16px;
        }

        span {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 1px;
          margin-left: 10px;
        }
      }

      &--collapse {
        .wrap {
          text-align: center;

          .icon-svg {
            font-size: 18px;
          }
        }
        & .el-menu-item span,
        & .el-sub-menu .el-sub-menu__title span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}
</style>
