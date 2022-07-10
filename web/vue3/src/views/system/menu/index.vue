<template>
  <div class="app-container">
    <ld-table
      ref="menuTableRef"
      :service-api="getMenuListApi"
      :table-config="tableConfig"
      :filter-data="filterData"
      :is-pagination="false"
    >
      <template #toolbar>
        <el-button type="primary" size="small" @click="openDialog()"
          >新增</el-button
        >
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
          <selectIcon v-if="scopeData.row.meta.keepAlive"></selectIcon>
          <CloseBold v-else></CloseBold>
        </el-icon>
      </template>
      <template v-slot:apiPathSlot="{ scopeData }">
        <el-tag effect="dark" size="small" v-if="scopeData.row.apiPath">{{
          scopeData.row.apiPath
        }}</el-tag>
      </template>
      <template v-slot:handleSlot="{ scopeData }">
        <el-button size="small" @click="handleEdit(scopeData.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          v-if="scopeData.row.children.length === 0"
          size="small"
          @click="handleDel(scopeData.row)"
          >删除</el-button
        >
      </template>
    </ld-table>
  </div>
  <el-dialog :title="disologTitle" v-model="dialogFormVisible">
    <ld-form
      ref="menuFormEl"
      label-position="right"
      label-width="150px"
      :schemas="formSchemas"
    >
      <template #treeSelectSlot="{ model, field }">
        <MenuTreeSelect
          ref="menuTreeSelectRef"
          v-model="model[field]"
        ></MenuTreeSelect>
      </template>
      <template #menuIconSlot="{ model, field }">
        <IconForm v-model="model[field]"></IconForm>
      </template>
    </ld-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="btnLoading"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { MenuService } from "@/service";
import { nextTick, reactive, ref, unref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { CloseBold, Select as selectIcon } from "@element-plus/icons-vue";
import IconForm from "@/views/system/components/IconForm";
import { useBaseStore } from "@/store";
import { MenuSchemas } from "@/views/system/schemas/MenuSchemas";
import MenuTreeSelect from "../components/MenuTreeSelect.vue";

export default {
  name: "menuIndex",
  components: {
    CloseBold,
    selectIcon,
    IconForm,
    MenuTreeSelect,
  },
  setup() {
    //表格搜索条件
    const filterData = reactive({ search_text: "" });
    //表格
    const menuTableRef = ref();
    //表单
    const menuFormEl = ref(null);
    //弹窗
    const dialogFormVisible = ref(false);
    const disologTitle = ref("新增菜单");
    //提交按钮loading
    const btnLoading = ref(false);
    //上级菜单ref
    const menuTreeSelectRef = ref(false);

    //表格配置和表单配置
    const { tableConfig, formSchemas, menuType } = MenuSchemas();

    //更新菜单id
    const updateMenuId = ref(0);

    //表格数据接口
    const getMenuListApi = MenuService.getList;

    //新增，删除，更新数据后。进行重新拉去权限和菜单。并重置表单得上级树形数据
    async function setMenu() {
      //更新表格数据
      unref(menuTableRef).refresh();
      const { user: userStore, menu: menuStore } = useBaseStore();
      // 获取用户信息
      await userStore.getUserInfo();

      // 获取菜单权限
      await menuStore.getPremRules();
      //重置表单
      await resetForm();
      const menuTreeSelectEl = unref(menuTreeSelectRef);
      //更新表单上级菜单数据
      if (menuTreeSelectEl) {
        menuTreeSelectEl.refresh();
      }
    }

    /**
     * 提交表单数据
     */
    async function handleSubmit() {
      const formEl = unref(menuFormEl);
      if (!formEl) return;
      //验证表单
      await formEl
        .validate()
        .then((res) => {
          //验证通过
          btnLoading.value = true;
          //更新数据
          if (unref(updateMenuId) > 0) {
            MenuService.doUpdate(unref(updateMenuId), res)
              .then((result) => {
                if (result.code === 200) {
                  setMenu();
                  dialogFormVisible.value = false;
                }
                btnLoading.value = false;
              })
              .catch((error) => {
                ElMessage.error(error);
                btnLoading.value = false;
              });
          } else {
            //新增数据
            MenuService.doStore(res)
              .then((result) => {
                if (result.code === 200) {
                  setMenu();
                  dialogFormVisible.value = false;
                }
                btnLoading.value = false;
              })
              .catch((error) => {
                ElMessage.error(error);
                btnLoading.value = false;
              });
          }
        })
        .catch((error) => {
          //校验不通过
        });
    }

    function openDialog() {
      updateMenuId.value = 0;
      disologTitle.value = "新增菜单";
      dialogFormVisible.value = true;
      nextTick(async () => {
        //重置表单
        await resetForm();
      });
    }

    //重置表单
    async function resetForm() {
      const formEl = unref(menuFormEl);
      if (!formEl) return;
      await unref(menuFormEl).resetFields();
    }

    //删除菜单
    async function doDelMenu(id) {
      await MenuService.doDelete(id)
        .then((res) => {
          ElMessage.success(res.message);
          setMenu();
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    }

    //删除菜单
    const handleDel = (row) => {
      if (row.children.length === 0) {
        ElMessageBox.confirm("此操作将永久删除选中数据，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            doDelMenu(row.menuId);
          })
          .catch(() => {});
      } else {
        ElMessage.info("请先删除子菜单");
      }
    };

    const handleEdit = (row) => {
      updateMenuId.value = row.menuId;
      disologTitle.value = "编辑菜单";
      dialogFormVisible.value = true;
      nextTick(async () => {
        const obj = {
          menu_type: row.menuType.toString(),
          menu_title: row.title,
          menu_name: row.name,
          parent_id: row.parentId,
          keep_alive: row.meta.keepAlive,
          is_show: row.isShow,
          menu_component: row.component,
          menu_icon: row.meta.icon,
          api_path: row.apiPath,
          menu_order: row.menuOrder,
        };
        const formEl = unref(menuFormEl);
        if (!formEl) return;
        await formEl.setFieldsValue(obj);
      });
    };

    return {
      tableConfig,
      getMenuListApi,
      filterData,
      menuTableRef,
      menuType,
      handleDel,
      menuFormEl,
      dialogFormVisible,
      formSchemas,
      handleSubmit,
      resetForm,
      btnLoading,
      menuTreeSelectRef,
      handleEdit,
      openDialog,
      disologTitle,
    };
  },
};
</script>
