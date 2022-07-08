import { isFunction, isNumber } from "lodash-es";

/**
 * 生成 placeholder
 * @param {String} component  组件名称
 * @returns 
 */
export function createPlaceholderMessage(component) {
    if (component.includes('Input')) {
        return "请输入"
    }
    if (component.includes('DatePicker')) {
        return '请选择日期'
    }
    if (component.includes('TimeSelect') || component.includes('TimePicker')) {
        return '请选择时间'
    }
    if (component.includes('Select') || component.includes('Cascader')) {
        return "请选择"
    }
    return "";
}
/**
 * 获取插槽以防止空错误
 * @param {*} slots 
 * @param {*} slot 
 * @param {*} data 
 * @returns 
 */
export function getSlot(slots, slot = 'default', data) {
    if (!slots || !Reflect.has(slots, slot)) {
        return null;
    }
    if (!isFunction(slots[slot])) {
        console.error(`${slot} is not a function!`);
        return null;
    }
    const slotFn = slots[slot];
    if (!slotFn) return null;
    return slotFn(data)
}
/**
 * 获取动态 props
 * @param {*} props formRef props
 * @returns 
 */
export function getDynamicProps(props) {
    const ret = {}
    Object.keys(props).map(key => {
        ret[key] = unref(props)[key]
    })
    return ret
}

export function handleInputNumberValue(component, val) {
    if (!component) return val
    if (['Input'].includes(component)) {
        return val && isNumber(val) ? `${val}` : val
    }
    return val
}

