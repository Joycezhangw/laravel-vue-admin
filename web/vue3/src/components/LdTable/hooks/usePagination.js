import { ref, unref, computed } from "vue"
export function usePagination(props) {
    //分页
    const page = ref(1), pageSize = ref(20), total = ref(0)
    //分页配置
    const getPaginationInfo = computed(() => {
        const defOptions = {
            background: true,
            small: true,
            currentPage: unref(page),
            pageSizes: [10, 20, 30, 40, 50, 100],
            pageSize: unref(pageSize),
            layout: "total, sizes, prev, pager, next, jumper",
            total: unref(total),
        };
        return { ...defOptions, ...props.paginationProps };
    });

    /**
     * 设置第几页
     * @param {Number} val 
     */
    function setPaginationPage(val) {
        page.value = val;
    }

    /**
     * 设置每页显示总数
     * @param {*} val 
     */
    function setPaginationPageSize(val) {
        pageSize.value = val
    }

    /**
     * 设置总条数
     * @param {Number} val 
     */
    function setPaginationTotal(val) {
        total.value = val
    }

    return {
        getPaginationInfo,
        setPaginationPage,
        setPaginationPageSize,
        setPaginationTotal
    }

}