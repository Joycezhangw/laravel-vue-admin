<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
      <el-button
        type="primary"
        v-permission="'manage.dept.store'"
        size="mini"
        @click="handleAdd()"
        >新增</el-button
      >
      <div class="lv-flex1"></div>
    </el-row>
    <el-row>
      <div class="lv-table">
        <el-table
          :data="tableList"
          v-loading="tableLoading"
          :border="true"
          size="small"
          row-key="dept_id"
        >
          <el-table-column
            label="部门名"
            align="left"
            width="300"
            prop="dept_name"
          ></el-table-column>
          <el-table-column
            label="备注"
            align="center"
            prop="dept_desc"
          ></el-table-column>
          <el-table-column
            label="排序"
            align="left"
            width="80"
            prop="dept_order"
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
                v-permission="'manage.dept.store'"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                class="text-delete"
                v-permission="'manage.dept.destroy'"
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
        :title="dialogIsEdit ? '修改部门' : '新增部门'"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleDialogClose"
        :close-on-click-modal="false"
      >
        <dept-form
          ref="deptForm"
          :is-edit="dialogIsEdit"
          :dept-data="deptData"
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
import deptApi from "@/api/dept";
import { deepTree } from "@/library/utils";
import deptForm from "@/view/system/components/deptForm";
export default {
  name: "deptList",
  components: {
    deptForm,
  },
  data() {
    return {
      tableList: [],
      tableLoading: true,
      dialogVisible: false,
      dialogIsEdit: false,
      deptData: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    refresh() {
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
      this.deptData = {};
    },
    //关闭窗口
    handleDialogClose() {
      this.dialogVisible = false;
      this.dialogIsEdit = false;
      this.deptData = {};
      //关闭dialog，清空表单。否则下次弹窗，表单数据还在
      this.$refs.deptForm.$refs.form.resetFields();
    },
    //删除
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除选中数据，是否继续？`, "提示", {
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            deptApi
              .doDelete(row.dept_id)
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
    //修改
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogIsEdit = true;
      this.deptData = row;
    },
    //列表
    async getList() {
      this.tableLoading = true;
      await deptApi
        .getList()
        .then((res) => {
          this.tableList = deepTree(
            res.data,
            "dept_id",
            "parent_id",
            "dept_order"
          );
          this.tableLoading = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.tableLoading = false;
        });
    },
    submitForm() {
      this.$refs.deptForm.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          return false;
        }
      });
    },
    async submitData() {
      const formData = this.$refs.deptForm._data.deptForm;
      if (this.dialogIsEdit && this.deptData.dept_id) {
        await deptApi
          .doUpdate(this.deptData.dept_id, formData)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.message,
              onClose: () => {
                this.handleDialogClose();
                this.$refs.deptForm.$refs.deptTree.refresh();
                this.refresh();
              },
            });
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        await deptApi
          .doStore(formData)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.message,
              onClose: () => {
                this.handleDialogClose();
                this.$refs.deptForm.$refs.deptTree.refresh();
                this.refresh();
              },
            });
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
  },
};
</script>