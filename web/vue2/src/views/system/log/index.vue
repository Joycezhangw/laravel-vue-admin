<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
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
          :height="maxHeight"
          size="small"
          @sort-change="onSortChange"
          :default-sort="{ prop: 'created_at', order: 'descending' }"
        >
          <el-table-column
            label="用户名"
            align="center"
            width="200"
            prop="manage_username"
          />
          <el-table-column
            label="请求地址"
            align="center"
            width="200"
            show-overflow-tooltip
            prop="log_action"
          />
          <el-table-column
            label="请求参数"
            align="center"
            width="200"
            show-overflow-tooltip
            prop="log_params"
          />
          <el-table-column
            label="请求IP"
            align="center"
            width="200"
            prop="log_ip"
          />
          <el-table-column
            label="创建时间"
            align="center"
            width="150"
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
            prop="created_at"
          />
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
                  class="text-delete"
                  v-permission="'manage.log.destroy'"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
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
  </div>
</template>
<script>
import logApi from "@/api/log";
export default {
  name: "logList",
  data() {
    return {
      maxHeight: 0,
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
    };
  },
  mounted() {
    this.getList();
    this.caleMaxHeight();
  },
  methods: {
    caleMaxHeight() {
      this.$nextTick(() => {
        let rows = document.querySelectorAll(".content-container .el-row");
        let h = 50;
        for (let i = 0; i < rows.length; i++) {
          let f = true;

          for (let j = 0; j < rows[i].childNodes.length; j++) {
            if (rows[i].childNodes[j].className == "lv-table") {
              f = false;
            }
          }

          if (f) {
            h += rows[i].clientHeight + 25;
          }
        }
        this.maxHeight = document.body.clientHeight - h;
      });
    },
    onSearch() {
      this.pagination.page = 1;
      this.getList();
    },
    refresh() {
      this.getList();
    },

    getList() {
      this.tableLoading = true;
      let { pagination, search_text, sort } = this;
      let searchForm = { ...pagination, search_text, ...sort };
      logApi
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
    //删除
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除选中数据，是否继续？`, "提示", {
        type: "warning",
      })
        .then((res) => {
            console.log(res)
          if (res === "confirm") {
            logApi
              .doDelete(row.log_id)
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
  },
};
</script>