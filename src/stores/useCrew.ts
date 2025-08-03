import { create } from "zustand";

interface SelectedCrewState {
    selectedCrewId: string;
    setSelectedCrewId: (id: string) => void;
}

export const useSelectedCrew = create<SelectedCrewState>((set) => ({
    selectedCrewId: "",
    setSelectedCrewId: (id) => set({ selectedCrewId: id }),
}));
