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
        <el-button type="danger" size="small" @click="handleDel(scopeData.row)"
          >删除</el-button
        >
      </template>
    </ld-table>
  </div>
  <el-dialog title="新增菜单" v-model="dialogFormVisible">
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
import { useMenuSchemas } from "@/views/system/schemas/MenuSchemas";
import MenuTreeSelect from "../components/MenuTreeSelect.vue";
// import { deepTree } from "@/landao/utils";

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
    //提交按钮loading
    const btnLoading = ref(false);

    const menuTreeSelectRef = ref(false);

    //表格配置和表单配置
    const { tableConfig, formSchemas } = useMenuSchemas();

    //表格数据接口
    const getMenuListApi = MenuService.getList;

    // const menuTreeSelectData = ref([]);

    // async function getMenuTree() {
    //   await getMenuListApi().then((res) => {
    //     let menuList = res.data.filter((item) => item.menuType != 2);
    //     menuList.unshift({
    //       title: "一级菜单",
    //       menuId: 0,
    //     });
    //     menuTreeSelectData.value = deepTree(menuList);
    //   });
    // }

    async function setMenu() {
      unref(menuTableRef).refresh();
      const { user: userStore, menu: menuStore } = useBaseStore();
      // 获取用户信息
      await userStore.getUserInfo();

      // 获取菜单权限
      await menuStore.getPremRules();
      //重置表单
      await resetForm();
      const menuTreeSelectEl = unref(menuTreeSelectRef);
      if (menuTreeSelectEl) {
        console.log('gengxin ')
        menuTreeSelectEl.refresh();
      }
      // await updateMenuTreeSchema();
    }

    // async function updateMenuTreeSchema() {
    //   await getMenuTree();
    //   nextTick(() => {
    //     const formEl = unref(menuFormEl);
    //     console.log("请求成功郭了吗", unref(menuTreeSelectData));
    //     if (formEl) {
    //       unref(menuFormEl)
    //         .updateSchema({
    //           field: "parent_id",
    //           defaultValue: 0,
    //           componentProps: {
    //             data: unref(menuTreeSelectData),
    //           },
    //         })
    //         .then((res) => {
    //           console.log("updateSchema", res);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //   });
    // }

    async function openDialog() {
      dialogFormVisible.value = true;
      // await updateMenuTreeSchema();
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
        })
        .catch((error) => {
          //校验不通过
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
      ElMessageBox.confirm("此操作将永久删除选中数据，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          doDelMenu(row.menuId);
        })
        .catch(() => {});
    };

    const handleEdit = (row) => {
      console.log("修改", row);
    };

    //菜单类型
    const menuType = ref(["目录", "菜单", "权限"]);

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
      openDialog,
      menuTreeSelectRef,
    };
  },
};
</script>
