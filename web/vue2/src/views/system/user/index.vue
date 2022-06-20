<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
      <el-button
        type="primary"
        v-permission="'manage.user.store'"
        size="mini"
        @click="handleAdd()"
        >新增</el-button
      >
      <div class="lv-flex1"></div>
      <div class="lv-search-key">
        <el-input
          class="lv-search-key__input"
          v-model="search_text"
          placeholder="请输入用户名称"
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
          @sort-change="onSortChange"
          :default-sort="{ prop: 'reg_date', order: 'descending' }"
        >
          <el-table-column
            label="用户名"
            align="center"
            width="150"
            prop="username"
          />
          <el-table-column
            label="真实姓名"
            align="center"
            width="150"
            prop="realname"
          />
          <el-table-column
            label="手机号"
            align="center"
            width="150"
            prop="phone"
          />
          <el-table-column
            label="部门名称"
            align="center"
            width="150"
            prop="nickname"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.department.dept_name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="380" label="角色" align="center">
            <template slot-scope="scope">
              <el-tag
                type="dark"
                size="mini"
                style="margin: 2px"
                v-for="(item, index) in scope.row.roles"
                :key="index"
                >{{ item.role_name }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column width="60" label="状态" align="center">
            <template slot-scope="scope">
              <el-tag
                effect="dark"
                type="success"
                size="mini"
                v-if="scope.row.manage_status === 1"
                >{{ scope.row.manage_status_txt }}</el-tag
              >
              <el-tag
                effect="dark"
                type="danger"
                size="mini"
                v-if="scope.row.manage_status === 0"
                >{{ scope.row.manage_status_txt }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="最近登录IP"
            align="center"
            width="120"
            prop="last_login_ip"
          />
          <el-table-column
            label="最近登录时间"
            align="center"
            width="180"
            prop="last_login_time"
          />
          <el-table-column
            label="创建时间"
            align="center"
            width="180"
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
            prop="reg_date"
          />
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.is_super === 0">
                <el-button
                  size="mini"
                  type="text"
                  v-permission="'manage.user.update'"
                  @click="handleEdit(scope.$index, scope.row)"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  class="text-delete"
                  v-permission="'manage.user.destroy'"
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
    <div class="lv-dialog">
      <el-dialog
        v-dialogDrag
        :title="dialogIsEdit ? '修改用户' : '新增用户'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleDialogClose"
        :close-on-click-modal="false"
      >
        <user-form
          ref="userForm"
          :is-edit="dialogIsEdit"
          :user-data="userData"
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
import userApi from "@/api/user";
import userForm from "@/views/system/components/userForm";
export default {
  name: "userList",
  components: {
    userForm,
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
        order: "reg_date",
        sort: "desc",
      },
      dialogVisible: false,
      dialogIsEdit: false,
      userData: {},
    };
  },
  async mounted() {
    await this.getList();
  },
  methods: {
    onSearch() {
      this.pagination.page = 1;
      this.getList();
    },
    refresh() {
      this.getList();
    },
    //排序
    onSortChange({ prop, order }) {
      if (order === "descending") {
        order = "desc";
      }

      if (order === "ascending") {
        order = "asc";
      }

      if (order) {
        this.pagination.page = 1;
        this.sort.sort = order;
        this.refresh();
      }
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
      this.userData = {};
    },
    //修改
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogIsEdit = true;
      this.userData = row;
    },
    //关闭窗口
    handleDialogClose() {
      this.dialogVisible = false;
      this.dialogIsEdit = false;
      this.userData = {};
      //关闭dialog，清空表单。否则下次弹窗，表单数据还在
      this.$refs.userForm.$refs.form.resetFields();
    },
    async getList() {
      this.tableLoading = true;
      let { pagination, search_text, sort } = this;
      let searchForm = { ...pagination, search_text, ...sort };
      await userApi
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
    //删除
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除选中数据，是否继续？`, "提示", {
        type: "warning",
      })
        .then((res) => {
          if (res === "confirm") {
            userApi
              .doDelete(row.manage_id)
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
      this.$refs.userForm.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          return false;
        }
      });
    },
    async submitData() {
      const formData = this.$refs.userForm._data.userForm;
      if (this.dialogIsEdit && this.userData.manage_id) {
        await userApi
          .doUpdate(this.userData.manage_id, formData)
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
        await userApi
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