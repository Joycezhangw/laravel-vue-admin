<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
      <el-button
        type="primary"
        v-permission="'manage.menu.store'"
        size="mini"
        @click="handleAdd()"
        >新增</el-button
      >
    </el-row>
    <el-row>
      <div class="lv-table">
        <el-table
          :data="tableList"
          v-loading="tableLoading"
          :border="true"
          size="small"
          row-key="menuId"
        >
          <el-table-column label="名称" align="left" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
              <el-tag
                size="mini"
                class="ml10"
                effect="dark"
                type="danger"
                v-if="scope.row.hidden"
                >隐藏</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="图标" align="center" width="80">
            <template slot-scope="props">
              <icon-svg
                :name="props.row.meta.icon"
                size="16px"
                style="margin-top: 5px"
              ></icon-svg>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center" width="100">
            <template slot-scope="props">
              <el-tag size="small" type="dark">{{
                menuType[props.row.menuType]
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="路由名" align="center" width="120" prop="name"></el-table-column>
          <el-table-column
            label="节点路由"
            align="center"
            min-width="160"
            prop="path"
          ></el-table-column>
          <el-table-column label="路由缓存" align="center" width="100">
            <template slot-scope="props">
              <i class="el-icon-check" v-if="props.row.meta.keepAlive"></i>
              <i class="el-icon-close" v-else></i>
            </template>
          </el-table-column>
          <el-table-column
            label="文件路径"
            align="center"
            width="200"
            prop="component"
          ></el-table-column>
          <el-table-column
            label="权限"
            align="center"
            width="200"
            prop="apiPath"
          >
            <template slot-scope="props">
              <el-tag type="dark" size="mini" v-if="props.row.apiPath">{{
                props.row.apiPath
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="排序"
            align="center"
            width="90"
            prop="menuOrder"
          ></el-table-column>
          <el-table-column
            label="更新时间"
            align="center"
            width="150"
            prop="updatedAt"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-permission="'manage.menu.store'"
                v-if="scope.row.menuType != 2"
                @click="handleRowAdd(scope.$index, scope.row)"
                >新增</el-button
              >

              <el-button
                size="mini"
                type="text"
                v-permission="'manage.menu.update'"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                class="text-delete"
                v-permission="'manage.menu.destroy'"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <div class="lv-dialog">
      <el-dialog
        v-dialogDrag
        :title="dialogIsEdit ? '修改菜单' : '新增菜单'"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleDialogClose"
      >
        <menu-form
          :is-edit="dialogIsEdit"
          :menu-data="menuData"
          :parent-id="menuParentId"
          ref="menuForm"
        />
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="handleDialogClose">关闭</el-button>
          <el-button type="primary" size="small" @click="submitForm"
            >保存</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import menuApi from "@/api/menu";
import { deepTree } from "@/library/utils";
import menuForm from "@/view/system/components/menuForm";
export default {
  name: "menuList",
  components: {
    menuForm,
  },
  data() {
    return {
      tableList: [],
      tableLoading: true,
      menuType: ["目录", "菜单", "权限"],
      dialogVisible: false,
      dialogIsEdit: false,
      menuParentId: "",
      menuData: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      menuApi
        .getList()
        .then((res) => {
          this.tableList = deepTree(res.data);
          this.tableLoading = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.tableLoading = false;
        });
    },
    refresh() {
      this.tableLoading = true;
      this.getList();
    },
    handleRowAdd(index, row) {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
      this.menuParentId = row.menuId;
      this.menuData = {};
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
      this.menuParentId = "";
      this.menuData = {};
    },
    //修改
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogIsEdit = true;
      this.menuParentId = "";
      this.menuData = row;
    },
    handleDelete(index, row) {
      console.log("删除", index, row);
      this.$confirm(`此操作将永久删除选中数据，是否继续？`, "提示", {
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            menuApi
              .doDelete(row.menuId)
              .then((res) => {
                this.$message({
                  message: res.message,
                  type: "success",
                  onClose: () => {
                    this.refresh();
                  },
                });
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        })
        .catch(() => null);
    },
    handleDialogClose() {
      this.dialogVisible = false;
      this.dialogIsEdit = false;
      this.menuParentId = "";
      this.menuData = {};
      //关闭dialog，清空表单。否则下次弹窗，表单数据还在
      this.$refs.menuForm.$refs.form.resetFields();
    },
    submitForm() {
      this.$refs.menuForm.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          return false;
        }
      });
    },
    submitData() {
      const formData = this.$refs.menuForm._data.menuForm;
      if (this.dialogIsEdit && this.menuData.menuId) {
        menuApi
          .doUpdate(this.menuData.menuId, formData)
          .then((res) => {
            this.handleDialogClose();
            this.refresh();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        menuApi
          .doStore(formData)
          .then((res) => {
            this.handleDialogClose();
            this.refresh();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
  },
};
</script>
