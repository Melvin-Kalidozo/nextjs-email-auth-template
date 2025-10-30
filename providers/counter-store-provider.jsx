// src/providers/counter-store-provider.jsx
"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createCounterStore } from "../store/counter-store";

// Create context
export const CounterStoreContext = createContext(undefined);

// Provider component
export const CounterStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createCounterStore();
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

// Hook for consuming the store
export const useCounterStore = (selector) => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (!counterStoreContext) {
    throw new Error("useCounterStore must be used within CounterStoreProvider");
  }

  return useStore(counterStoreContext, selector);
};
