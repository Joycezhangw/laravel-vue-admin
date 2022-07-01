import {
    ElInput,
    ElSwitch,
    ElRadio,
    ElInputNumber,
    ElRate,
    ElCascader,
    ElCheckbox,
    ElDatePicker,
    ElTimeSelect,
    ElTimePicker,
} from 'element-plus'

const componentMap = new Map();
componentMap.set('Input', ElInput);
componentMap.set('Switch', ElSwitch);
componentMap.set('Radio', ElRadio);
componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Rate', ElRate);
componentMap.set('Cascader', ElCascader);
componentMap.set('Checkbox', ElCheckbox);
componentMap.set('DatePicker', ElDatePicker);
componentMap.set('TimeSelect', ElTimeSelect);
componentMap.set('TimePicker', ElTimePicker);

/**
 * 添加组件
 * @param {String} compName 
 * @param {VNode} component 
 */
export function add(compName, component) {
    componentMap.set(compName, component);
}

/**
 * 移除组件
 * @param {String} compName 
 */
export function del(compName) {
    componentMap.delete(compName);
}
export { componentMap }
