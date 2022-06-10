import { ref } from "vue"
import { CryptoJS } from "@/landao/utils";
export function useCryptoJS(defaultValue, defaultAseKey, options) {

    const DefaultOptions = {
        mode: 'encrypt',
        valueType: 'string',
        onSuccess: () => { },
    }

    const finalOptions = { ...DefaultOptions, ...options };
    const { mode, onSuccess } = finalOptions;


    const refValue = ref('');
    let aseValue = '';


    //设置值
    const setValue = (value) => {
        refValue.value = value;
        aseValue = value;
    }


    //对字符串加密
    if (mode === 'encrypt') {
        const encryptValue = CryptoJS.aesEncrypt(defaultValue, defaultAseKey)
        setValue(encryptValue)
        onSuccess(encryptValue, { mode });
    }

    //对字符串进行解密
    if (mode === 'decrypt') {
        const decryptValue = CryptoJS.aesDecrypt(defaultValue, defaultAseKey)
        setValue(decryptValue)
        onSuccess(decryptValue, { mode });
    }


    return {
        refValue,
        aseValue
    }
}