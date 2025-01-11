import { create } from "zustand";

export const useUIStore = create((set) => ({
  isUseLoading: false,
  setIsUseLoading: (isUseLoading) => set({ isUseLoading }),
}));
