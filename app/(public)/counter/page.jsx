// app/(public)/counter/page.jsx
"use client";

import { CounterStoreProvider } from "@/providers/counter-store-provider";
import Counter from "./counter";

export default function CounterPage() {
  return (
    <CounterStoreProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Counter />
      </div>
    </CounterStoreProvider>
  );
}
