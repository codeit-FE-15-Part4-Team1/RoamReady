export const activitiesKeys = {
  all: ['activities'] as const,
  lists: () => [...activitiesKeys.all, 'list'] as const,
  list: (params: any) => [...activitiesKeys.lists(), params] as const,
};
