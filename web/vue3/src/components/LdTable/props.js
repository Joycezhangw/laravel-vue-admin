import VueTypes from "vue-types";

export const basicProps = {
    api: {
        type: Function,
        default: null
    },//接口api
    size: VueTypes.oneOf(['', 'large', 'default', 'small']).def('default'),//表格尺寸
    columns: VueTypes.array.def([]),//表格列
    pagination: VueTypes.bool.def(true),//是否显示分页
    paginationProps: VueTypes.object.def({}),//分页配置
    emptyDesc: VueTypes.string.def('暂无数据'),//数据为空提示
    deductHeight: VueTypes.number.def(15),//表格默认要扣除的高度
    rowKey: VueTypes.string.def(''),
    afterFetch: {//请求之后对返回值进行处理
        type: Function,
        default: null,
    },
    border: VueTypes.bool.def(true),//是否显示边框
    stripe: VueTypes.bool.def(true),//是否显示斑马线
    headerCellStyle: VueTypes.object.def({ background: "#f5f7fa", color: "#606266" }),//表头样式
}