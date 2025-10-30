"use client";
import { useCounterStore } from "@/providers/counter-store-provider";

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.incrementCount);
  const decrement = useCounterStore((state) => state.decrementCount);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold">Count: {count}</h2>
      <div className="space-x-4">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}
