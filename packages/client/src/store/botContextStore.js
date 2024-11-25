import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useBotContextStore = create(
  devtools((set) => ({
    context: [],
    addContext: (newContext) => {
      console.log('Adding context:', newContext);
      set((state) => ({ context: [...state.context, newContext] }));
    },
    removeContext: (contextToRemove) => {
      console.log('Removing context:', contextToRemove);
      set((state) => ({
        context: state.context.filter((context) => context !== contextToRemove),
      }));
    },
  }))
);

export default useBotContextStore;
