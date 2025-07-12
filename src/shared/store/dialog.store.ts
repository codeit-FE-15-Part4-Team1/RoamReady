import { create } from 'zustand';

interface DialogState {
  openDialogs: Record<string, boolean>;
  open: (id: string) => void;
  close: (id: string) => void;
  isOpen: (id: string) => boolean;
}

export const useDialogStore = create<DialogState>((set, get) => ({
  openDialogs: {},
  open: (id: string) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [id]: true },
    })),
  close: (id: string) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [id]: false },
    })),
  isOpen: (id: string) => get().openDialogs[id] || false,
}));
