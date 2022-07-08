import { unref, toRaw } from "vue"
import { isNullOrUnDef, isObject, isString } from "@/landao/utils/is";
import { dateUtil } from "@/landao/utils/time";
/**
 * 
 * @param {*} {
 *              getSchema 表单配置
 *              formModel 表单双向绑定
 *              defaultValueRef //默认值
 *             } 
 * @returns 
 */
export function useFormValues({ getSchema, formModel, defaultValueRef }) {

    //处理表单值
    function handleFormValues(values) {
        if (!isObject(values)) return {}
        const res = {}
        for (const item of Object.entries(values)) {
            let [, value] = item
            const [key] = item
            if (value instanceof Date) {//处理单个时间格式
                const schema = unref(getSchema).find((item) => item.field === key);
                value = dateUtil(value, schema.formateValue)
            }
            if (isString(value)) value = value.trim()
            res[key] = toRaw(value)
        }
        return handleRangeTimeValue(res)
    }

    // 处理时间段格式
    function handleRangeTimeValue(values) {
        const rangeSchema = unref(getSchema).find((item) => item.component === 'RangePicker')
        if (!rangeSchema || isNullOrUnDef(values[rangeSchema.field])) {
            return values
        }
        const { field, fieldMapToTime, formateValue } = rangeSchema
        const value = toRaw(values[field])

        if (Array.isArray(value)) {
            const arr = []
            for (const ele of value) {
                arr.push(dateUtil(ele, formateValue))
            }
            values[field] = arr
        }
        if (fieldMapToTime && Array.isArray(fieldMapToTime)) {
            const [startTimeKey, endTimeKey] = fieldMapToTime
            const [startTime, endTime] = value
            values[startTimeKey] = dateUtil(startTime, formateValue)
            values[endTimeKey] = dateUtil(endTime, formateValue)
        }
        return values
    }


    //初始化表单model值
    function initDefault() {
        const schemas = unref(getSchema);
        const obj = {};
        schemas.forEach((item) => {
            const { defaultValue } = item;
            //默认值存在的情况下，设置默认值
            if (!isNullOrUnDef(defaultValue)) {
                formModel[item.field] = defaultValue;
                obj[item.field] = defaultValue;
            }
        })
        defaultValueRef.value = obj
    }

    return {
        handleFormValues, initDefault
    }

}