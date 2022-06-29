<template>
  <el-row type="flex">
    <div class="flex1 ld-table-toolbar">
      <el-button size="small" @click="refresh()">刷新</el-button>
      <!--其他操作按钮-->
      <template v-if="slot.toolbar">
        <slot name="toolbar"></slot>
      </template>
    </div>
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
      <template v-for="column in tableConfig.columns" :key="column.key">
        <!--表格数据有序序号-->
        <el-table-column
          v-if="column.type == 'index' && column.title == '#'"
          :label="column.title"
          :fixed="column.fixed || false"
          :align="column.align || 'left'"
          width="50"
        >
          <template #default="scope">
            {{ buildTableIndex(scope) }}
          </template>
        </el-table-column>
        <!--表格数据显示-->
        <el-table-column
          v-if="!column.customSlot && !column.type"
          :prop="column.key"
          :label="column.title"
          :fixed="column.fixed || false"
          :align="column.align || 'left'"
          :width="column.width || ''"
          :sortable="column.sortable || false"
          :show-overflow-tooltip="column.isTooltip || true"
        >
        </el-table-column>
        <!--表格插槽，一般用于修改、删除某条数据-->
        <el-table-column
          v-if="column.customSlot && !column.type"
          :label="column.title"
          :fixed="column.fixed || false"
          :align="column.align || 'left'"
          :width="column.width || ''"
        >
          <template #default="scope">
            <slot :name="column.customSlot" :scopeData="scope"></slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <ld-empty />
      </template>
    </el-table>
  </el-row>
  <!--分页-->
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
import { ElMessage } from "element-plus";
import { useSlots } from "vue";
import {
  onMounted,
  reactive,
  ref,
  nextTick,
  defineComponent,
  unref,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRequest } from "@/landao/hooks";
import { isFunction } from "lodash";
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
        try {
          const dataSource = res.data.list ? res.data.list : res.data;
          if (
            props.tableConfig.attrs.formatData &&
            isFunction(props.tableConfig.attrs.formatData)
          ) {
            tableData.value = props.tableConfig.attrs.formatData(dataSource);
          } else {
            tableData.value = dataSource;
          }
          if (props.isPagination) {
            total.value = res.data.pagination.total;
          }
        } catch (error) {
          console.error(error);
        }
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
        const vm = tableRef.value;
        let element = null;

        if (vm) {
          let _h = 15;

          // 获取表格上一级元素
          element = vm.$parent.$el;
          // 获取表格上的高度
          _h += element.offsetTop;
          //TODO：实际上，此处要获取紧跟底部的多个兄弟节点，并累加底部兄弟节点的可视高度
          //获取表格下的dom
          let nextEl = element.nextElementSibling;
          //dom存在，就获取高度
          if (nextEl) {
            _h += nextEl.clientHeight + 5;
          }
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

    /**
     * 清空搜索表单为初始值
     * 此处要注意，在搜索表单 slot 中，需要给 el-form-item 组件添加 prop=""，否则清空表单无效
     */
    function resetFilterForm() {
      if (!filterFormRef) return;
      const formEl = unref(filterFormRef);
      formEl.resetFields();
    }

    /**
     * 生成表格有序序号
     */
    function buildTableIndex(row) {
      //初始有序序号
      let index = row.$index + 1;
      //若存在分页，需要对页码和总条数进行计算当前序号
      if (props.isPagination) {
        index =
          index +
          (parseInt(pagination.page) - 1) * parseInt(pagination.page_size);
      }
      return index;
    }
    const slot = useSlots();
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
      slot,
    };
  },
});
</script>
