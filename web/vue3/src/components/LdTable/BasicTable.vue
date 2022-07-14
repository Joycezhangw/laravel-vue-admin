<template>
  <el-row type="flex"> </el-row>
  <el-row type="flex">
    <el-table
      ref="tableRef"
      :max-height="maxHeight"
      v-loading="getLoading"
      v-bind="getTableBindValues"
      :data="getDataSourceRef"
    >
      <template v-for="column in getColumn" :key="column.prop">
        <TableColumns :column="column">
          <template v-if="column.slot" #default="scope">
            <slot :name="column.slot" v-bind="scope"></slot>
          </template>
        </TableColumns>
      </template>
      <template #empty>
        <ld-empty :description="emptyDesc" />
      </template>
    </el-table>
  </el-row>
  <el-row type="flex" v-if="pagination">
    <div class="flex1"></div>
    <el-pagination
      @size-change="handlePageSize"
      @current-change="handlePageCurrentChange"
      v-bind="getPaginationInfo"
    >
    </el-pagination>
  </el-row>
</template>
<script>
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  unref,
} from "vue";
import { basicProps } from "./props";
import { useTableHeight } from "./hooks/useTableHeight";
import { useLoading } from "./hooks/useLoading";
import { usePagination } from "./hooks/usePagination";
import TableColumns from "./components/TableColumns";
import { useDataSource } from "./hooks/useDataSource";

export default defineComponent({
  name: "LdTable",
  props: basicProps,
  components: {
    TableColumns,
  },
  setup(props, { slots, attrs }) {
    const tableRef = ref(null);
    //表格最大高度
    const { maxHeight, updateHeight } = useTableHeight(
      tableRef,
      props.deductHeight
    );

    console.log("LdTable", slots);

    const getProps = computed(() => {
      return { ...props };
    });

    const getColumn = computed(() => {
      return unref(getProps).columns;
    });

    //表格loading
    const { getLoading, setLoading } = useLoading(getProps);

    const {
      getPaginationInfo,
      setPaginationPage,
      setPaginationPageSize,
      setPaginationTotal,
    } = usePagination(getProps);

    const getTableBindValues = computed(() => {
      let propsData = {
        ...attrs,
        ...unref(getProps),
      };
      return propsData;
    });

    //分页
    const handlePageCurrentChange = (val) => {
      setPaginationPage(val);
    };

    //设置一页显示数量
    const handlePageSize = (val) => {
      setPaginationPageSize(val);
    };

    const { getDataSourceRef, getDataSource, fetch } = useDataSource(getProps, {
      setLoading,
      setPaginationTotal,
    });

    console.log(getDataSourceRef);

    onMounted(() => {
      nextTick(async () => {
        await updateHeight();
      });
    });
    return {
      tableRef,
      maxHeight,
      getLoading,
      getTableBindValues,
      getPaginationInfo,
      handlePageSize,
      handlePageCurrentChange,
      getColumn,
      getDataSourceRef,
    };
  },
});
</script>
