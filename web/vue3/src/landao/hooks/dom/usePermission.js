import { isString } from "@/landao/utils/is";
import { useBaseStore } from "@/store";

export function usePermission() {

    function hasPermission(permission) {
        const { menu } = useBaseStore();
        return menu.permission.some(val => {
            return val === permission
        })
    }

    function hasAuth(value) {
        if (isString(value)) {
            return hasPermission(value)
        } else {
            return value.some(item => {
                return hasPermission(item)
            })
        }
    }

    function hasAuthAll(value) {
        const auth = value.every(item => {
            return hasPermission(item)
        })
        return auth
    }

    return { hasAuth, hasAuthAll }
}