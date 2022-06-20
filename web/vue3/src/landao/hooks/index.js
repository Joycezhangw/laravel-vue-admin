import { useRefs } from './dom/useRefs'
import { useRouter, useRoute } from "vue-router";

function useLanDao() {
    const { refs, setRefs } = useRefs();

    // 路由
    const route = useRoute();

    // 路由器
    const router = useRouter();

    return {
        route,
        router,
        refs,
        setRefs
    };
}

export { useRefs, useLanDao };
export * from './state/useToggle'
export * from './state/useBoolean'
export * from './useRequest'
export * from './useCrypto'
