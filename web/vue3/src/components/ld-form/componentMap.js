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
    ElTreeSelect,
    ElDivider
} from 'element-plus'

import RadioGroup from './components/RadioGroup'
import CheckboxGroup from './components/CheckboxGroup'
import ApiSelect from './components/ApiSelect'
import ApiTreeSelect from './components/ApiTreeSelect'
import Select from './components/Select'

const componentMap = new Map();
componentMap.set('Input', ElInput);
componentMap.set('Switch', ElSwitch);

componentMap.set('Radio', ElRadio);
componentMap.set('RadioGroup', RadioGroup)

componentMap.set('InputNumber', ElInputNumber);
componentMap.set('Rate', ElRate);
componentMap.set('Cascader', ElCascader);
componentMap.set('Checkbox', ElCheckbox);
componentMap.set('CheckboxGroup', CheckboxGroup);
componentMap.set('DatePicker', ElDatePicker);
componentMap.set('TimeSelect', ElTimeSelect);
componentMap.set('TimePicker', ElTimePicker);

componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect)

componentMap.set('Select', Select)
componentMap.set('TreeSelect', ElTreeSelect)

componentMap.set('Divider', ElDivider)

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
