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
        <template v-if="scopeData.row.is_default === 0">
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
  <el-dialog
    :title="disologTitle"
    v-model="dialogFormVisible"
    @close="closeDialog()"
  >
    <ld-form ref="roleFormEl" @register="register" @submit="onSubmit">
      <template #treeMenuPermSlot="{ model, field }">
        <RolePerms ref="menuTreePermRef" v-model="model[field]"></RolePerms>
      </template>
    </ld-form>
  </el-dialog>
</template>
<script>
import { defineComponent, ref, reactive, unref, nextTick } from "vue";
import { RoleService } from "@/service";
import RoleSchemas from "@/views/system/schemas/RoleSchemas";
import { useToggle } from "@/landao/hooks";
import RolePerms from "../components/RolePerms.vue";
import { useForm } from "@/components/ld-form";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "RoleList",
  components: {
    RolePerms,
  },
  setup() {
    const roleTableRef = ref(null);
    const roleFormEl = ref(null);
    const menuTreePermRef = ref(null);
    //弹窗
    const dialogFormVisible = ref(false);
    //表格搜索条件
    const filterData = reactive({ search_text: "" });
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
      dialogFormVisible.value = true;
    }
    //关闭弹窗
    function closeDialog() {
      resetFields();
      dialogFormVisible.value = false;
    }
    //编辑角色
    const handleEdit = async (row) => {
      setUpdateRoleId(row.role_id);
      setRight();
      dialogFormVisible.value = true;
      await RoleService.read(unref(updateRoleId)).then((res) => {
        nextTick(async () => {
          await setFieldsValue({
            role_name: row.role_name,
            role_desc: row.role_desc,
            menus: res.data.menus,
          });
        });
      });
    };
    //表格配置和表单配置
    const { tableConfig, formSchemas } = RoleSchemas();

    //注册表单
    const [register, { resetFields, setProps, setFieldsValue }] = useForm({
      labelPosition: "right",
      labelWidth: "150px",
      schemas: formSchemas,
    });

    function clearTableForm() {
      resetFields();
      unref(roleTableRef).refresh();
      closeDialog();
    }

    //提交数据
    const onSubmit = async (data) => {
      setProps({ submitButtonOptions: { loading: true, label: "提交中..." } });
      if (unref(updateRoleId) > 0) {
        await RoleService.doUpdate(unref(updateRoleId), data)
          .then((res) => {
            clearTableForm();
          })
          .catch((err) => {
            ElMessage.error(err);
          });
      } else {
        await RoleService.doStore(data)
          .then((res) => {
            clearTableForm();
          })
          .catch((err) => {
            ElMessage.error(err);
          });
      }
      setProps({ submitButtonOptions: { loading: false, label: "提 交" } });
    };

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
      register,
      onSubmit,
    };
  },
});
</script>
