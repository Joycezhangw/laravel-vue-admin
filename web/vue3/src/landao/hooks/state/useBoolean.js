import { useToggle } from "./useToggle"
/**
 * 优雅的管理 boolean 状态的 Hook
 * @param {Boolean} defaultVlaue 可选项，传入默认的状态值,默认值false
 */
export function useBoolean(defaultVlaue = false) {
    const { state, toggle } = useToggle(defaultVlaue);
    return {
        state,
        toggle,
        setTrue: () => toggle(true),
        setFalse: () => toggle(false)
    }
}