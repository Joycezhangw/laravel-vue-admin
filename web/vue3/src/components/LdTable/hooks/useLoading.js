import { ref, unref, computed, watch } from "vue";
/**
 * 设置表格loading
 * @param {Object} tableProps 
 * @returns 
 */
export function useLoading(tableProps) {
    const loadingRef = ref(unref(tableProps).loading ?? false);

    watch(
        () => unref(tableProps).loading,
        (loading) => {
            loadingRef.value = loading
        }
    )

    const getLoading = computed(() => unref(loadingRef))

    function setLoading(loading) {
        loadingRef.value = loading
    }
    return { getLoading, setLoading }
}