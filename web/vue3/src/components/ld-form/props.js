import VueTypes from "vue-types";
import { oneOf } from "vue-types";

export const basicProps = {
    schemas: {//表单配置项
        type: Array,
        default: () => []
    },
    rules: {//表单验证规则
        type: Object,
        default: () => { }
    },
    //el-form 自带属性
    labelPosition: oneOf(['right', 'left', 'top']).def('right'),//表单域标签的位置
    labelWidth: VueTypes.string,
    inline: VueTypes.bool.def(false),//行内表单模式
    size: oneOf(['', 'large', 'default', 'small']).def('default'),//用于控制该表单内组件的尺寸
}