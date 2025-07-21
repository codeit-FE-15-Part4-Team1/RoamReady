export const activity = {
  id: 4783,
  userId: 2003,
  title: '천연 재료로 만드는 감성 비누 만들기',
  description:
    '자연 유래 재료를 활용해 나만의 천연 비누를 만들어보는 감성 공방 체험입니다. 원하는 향과 색상을 선택해 직접 디자인하고, 몰드에 부어 나만의 비누를 완성합니다. 피부 타입에 맞는 재료 선택부터 포장까지, 직접 만드는 즐거움과 힐링을 동시에 느껴보세요. (모든 재료 및 포장 제공, 약 2시간)',
  category: '문화 · 예술',
  price: 39000,
  address: '서울특별시 마포구 성미산로 15길 22',
  bannerImageUrl: '@\\domain\\Activity\\components\\detail\\mock\\mock-1.png',
  rating: 4.0,
  reviewCount: 3,
  createdAt: '2025-07-18T10:30:00.000Z',
  updatedAt: '2025-07-21T08:00:00.000Z',
  subImages: [
    {
      id: 9489,
      imageUrl: '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
    },
    {
      id: 9490,
      imageUrl: '@\\domain\\Activity\\components\\detail\\mock\\mock-3.png',
    },
    {
      id: 9491,
      imageUrl: '@\\domain\\Activity\\components\\detail\\mock\\mock-4.png',
    },
    {
      id: 9492,
      imageUrl: '@\\domain\\Activity\\components\\detail\\mock\\mock-5.png',
    },
  ],
  schedules: [
    {
      id: 20801,
      date: '2025-07-22',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: 20802,
      date: '2025-07-22',
      startTime: '14:00',
      endTime: '16:00',
    },
    {
      id: 20803,
      date: '2025-07-23',
      startTime: '11:00',
      endTime: '13:00',
    },
    {
      id: 20804,
      date: '2025-07-23',
      startTime: '15:00',
      endTime: '17:00',
    },
    {
      id: 20805,
      date: '2025-07-24',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: 20806,
      date: '2025-07-25',
      startTime: '13:00',
      endTime: '15:00',
    },
    {
      id: 20807,
      date: '2025-07-26',
      startTime: '16:00',
      endTime: '18:00',
    },
  ],
};

export const availableSchedule = [
  {
    date: '2025-07-22',
    times: [
      {
        id: 20802,
        startTime: '14:00',
        endTime: '16:00',
      },
    ],
  },
  {
    date: '2025-07-23',
    times: [
      {
        id: 20804,
        startTime: '15:00',
        endTime: '17:00',
      },
    ],
  },
  {
    date: '2025-07-25',
    times: [
      {
        id: 20806,
        startTime: '13:00',
        endTime: '15:00',
      },
      {
        id: 20807,
        startTime: '15:00',
        endTime: '17:00',
      },
      {
        id: 20808,
        startTime: '17:00',
        endTime: '18:00',
      },
      {
        id: 20809,
        startTime: '18:00',
        endTime: '19:00',
      },
    ],
  },
  {
    date: '2025-07-26',
    times: [
      {
        id: 20810,
        startTime: '16:00',
        endTime: '18:00',
      },
    ],
  },
  {
    date: '2025-07-27',
    times: [
      {
        id: 20811,
        startTime: '16:00',
        endTime: '18:00',
      },
    ],
  },
  {
    date: '2025-07-28',
    times: [
      {
        id: 20812,
        startTime: '16:00',
        endTime: '18:00',
      },
    ],
  },
];

export const reviews = {
  reviews: [
    {
      id: 2001,
      user: {
        id: 3001,
        nickname: '유진',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '친구랑 같이 참여했는데 너무 만족했어요! 내가 좋아하는 라벤더 향으로 비누를 만들 수 있어서 특별했고, 천연 재료라 안심하고 사용할 수 있어요. 선생님도 친절하게 하나하나 설명해주셔서 처음인데도 쉽게 따라 할 수 있었습니다.',
      rating: 5,
      createdAt: '2025-07-20T17:15:00.000Z',
      updatedAt: '2025-07-20T17:15:00.000Z',
    },
    {
      id: 2002,
      user: {
        id: 3002,
        nickname: '보라빛달',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '전반적으로 무난했지만 기대보다는 조금 아쉬웠어요. 비누 디자인이 너무 제한적이었고, 포장도 다소 단조로웠습니다. 그래도 비누를 만드는 과정 자체는 힐링이 되었고, 향 선택의 폭이 넓었던 점은 좋았어요.',
      rating: 3,
      createdAt: '2025-07-19T11:00:00.000Z',
      updatedAt: '2025-07-19T11:00:00.000Z',
    },
    {
      id: 2003,
      user: {
        id: 3003,
        nickname: '정호',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '혼자 조용히 참여했는데 마음이 차분해졌어요. 요즘 스트레스가 많았는데 천연 향을 맡으며 손으로 만드는 시간이 정말 소중했습니다. 완성된 비누는 선물용으로도 손색없고, 다음엔 가족이랑 같이 오고 싶어요.',
      rating: 4,
      createdAt: '2025-07-18T16:30:00.000Z',
      updatedAt: '2025-07-18T16:30:00.000Z',
    },
    {
      id: 2201,
      user: {
        id: 3001,
        nickname: '유진',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '친구랑 같이 참여했는데 너무 만족했어요! 내가 좋아하는 라벤더 향으로 비누를 만들 수 있어서 특별했고, 천연 재료라 안심하고 사용할 수 있어요. 선생님도 친절하게 하나하나 설명해주셔서 처음인데도 쉽게 따라 할 수 있었습니다.',
      rating: 5,
      createdAt: '2025-07-20T17:15:00.000Z',
      updatedAt: '2025-07-20T17:15:00.000Z',
    },
    {
      id: 2033,
      user: {
        id: 3001,
        nickname: '유진',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '친구랑 같이 참여했는데 너무 만족했어요! 내가 좋아하는 라벤더 향으로 비누를 만들 수 있어서 특별했고, 천연 재료라 안심하고 사용할 수 있어요. 선생님도 친절하게 하나하나 설명해주셔서 처음인데도 쉽게 따라 할 수 있었습니다.',
      rating: 5,
      createdAt: '2025-07-20T17:15:00.000Z',
      updatedAt: '2025-07-20T17:15:00.000Z',
    },
    {
      id: 2093,
      user: {
        id: 3001,
        nickname: '유진',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '친구랑 같이 참여했는데 너무 만족했어요! 내가 좋아하는 라벤더 향으로 비누를 만들 수 있어서 특별했고, 천연 재료라 안심하고 사용할 수 있어요. 선생님도 친절하게 하나하나 설명해주셔서 처음인데도 쉽게 따라 할 수 있었습니다.',
      rating: 5,
      createdAt: '2025-07-20T17:15:00.000Z',
      updatedAt: '2025-07-20T17:15:00.000Z',
    },
    {
      id: 2099,
      user: {
        id: 3001,
        nickname: '유진',
        profileImageUrl:
          '@\\domain\\Activity\\components\\detail\\mock\\mock-2.png',
      },
      activityId: 4783,
      content:
        '친구랑 같이 참여했는데 너무 만족했어요! 내가 좋아하는 라벤더 향으로 비누를 만들 수 있어서 특별했고, 천연 재료라 안심하고 사용할 수 있어요. 선생님도 친절하게 하나하나 설명해주셔서 처음인데도 쉽게 따라 할 수 있었습니다.',
      rating: 5,
      createdAt: '2025-07-20T17:15:00.000Z',
      updatedAt: '2025-07-20T17:15:00.000Z',
    },
  ],
  totalCount: 7,
  averageRating: 4.0,
};
