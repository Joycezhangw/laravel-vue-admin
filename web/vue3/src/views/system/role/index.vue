<template>
  <div class="app-container">
    <ld-table
      ref="roleTableRef"
      :service-api="getList"
      :table-config="tableConfig"
      :filter-data="filterData"
      :is-pagination="false"
    >
      <template #toolbar>
        <el-button type="primary" size="small" @click="openDialog()"
          >新增</el-button
        >
      </template>
      <template #filter>
        <el-form-item prop="search_text">
          <el-input
            class="ld-search-key__input"
            v-model="filterData.search_text"
            placeholder="请输入角色名称"
            clearable
            size="small"
          />
        </el-form-item>
      </template>
      <template v-slot:handleSlot="{ scopeData }">
        <template v-if="scopeData.is_default === 0">
          <el-button size="small" @click="handleEdit(scopeData.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scopeData.row)"
            >删除</el-button
          >
        </template>
        <template v-else>-</template>
      </template>
    </ld-table>
  </div>
 
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { RoleService } from "@/service";
import RoleSchemas from "@/views/system/schemas/RoleSchemas";
import { useBoolean, useToggle } from "@/landao/hooks";
import RolePerms from "../components/RolePerms.vue";

export default defineComponent({
  name: "RoleList",
  components: {
    RolePerms,
  },
  setup() {
    const roleTableRef = ref(null);
    const roleFormEl = ref(null);
    const menuTreePermRef = ref(null);
    //表格搜索条件
    const filterData = reactive({ search_text: "" });
    //弹窗
    const { state: dialogFormVisible, toggle: setDialogVisible } =
      useBoolean(false);
    //弹窗标题
    const {
      state: disologTitle,
      setLeft,
      setRight,
    } = useToggle("新增角色", "编辑角色");
    //需要更新的角色ID
    const { state: updateRoleId, toggle: setUpdateRoleId } = useToggle(0);
    //打开弹窗
    function openDialog() {
      setUpdateRoleId(0);
      setLeft();
      setDialogVisible(true);
    }
    function closeDialog() {
      setDialogVisible(false);
    }
    //编辑角色
    const handleEdit = (row) => {
      setUpdateRoleId(row.role_id);
      setRight();
      setDialogVisible(true);
    };
    //表格配置和表单配置
    const { tableConfig, formSchemas } = RoleSchemas();



    return {
      roleTableRef,
      filterData,
      getList: RoleService.page,
      tableConfig,
      disologTitle,
      dialogFormVisible,
      openDialog,
      closeDialog,
      handleEdit,
      roleFormEl,
      menuTreePermRef,
    };
  },
});
</script>
