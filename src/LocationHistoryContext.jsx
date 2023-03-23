import { useContext } from "preact/hooks";
import { createContext } from "preact";

// HistoyContext
export const LocationHistoryContext = createContext(null);

export const useLocationCtx = () => {
    const ctx = useContext(LocationHistoryContext);
    if (!ctx) {
        throw new Error("useLocationCtx must be used within a LocationHistoryContext");
    }
    return ctx;
}
