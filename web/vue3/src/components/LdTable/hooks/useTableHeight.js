import { ref, unref } from "vue";
/**
 * 更新表格最大高度，让表格在浏览器可视范围内 
 * @param {elem} tableRef 表格ref
 * @param {Number} defHeight 表格默认要扣除的高度
 * @returns 
 */
export function useTableHeight(tableRef, defHeight = 15) {
    const maxHeight = ref(0)
    //更新表格高度
    async function updateHeight() {
        const vm = unref(tableRef);
        let element = null;
        if (vm) {
            let _h = defHeight;
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
    }

    return { maxHeight, updateHeight }
}