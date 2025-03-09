/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type CounterStore = {
  count: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  asyncIncrease: () => Promise<void>;
  fetchData: () => Promise<void>;
  isHydrated: boolean;
  data: any;
};

export const useCounterStore = create<CounterStore>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        data: null,
        isLoading: false,
        isHydrated: false,
        setIsLoading: (isLoading: boolean) => set({ isLoading }),
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
        asyncIncrease: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set((state) => ({ count: state.count + 1 }));
        },
        fetchData: async () => {
          set({ isLoading: true });
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
          );
          const data = await response.json();
          set({ data: data });
          set({ isLoading: false });
        },
      }),
      {
        name: "counter-storage",
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isHydrated = true;
          }
        },
      }
    )
  )
);

useCounterStore.getState().fetchData();
