import { useAppStore } from "./app";

export function useBaseStore() {

    const app = useAppStore();

    return { app }
}