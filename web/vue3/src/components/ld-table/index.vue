<template>
  <el-row type="flex">
    <el-button size="small" @click="refresh()">刷新</el-button>
    <!--其他操作按钮-->
    <slot name="toolbar"></slot>
    <div class="flex1"></div>
    <!--搜索表单-->
    <div class="ld-search-key">
      <el-form
        ref="filterFormRef"
        class="ld-search-key__form"
        :model="filterData"
        :inline="true"
        :size="tableConfig.attrs.size || 'small'"
      >
        <slot name="filter"></slot>
        <el-form-item>
          <el-button
            :icon="Search"
            type="primary"
            :loading="loading"
            @click="searchData()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-row>
  <el-row type="flex">
    <el-table
      ref="tableRef"
      :border="true"
      stripe
      :size="tableConfig.attrs.size || 'small'"
      v-loading="loading"
      :row-key="tableConfig.attrs.rowKey"
      :data="tableData"
      :max-height="maxHeight"
      :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
    >
      <template v-for="column in tableConfig.columns" :key="column.field">
        <!--表格数据有序序号-->
        <el-table-column
          v-if="column.type == 'index' && column.title == '#'"
          :label="column.title"
          align="center"
          width="50"
        >
          <template #default="scope">
            {{ buildTableIndex(scope) }}
          </template>
        </el-table-column>
        <!--表格数据显示-->
        <el-table-column
          v-if="!column.slot && !column.type"
          :prop="column.field"
          :label="column.title"
          :fixed="column.fixed || false"
          :align="column.align || 'left'"
          :width="column.width || ''"
          :show-overflow-tooltip="column.isTooltip || true"
        >
        </el-table-column>
        <!--表格插槽，一般用于修改、删除某条数据-->
        <el-table-column
          v-if="column.slot && !column.type"
          :label="column.title"
          :fixed="column.fixed || false"
          :align="column.align || 'left'"
          :width="column.width || ''"
        >
          <template #default="scope">
            <slot :name="column.slot" :scopeData="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <ld-empty />
      </template>
    </el-table>
  </el-row>
  <el-row type="flex" v-if="isPagination">
    <div class="flex1"></div>
    <el-pagination
      :background="true"
      small
      @size-change="handleSize"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :page-size="pagination.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-row>
</template>
<script lang="jsx">
import { useRequest } from "@/landao/hooks";
import { ElMessage } from "element-plus";
import {
  onMounted,
  reactive,
  ref,
  nextTick,
  defineComponent,
  unref,
} from "vue";
import { Search } from "@element-plus/icons-vue";
export default defineComponent({
  name: "LdTable",
  components: {
    Search,
  },
  props: {
    serviceApi: {
      type: Function,
      required: true,
    },
    tableConfig: {
      type: Object,
      required: true,
    },
    isPagination: {
      //是否分页
      type: Boolean,
      default: true,
    },
    // 筛选参数
    filterData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props, ctx) {
    //表格数据
    const tableData = ref([]);
    //总数
    const total = ref(0);
    //数据表格
    const tableRef = ref(null);
    //表格最大高度
    const maxHeight = ref(0);
    //搜索表单
    const filterFormRef = ref(null);
    //分页
    const pagination = reactive({ page: 1, page_size: 20 });
    //请求
    const { loading, run } = useRequest(props.serviceApi, {
      manual: true,
      onSuccess: (res) => {
        tableData.value = res.data.list;
        total.value = res.data.pagination.total;
      },
      onError: (error) => {
        ElMessage.error(error);
      },
    });

    //刷新数据
    const refresh = () => {
      //清除表单
      resetFilterForm();
      //页码重置为第一页
      pagination.page = 1;
      let searchForm = { ...pagination, ...props.filterData };
      run(searchForm);
    };

    //获取数据
    const fetchData = () => {
      let searchForm = { ...pagination, ...props.filterData };
      run(searchForm);
    };

    //表单搜索
    const searchData = () => {
      //页码重置为第一页
      pagination.page = 1;
      let searchForm = { ...pagination, ...props.filterData };
      fetchData(searchForm);
    };

    //更新表格高度
    function updateHeight() {
      nextTick(() => {
        let vm = tableRef.value;
        let element = null;

        if (vm) {
          let _h = 15;

          // 获取表格上一级元素
          element = vm.$parent.$el;
          // 获取表格上的高度
          _h += element.offsetTop;
          //获取表格下的高度
          let nextEl = element.nextSibling;
          _h += nextEl.clientHeight + 5;
          console.log(_h);
          console.log(element.offsetParent);
          maxHeight.value = element.offsetParent.clientHeight - _h;
        }
      });
    }

    onMounted(() => {
      fetchData();
      updateHeight();
    });

    //分页
    const handleCurrentChange = (val) => {
      pagination.page = val;
      fetchData();
    };
    //设置一页显示数量
    const handleSize = (val) => {
      pagination.page_size = val;
      refresh();
    };

    //清除搜索表单
    function resetFilterForm() {
      if (!filterFormRef) return;
      const formEl = unref(filterFormRef);
      formEl.resetFields();
    }

    //生成表格有序序号
    function buildTableIndex(row) {
      return (
        row.$index +
        1 +
        (parseInt(pagination.page) - 1) * parseInt(pagination.page_size)
      );
    }

    return {
      handleCurrentChange,
      handleSize,
      loading,
      tableData,
      total,
      pagination,
      tableRef,
      maxHeight,
      refresh,
      Search,
      filterFormRef,
      resetFilterForm,
      searchData,
      buildTableIndex,
    };
  },
});
</script>
