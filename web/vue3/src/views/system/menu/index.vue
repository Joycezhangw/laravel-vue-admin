<template>
  <div class="app-container">
    <LdTable
      :api="getMenuListApi"
      ref="menuTableRef"
      :pagination="false"
      :columns="tableColumns"
      :afterFetch="afterTableFetch"
      row-key="menuId"
    >
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #titleSlot="{ row }">
        <span>{{ row.title }}</span>
        <el-tag size="small" effect="dark" type="danger" v-if="!row.isShow"
          >隐藏</el-tag
        >
      </template>
      <template v-slot:iconSlot="{ row }">
        <icon-svg
          :name="row.meta.icon"
          size="16px"
          style="margin-top: 5px"
        ></icon-svg>
      </template>
      <template v-slot:menuTypeSlot="{ row }">
        <el-tag size="small" effect="dark">{{ menuType[row.menuType] }}</el-tag>
      </template>
      <template v-slot:keepAliveSlot="{ row }">
        <el-icon
          style="vertical-align: middle"
          :color="row.meta.keepAlive ? '#67C23A' : '#F56C6C'"
        >
          <selectIcon v-if="row.meta.keepAlive"></selectIcon>
          <CloseBold v-else></CloseBold>
        </el-icon>
      </template>
      <template v-slot:apiPathSlot="{ row }">
        <el-tag effect="dark" size="small" v-if="row.apiPath">{{
          row.apiPath
        }}</el-tag>
      </template>
      <template v-slot:handleSlot="{ row }">
        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button
          type="danger"
          v-if="row.children.length === 0"
          size="small"
          @click="handleDel(row)"
          >删除</el-button
        >
      </template>
    </LdTable>
  </div>
  <el-dialog :title="disologTitle" v-model="dialogFormVisible">
    <ld-form
      ref="menuFormEl"
      label-position="right"
      label-width="150px"
      :schemas="formSchemas"
      :showActionButtonGroup="false"
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
import { nextTick, ref, unref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { CloseBold, Select as selectIcon } from "@element-plus/icons-vue";
import IconForm from "@/views/system/components/IconForm";
import { useBaseStore } from "@/store";
import MenuSchemas from "@/views/system/schemas/MenuSchemas";
import MenuTreeSelect from "../components/MenuTreeSelect.vue";
import { deepTree } from "@/landao/utils";

export default {
  name: "menuIndex",
  components: {
    CloseBold,
    selectIcon,
    IconForm,
    MenuTreeSelect,
  },
  setup() {
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
    const { tableColumns, formSchemas, menuType } = MenuSchemas();

    //更新菜单id
    const updateMenuId = ref(0);

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
      await nextTick();

      try {
        //验证表单
        await formEl
          .validate()
          .then((res) => {
            const params = formEl.getFieldsValue();
            //验证通过
            btnLoading.value = true;
            //更新数据
            if (unref(updateMenuId) > 0) {
              MenuService.doUpdate(unref(updateMenuId), params)
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
              MenuService.doStore(params)
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
            console.log("校验不通过");
          });
      } catch (error) {}
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
    function afterTableFetch(data) {
      return deepTree(data);
    }
    return {
      tableColumns,
      getMenuListApi: MenuService.getList,
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
      afterTableFetch
    };
  },
};
</script>
