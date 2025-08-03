import { create } from "zustand";

interface SelectedFileState {
    selectedFileId: string | null;
    setSelectedFileId: (id: string | null) => void;
}

export const useSelectedFile = create<SelectedFileState>((set) => ({
    selectedFileId: null,
    setSelectedFileId: (id) => set({ selectedFileId: id }),
}));
