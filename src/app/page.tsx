"use client";

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/zustand/stores/CounterStore";

export default function Home() {
  const {
    count,
    increase,
    decrease,
    reset,
    asyncIncrease,
    isLoading,
    isHydrated,
    data,
  } = useCounterStore();
  if (!isHydrated) {
    return <p>Loading...</p>; // Show loading state until hydration is done
  }
  console.log(!isLoading && data);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <Button onClick={increase}>Increase</Button>
      <Button onClick={decrease}>Decrease</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={() => useCounterStore.setState({ count: 1 })}>
        Set to 1
      </Button>
      <Button onClick={asyncIncrease}>Async Increase</Button>
    </div>
  );
}
