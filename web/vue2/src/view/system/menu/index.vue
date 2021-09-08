<template>
  <div class="content-container">
    <el-row type="flex">
      <el-button size="mini" @click="refresh()">刷新</el-button>
      <el-button type="primary" size="mini" @click="handleAdd()"
        >新增</el-button
      >
    </el-row>
    <el-row>
      <div class="lv-table">
        <el-table
          :data="tableList"
          v-loading="tableLoading"
          :border="true"
          size="mini"
          row-key="menuId"
        >
          <el-table-column
            label="名称"
            align="left"
            width="200"
            prop="meta.title"
          ></el-table-column>
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
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                class="text-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-dialog
      v-dialogDrag
      :title="dialogIsEdit ? '修改菜单' : '新增菜单'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <menu-form :is-Edit="dialogIsEdit" ref="menuForm" />
      <div slot="footer" class="dialog-footer">
        <el-button size="small">关闭</el-button>
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </el-dialog>
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
    handleAdd() {
      this.dialogVisible = true;
      this.dialogIsEdit = false;
    },
    //修改
    handleEdit(index, row) {
      console.log("修改", index, row);
    },
    handleDelete(index, row) {
      console.log("删除", index, row);
    },
  },
};
</script>
