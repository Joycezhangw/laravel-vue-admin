import { usePermission } from "../hooks/dom/usePermission"

export function directives(app) {
    const { hasAuth, hasAuthAll } = usePermission();
    app.directive('auth', {
        mounted: (el, binding) => {
            if (!hasAuth(binding.value)) {
                el.remove()
            }
        }
    });
    app.directive('auth-all', {
        mounted: (el, binding) => {
            if (!hasAuthAll(binding.value)) {
                el.remove()
            }
        }
    })
}