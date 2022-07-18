<template>
  <div class="table-action">
    <template v-for="(action, index) in getActions" :key="index">
      <el-tooltip v-if="action.tooltop" v-bind="getTooltip(action)">
        <el-button v-bind="action">
          <icon-svg
            v-if="action.icon"
            :name="action.icon"
            :class="{ 'mr-1': !!action.label }"
          ></icon-svg>
          {{ action.label }}
        </el-button>
      </el-tooltip>
      <el-button v-else v-bind="action">
        <icon-svg
          v-if="action.icon"
          :name="action.icon"
          :class="{ 'mr-1': !!action.label }"
        ></icon-svg>
        {{ action.label }}
      </el-button>
    </template>
    <el-dropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        <span v-if="!dropDownActions.label" class="icon-more">
          <icon-svg name="icon-moreOutlined"></icon-svg>
        </span>
        <span v-else>
          {{ dropDownActions.label }}
          <icon-svg name="icon-arrowDown"></icon-svg>
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="(action, index) in getDropdownList" :key="index">
            <el-dropdown-item v-bind="action">{{
              action.text
            }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { defineComponent, computed, toRaw } from "vue";
import { usePermission } from "@/landao/hooks/dom/usePermission";
import { isBoolean, isFunction, isString } from "@/landao/utils/is";

export default defineComponent({
  name: "TableAction",
  emits: ["command"],
  props: {
    actions: {
      type: Array,
      default: [],
    },
    dropDownActions: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const { hasAuth } = usePermission();
    //控制按钮是否显示
    function isIfShow(action) {
      const ifShow = action.ifShow;
      let isIfShow = true;
      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(action);
      }
      return isIfShow;
    }
    //按钮
    const getActions = computed(() => {
      return (toRaw(props.actions) || [])
        .filter((action) => {
          return (
            (action.auth ? hasAuth(action.auth) : true) && isIfShow(action)
          );
        })
        .map((action) => {
          return {
            link: true,
            size: "small",
            type: "primary",
            ...action,
          };
        });
    });

    //Tooltip 文字提示
    function getTooltip(tooltip) {
      return {
        effect: "dark",
        placement: "bottom",
        ...(isString(tooltip) ? { content: tooltip } : tooltip),
      };
    }
    //下拉菜单
    const getDropdownList = computed(() => {
      const list = (toRaw(props.dropDownActions.buttons) || []).filter(
        (action) => {
          return (
            (action.auth ? hasAuth(action.auth) : true) && isIfShow(action)
          );
        }
      );
      return list.map((action, index) => {
        const { label } = action;
        return {
          ...action,
          text: label,
        };
      });
    });

    function handleCommand(command) {
      emit("command", command);
    }

    return { getActions, getTooltip, getDropdownList, handleCommand };
  },
});
</script>
<style lang="scss" scoped>
.table-action {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    display: flex;
    align-items: center;
    padding: 0 6px;
  }
  .mr-1 {
    margin-right: 1px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .icon-more {
    transform: rotate(90deg);

    svg {
      font-size: 2.1em;
      font-weight: 700;
      color: var(--el-color-primary);
    }
  }
}
</style>
