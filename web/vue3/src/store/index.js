import { useAppStore } from "./modules/app";
import { useUserStore } from "./modules/user";

export function useBaseStore() {

    const app = useAppStore();
    const user = useUserStore();

    return { app, user }
}