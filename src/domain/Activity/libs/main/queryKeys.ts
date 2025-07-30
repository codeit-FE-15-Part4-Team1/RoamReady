export const activitiesKeys = {
  all: ['activities'] as const,
  lists: () => [...activitiesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) =>
    [...activitiesKeys.lists(), params] as const,
};
