import { useAppStore } from "./modules/app";
import { useUserStore } from "./modules/user";
import { useMenuStore } from "./modules/menu";

export function useBaseStore() {

    const app = useAppStore();
    const user = useUserStore();
    const menu = useMenuStore();

    return { app, user, menu }
}