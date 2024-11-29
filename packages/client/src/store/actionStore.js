import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useActionStore = create(
  combine(
    {
      latestActions: Array(9).fill(null),
    },
    (set) => ({
      setLatestActions: (actions) => set({ latestActions: actions }),
    })
  )
);

export default useActionStore;
