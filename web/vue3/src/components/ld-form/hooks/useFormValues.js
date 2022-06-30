import { unref } from "vue"
import { isNullOrUnDef } from "@/landao/utils/is";

export function useFormValues({ getSchema, formModel }) {

    //初始化表单model值
    function initDefault() {
        const schemas = unref(getSchema);
        schemas.forEach((item) => {
            const { defaultValue, field } = item;
            if (!isNullOrUnDef(defaultValue)) {
                formModel[field] = defaultValue;
            }
        })

    }

    return {
        initDefault
    }

}