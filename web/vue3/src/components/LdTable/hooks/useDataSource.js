import { isFunction } from "@/landao/utils/is";
import { ref, unref, onMounted, computed } from "vue";

export function useDataSource(propsRef, {
    setLoading,
    setPaginationTotal
}) {
    //数据源
    const dataSourceRef = ref([])

    const getDataSourceRef = computed(() => {
        return unref(dataSourceRef)
    })

    /**
     * 设置数据源
     * @param {*} values 
     */
    function setDataSource(values) {
        dataSourceRef.value = values
    }
    /**
     * 获取api数据
     * @param {Object} params 
     * @returns 
     */
    async function fetch(params = {}) {
        const { api, afterFetch, pagination } = unref(propsRef)
        if (!api || !isFunction(api)) return;

        try {
            setLoading(true)
            //请求
            const res = await api(params);
            const isArrayResult = Array.isArray(res.data);
            let resultItem = [];
            if (isArrayResult) {
                resultItem = res.data;
            } else {
                if (pagination) {
                    //设置总条数
                    setPaginationTotal(data.pagination.total)
                }
                resultItem = res.data.list;
            }
            //对返回值进行处理，比如将数据转成树形数据，或对加密数据进行解密或脱敏
            if (afterFetch && isFunction(afterFetch)) {
                resultItem = (await afterFetch(resultItem)) || resultItem
            }
            setDataSource(resultItem)
        } catch (error) {
            setDataSource([])
            setPaginationTotal(0)
        } finally {
            setLoading(false)
        }
    }

    function getDataSource() {
        return getDataSource.value || []
    }

    onMounted(() => {
        fetch()
    })

    return {
        getDataSourceRef,
        getDataSource,
        fetch
    }
}