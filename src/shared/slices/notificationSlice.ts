import { StateCreator } from 'zustand';

import { BoundState } from '@/shared/store';

export interface NotificationSlice {
  readNotificationIds: number[];
  markAsRead: (ids: number[]) => void;
  removeReadId: (id: number) => void;
  isNewNotification: (ids: number[]) => boolean;
  hasNewNotification: boolean;
  setHasNewNotification: (value: boolean) => void;
}

export const createNotificationSlice: StateCreator<
  BoundState,
  [],
  [],
  NotificationSlice
> = (set, get) => ({
  readNotificationIds: [],
  markAsRead: (ids) =>
    set(() => ({
      readNotificationIds: Array.from(
        new Set([...get().readNotificationIds, ...ids]),
      ),
    })),
  removeReadId: (id) =>
    set(() => ({
      readNotificationIds: get().readNotificationIds.filter(
        (i: number) => i !== id,
      ),
    })),
  isNewNotification: (ids) =>
    ids.some((id) => !get().readNotificationIds.includes(id)),
  hasNewNotification: false,
  setHasNewNotification: (value) => set({ hasNewNotification: value }),
});
