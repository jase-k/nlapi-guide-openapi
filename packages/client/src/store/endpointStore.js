import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useEndpointStore = create(
  combine(
    {
      latestEndpoints: Array(9).fill(null),
    },
    (set) => ({
      setEndpoints: (endpoints) => set({ latestEndpoints: endpoints }),
    })
  )
);

export default useEndpointStore;
