//注入组件事件
import { createContext, useContext } from "@/landao/hooks/core/useContext";

const key = Symbol();
export function createFormContext(context) {
    return createContext(context, key)
}

export function useFormContext() {
    return useContext(key)
}