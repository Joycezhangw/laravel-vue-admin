<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
      <el-button
        type="primary"
        v-permission="'manage.role.store'"
        size="mini"
        @click="handleAdd()"
        >新增</el-button
      >
      <div class="lv-flex1"></div>
      <div class="lv-search-key">
        <el-input
          class="lv-search-key__input"
          v-model="search_text"
          placeholder="请输入角色名称"
          clearable
          size="mini"
          style="250px"
        />

        <el-button
          class="lv-search-key__button"
          type="primary"
          size="mini"
          @click="onSearch"
        >
          搜索
        </el-button>
      </div>
    </el-row>
    <el-row>
      <div class="lv-table">
        <el-table
          :data="tableList"
          v-loading="tableLoading"
          :border="true"
          size="small"
        >
          <el-table-column
            label="角色名"
            align="center"
            width="200"
            prop="role_name"
          />
          <el-table-column label="角色描述" align="center" prop="role_desc" />
          <el-table-column
            label="更新时间"
            align="center"
            width="150"
            prop="updated_at"
          />
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.is_default === 0">
                <el-button
                  size="mini"
                  type="text"
                  v-permission="'manage.role.update'"
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  class="text-delete"
                  v-permission="'manage.role.destroy'"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row type="flex">
      <div class="lv-flex1"></div>
      <el-pagination
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
    <div class="lv-dialog">
      <el-dialog
        v-dialogDrag
        :title="dialogIsEdit ? '修改角色' : '新增角色'"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleDialogClose"
        :close-on-click-modal="false"
      >
        <role-form
          :is-edit="dialogIsEdit"
          :role-data="roleData"
          ref="roleForm"
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
import roleApi from "@/api/role";
import roleForm from "@/view/system/components/roleForm";
export default {
  name: "roleList",
  components: {
    roleForm,
  },
  data() {
    return {
      tableList: [],
      tableLoading: true,
      search_text: "",
      total: 0,
      pagination: {
        page: 1,
        page_size: 20,
      },
      sort: {
        order: "updated_at",
        sort: "desc",
      },
      dialogVisible: false,
      dialogIsEdit: false,
      roleData: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSearch() {
      if (this.search_text != "") {
        this.pagination.page = 1;
        this.getList();
      }
    },
    refresh() {
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
      this.roleData = {};
    },
    getList() {
      this.tableLoading = true;
      let { pagination, search_text, sort } = this;
      let searchForm = { ...pagination, search_text, ...sort };
      roleApi
        .getList(searchForm)
        .then((res) => {
          this.tableList = res.data.list;
          this.total = res.data.pagination.total;
          this.tableLoading = false;
        })
        .catch((err) => {
          this.$message.error(err);
          this.tableLoading = false;
        });
    },
    handleSizeChange(pageSize) {
      // 每页条数切换
      // 改变每页显示的条数
      this.pagination.page_size = pageSize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pagination.page = 1;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      //页码切换
      this.pagination.page = currentPage;
      this.getList();
    },
    //关闭窗口
    handleDialogClose() {
      this.dialogVisible = false;
      this.dialogIsEdit = false;
      this.roleData = {};
      //关闭dialog，清空表单。否则下次弹窗，表单数据还在
      this.$refs.roleForm.$refs.form.resetFields();
    },
    async handleEdit(index, row) {
      await roleApi
        .getInfo(row.role_id)
        .then((res) => {
          this.roleData = res.data;
          this.dialogVisible = true;
          this.dialogIsEdit = true;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除选中数据，是否继续？`, "提示", {
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            roleApi
              .doDelete(row.role_id)
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
    submitForm() {
      this.$refs.roleForm.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          return false;
        }
      });
    },
    async submitData() {
      const formData = this.$refs.roleForm._data.roleForm;
      if (this.dialogIsEdit && this.roleData.role_id) {
        await roleApi
          .doUpdate(this.roleData.role_id, formData)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.message,
              onClose: () => {
                this.handleDialogClose();
                this.refresh();
              },
            });
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        await roleApi
          .doStore(formData)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.message,
              onClose: () => {
                this.handleDialogClose();
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