import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export const defaultInitState = {
  count: 0,
};

export const createCounterStore = (initState = defaultInitState) => {
  return createStore(
    persist(
      (set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
      }),
      {
        name: "counter-storage", // key name in localStorage
        partialize: (state) => ({ count: state.count }), // optional: choose what to save
      }
    )
  );
};
