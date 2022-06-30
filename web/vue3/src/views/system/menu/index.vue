<template>
  <div class="app-container">
    <menu-form />
    <ld-table
      ref="menuTableRef"
      :service-api="serviceApi"
      :table-config="tableConfig"
      :filter-data="filterData"
      :is-pagination="false"
    >
      <template #toolbar>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="primary" size="small">新增</el-button>
      </template>
      <template v-slot:titleSlot="{ scopeData }">
        <span>{{ scopeData.row.title }}</span>
        <el-tag
          size="small"
          effect="dark"
          type="danger"
          v-if="!scopeData.row.isShow"
          >隐藏</el-tag
        ></template
      >
      <template v-slot:iconSlot="{ scopeData }">
        <icon-svg
          :name="scopeData.row.meta.icon"
          size="16px"
          style="margin-top: 5px"
        ></icon-svg>
      </template>
      <template v-slot:menuTypeSlot="{ scopeData }">
        <el-tag size="small" effect="dark">{{
          menuType[scopeData.row.menuType]
        }}</el-tag>
      </template>
      <template v-slot:keepAliveSlot="{ scopeData }">
        <el-icon
          style="vertical-align: middle"
          :color="scopeData.row.meta.keepAlive ? '#67C23A' : '#F56C6C'"
        >
          <Select v-if="scopeData.row.meta.keepAlive"></Select>
          <CloseBold v-else></CloseBold>
        </el-icon>
      </template>
      <template v-slot:apiPathSlot="{ scopeData }">
        <el-tag effect="dark" size="small" v-if="scopeData.row.apiPath">{{
          scopeData.row.apiPath
        }}</el-tag>
      </template>
      <template v-slot:handleSlot="{ scopeData }">
        <el-button type="danger" size="small" @click="handleDel(scopeData.row)"
          >删除</el-button
        >
      </template>
    </ld-table>
  </div>
</template>
<script>
import { MenuService } from "@/service";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { CloseBold, Select } from "@element-plus/icons-vue";
import { deepTree } from "@/landao/utils";
import menuForm from "@/views/system/components/form/menuForm";

export default {
  name: "menuIndex",
  components: {
    CloseBold,
    Select,
    menuForm,
  },
  setup() {
    const filterData = reactive({ search_text: "" });
    const menuTableRef = ref();
    const tableConfig = {
      attrs: {
        rowKey: "menuId", //表格索引
        size: "small", //表格和搜索表单尺寸
      },
      formatData: deepTree, //格式化数据，一维数组转树形数组
      columns: [
        {
          title: "名称",
          width: 200,
          align: "center",
          customSlot: "titleSlot",
        },
        {
          title: "图标",
          width: 200,
          align: "center",
          customSlot: "iconSlot",
        },
        {
          title: "类型",
          width: 200,
          align: "center",
          customSlot: "menuTypeSlot",
        },
        {
          title: "路由名",
          width: 200,
          align: "center",
          key: "name",
        },
        {
          title: "节点路由",
          width: 180,
          align: "center",
          key: "path",
        },
        {
          title: "路由缓存",
          width: 100,
          align: "center",
          customSlot: "keepAliveSlot",
        },
        {
          title: "文件路径",
          width: 200,
          align: "center",
          key: "component",
        },
        {
          title: "权限",
          width: 200,
          align: "center",
          customSlot: "apiPathSlot",
        },
        {
          title: "排序",
          width: 90,
          align: "center",
          key: "menuOrder",
        },
        {
          title: "更新时间",
          width: 150,
          align: "center",
          key: "updatedAt",
        },
        {
          title: "操作",
          width: 200,
          fixed: "right",
          align: "center",
          customSlot: "handleSlot",
        },
      ],
    };

    //删除日志
    const handleDel = (row) => {
      ElMessageBox.confirm("此操作将永久删除选中数据，是否继续？", "提示", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {});
    };
    const handleEdit = (row) => {
      console.log("修改", row);
    };

    const serviceApi = MenuService.getList;
    //菜单类型
    const menuType = ref(["目录", "菜单", "权限"]);

    return {
      tableConfig,
      serviceApi,
      filterData,
      menuTableRef,
      menuType,
      handleDel,
    };
  },
};
</script>
