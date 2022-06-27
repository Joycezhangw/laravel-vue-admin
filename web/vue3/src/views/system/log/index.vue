<template>
  <div class="app-container">
    <ld-table
      ref="logTableRef"
      :service-api="serviceApi"
      :table-config="tableConfig"
      :filter-data="filterData"
    >
      <template #filter>
        <el-form-item>
          <el-input
            class="ld-search-key__input"
            v-model="filterData.search_text"
            placeholder="请输入用户名称"
            clearable
            size="small"
          />
        </el-form-item>
      </template>
      <template v-slot:handleSlot="{ scopeData }">
        <el-button type="danger" size="small" @click="handleDel(scopeData.row)"
          >删除</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleEdit(scopeData.row)"
          >编辑</el-button
        >
      </template>
    </ld-table>
  </div>
</template>
<script>
import { LogService } from "@/service";
import { reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  setup() {
    const filterData = reactive({ search_text: "" });
    const logTableRef = ref();
    const tableConfig = {
      attrs: {
        rowKey: "log_id", //表格索引
        size: "small", //表格和搜索表单尺寸
      },
      columns: [
        {
          title: "#",
          width: 200,
          align: "center",
          type: "index",
        },
        {
          title: "用户名",
          width: 200,
          align: "center",
          field: "manage_username",
        },
        {
          title: "请求地址",
          width: 200,
          field: "log_action",
        },
        {
          title: "请求参数",
          width: 200,
          field: "log_params",
        },
        {
          title: "请求IP",
          width: 200,
          field: "log_ip",
        },
        {
          title: "创建时间",
          width: 150,
          field: "created_at",
        },
        {
          title: "操作",
          slot: "handleSlot",
        },
      ],
    };

    //删除日志
    const handleDel = (row) => {
      ElMessageBox.confirm("此操作将永久删除选中数据，是否继续？", "提示", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          LogService.doDelete(row.log_id)
            .then((res) => {
              if (logTableRef) {
                logTableRef.value.refresh();
              }
            })
            .catch((err) => {
              ElMessage.error(err);
            });
        })
        .catch(() => {});
    };
    const handleEdit = (row) => {
      console.log("修改", row);
    };

    const serviceApi = LogService.getList;

    return {
      tableConfig,
      handleDel,
      handleEdit,
      serviceApi,
      filterData,
      logTableRef,
    };
  },
};
</script>
