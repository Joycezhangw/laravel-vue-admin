import { ref, readonly } from "vue";

/**
 * 用于在两个状态值间切换的 Hook
 * @param {Boolean | string } defaultValue  可选项，传入默认的状态值
 * @param {*} reverseValue  可选项，传入取反的状态值
 */
export function useToggle(defaultValue = false, reverseValue) {
    const state = ref(defaultValue);
    const reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue;
    const setState = (value) => {
        state.value = value;
    }
    //切换返回值
    const toggle = (value) => {
        if (value === undefined) {
            value = state.value === defaultValue ? reverseValueOrigin : defaultValue
        }
        setState(value)
    }
    //设置默认值
    const setLeft = () => setState(defaultValue);
    //设置取反值
    const setRight = () => setState(reverseValueOrigin);
    return {
        state: readonly(state),
        toggle,
        setLeft,
        setRight
    }
}