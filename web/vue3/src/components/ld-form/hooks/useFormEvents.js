import { cloneDeep, uniqBy, isFunction, isObject, isArray } from "lodash-es";
import { unref, toRaw, nextTick } from "vue";
import { deepMerge } from "@/landao/utils"
import { isNullOrUnDef } from "@/landao/utils/is"
import { handleInputNumberValue } from "../helper";
/**
 * 
 * @param {*} 
 * emit 事件
 * getProps 配置
 * formModel 双向绑定
 * getSchema 表单配置
 * formElRef 表单ref
 *  defaultValueRef 表单默认值
 * handleFormValues  处理表单值
 * @returns 
 */
export function useFormEvents({ emit, getProps, formModel, getSchema, formElRef, schemaRef, defaultValueRef, handleFormValues }) {

    //表单校验
    async function validate() {
        return await unref(formElRef).validate()
    }

    /**
     * 清理某个字段的表单验证信息
     * @param {String} field 
     */
    async function clearValidate(field) {
        await unref(formElRef).clearValidate(field)
    }

    /**
     * 验证具体的某个字段
     * @param {String} filed 字段
     * @returns 
     */
    async function validateField(field) {
        return await unref(formElRef).validateField(field)
    }

    /**
     * 滚动到指定的字段
     * @param {*} field 
     */
    async function scrollToField(field) {
        await unref(formElRef).scrollToField(field)
    }

    //重置表单
    async function resetFields() {
        const formEl = unref(formElRef)
        if (!formEl) return;
        unref(formElRef).resetFields()
        // 默认值不需要重置
        Object.keys(formModel).forEach((key) => {
            const schema = unref(getSchema).find((item) => item.field === key);
            const isInput = schema?.component && ['Input'].includes(schema.component);
            const defaultValue = cloneDeep(defaultValueRef.value[key]);
            formModel[key] = isInput ? defaultValue || '' : defaultValue;
        });
        //清理
        nextTick(() => clearValidate());
        emit('reset', toRaw(formModel))
    }

    //表单提交
    async function handleSubmit(event) {
        event && event.preventDefault();
        //获取自定义表单提交函数
        const { submitFunc } = unref(getProps)
        if (submitFunc && isFunction(submitFunc)) {
            await submitFunc();
            return
        }
        const formEl = unref(formElRef)
        if (!formEl) return
        try {
            await validate().then(valid => {
                const res = handleFormValues(formModel)
                emit('submit', res)
            })
        } catch (error) {
            console.error('LdForm.handleSubmit', error)
        }
    }

    /**
     * 获取表单值
     * @returns 
     */
    function getFieldsValue() {
        const formEl = unref(formElRef)
        if (!formEl) return {}
        return handleFormValues(formModel)
    }

    /**
     * 判断日期组件
     * @param {String} key 组件名称
     * @returns 
     */
    function itemIsDateType(key) {
        return unref(getSchema).some((item) => {
            return item.field === key ? ['DatePicker', 'TimeSelect', 'TimePicker'].includes(item.component) : false
        })
    }

    /**
     * 数据回显，用于编辑表单
     * @param {Object} values 
     */
    async function setFieldsValue(values) {
        const fields = unref(getSchema).map((item) => item.field).filter(Boolean)
        const validKeys = [];

        Object.keys(values).forEach((key) => {
            const schema = unref(getSchema).find((item) => item.field === key)
            let value = values[key]
            const hasKey = Reflect.has(values, key);

            value = handleInputNumberValue(schema?.component, value)

            if (hasKey && fields.includes(key)) {
                //返显格式化时间范围
                if (itemIsDateType(key)) {
                    if (Array.isArray(value)) {
                        const arr = []
                        for (const ele of value) {
                            arr.push(dateUtil(ele))
                        }
                        formModel[key] = arr
                    } else {
                        formModel[key] = dateUtil(value)
                    }
                } else {
                    formModel[key] = value
                }
                validKeys.push(key)
            }
        })
        validateField(validKeys);
    }

    /**
     * 更新表单
     * @param {Object | Array} data 
     * @returns 
     */
    async function updateSchema(data) {
        let updateData = [];
        if (isObject(data)) {
            updateData.push(data)
        }
        if (isArray(data)) {
            updateData = [...data]
        }
        const hasField = updateData.every(
            (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field),
        );
        if (!hasField) {
            console.error('需要更新的 Schema 数组表单，必须包含 field 字段')
            return
        }
        const schema = [];
        updateData.forEach((item) => {
            unref(getSchema).forEach((val) => {
                if (val.field === item.field) {
                    const newSchema = deepMerge(val, item);
                    schema.push(newSchema);
                } else {
                    schema.push(val);
                }
            });
        })
        _setDefaultValue(schema)
        schemaRef.value = uniqBy(schema, 'field')
    }

    /**
     * 私有方法，不对外，设置表单默认值
     * @param {Object | Array} data 
     */
    function _setDefaultValue(data) {
        let schemas = [];
        if (isObject(data)) {
            schemas.push(data);
        }
        if (isArray(data)) {
            schemas = [...data];
        }
        const obj = {};
        const currentFieldsValue = getFieldsValue();
        schemas.forEach((item) => {
            if (
                item.component != 'Divider' &&
                Reflect.has(item, 'field') &&
                item.field &&
                !isNullOrUnDef(item.defaultValue) &&
                !(item.field in currentFieldsValue)
            ) {
                obj[item.field] = item.defaultValue;
            }
        });
        setFieldsValue(obj);
    }

    return { resetFields, handleSubmit, validate, getFieldsValue, clearValidate, validateField, scrollToField, setFieldsValue, updateSchema }
}