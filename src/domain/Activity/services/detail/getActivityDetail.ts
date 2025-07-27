export const getActivityDetail = async (activityId: number) => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/activities/${activityId}`,
    {
      next: { tags: ['activity-detail'] },
    },
  );

  if (!res.ok) {
    throw new Error(
      `체험 상세 데이터를 불러오는데 실패했습니다: ${res.statusText}`,
    );
  }

  return res.json();
};
