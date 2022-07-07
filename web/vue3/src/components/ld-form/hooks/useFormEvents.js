import { cloneDeep, isFunction } from "lodash-es";
import { unref, toRaw } from "vue";
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
export function useFormEvents({ emit, getProps, formModel, getSchema, formElRef, defaultValueRef, handleFormValues }) {


    //表单校验
    async function validate() {
        const valid = await unref(formElRef).validate();
        return valid ? handleFormValues(formModel) : false
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
            const isInput = schema?.component && defaultValueComponents.includes(schema.component);
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
            const isAdopt = await validate()
            if (isAdopt) {
                const res = handleFormValues(formModel)
                console.log(emit)
                emit('submit', res)
            }
        } catch (error) {
            console.error('LdForm.handleSubmit', error)
        }
    }

    /**
     * 获取表达那值
     * @returns 
     */
    function getFieldsValue() {
        const formEl = unref(formElRef)
        if (!formEl) return {}
        return handleFormValues(formModel)
    }

    return { resetFields, handleSubmit, validate, getFieldsValue, clearValidate, validateField,scrollToField }
}