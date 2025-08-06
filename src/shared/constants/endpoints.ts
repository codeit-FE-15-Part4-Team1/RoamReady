/**
 * @file 백엔드 API 엔드포인트 정의 (BFF -> 백엔드 서버)
 * @description
 * BFF(Backend for Frontend) 서버가 실제 백엔드 API 서버와 통신할 때 사용하는 상대 경로들을 상수화한 객체입니다.
 *
 * ### 경로 작성 규칙 (매우 중요)
 * 이 파일에는 두 가지 종류의 경로 형식이 공존하며, 이는 BFF의 처리 방식 차이 때문입니다.
 *
 * #### 1. 슬래시(`/`)가 없는 경로 (일반 API)
 * - **대상**: `ACTIVITIES`, `USERS`, `MY_ACTIVITIES` 등
 * - **사용 주체**: `prefixUrl`이 설정된 서버용 HTTP 클라이언트 (예: `ky` 인스턴스)
 * - **이유**: `prefixUrl`과 조합될 때 이중 슬래시(`//`)가 발생하는 것을 방지하기 위함입니다.
 *
 * #### 2. 슬래시(`/`)가 있는 경로 (`AUTH`, `OAUTH`)
 * - **대상**: `AUTH`, `OAUTH`
 * - **사용 주체**: `fetch`를 통해 URL을 직접 조합하는 로직
 * - **이유**: `prefixUrl` 없이 `fetch(`${BASE_URL}${ENDPOINT}`)` 형태로 URL을 만들기 때문에, 경로가 깨지지 않도록 맨 앞에 `/`를 반드시 포함해야 합니다.
 * (예: `/app/api/auth` 하위 핸들러, `middleware.ts`의 토큰 갱신 로직)
 *
 * @example
 * 1. 슬래시 없는 경로 사용 예 (서버용 ky 클라이언트)
 * const apiClient = ky.create({ prefixUrl: process.env.API_BASE_URL });
 * await apiClient.get(API_ENDPOINTS.USERS.ME);
 *
 * 2. 슬래시 있는 경로 사용 예 (직접 호출)
 * /app/api/auth/signin/route.ts 내부
 * fetch(`${process.env.API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`);
 */
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/users',
    SIGNIN: '/auth/login',
    NEW_TOKEN: '/auth/tokens',
  },

  OAUTH: {
    APPS: '/oauth/apps',
    SIGNUP_PROVIDER: (provider: string) => `/oauth/sign-up/${provider}`,
    SIGNIN_PROVIDER: (provider: string) => `/oauth/sign-in/${provider}`,
  },

  ACTIVITIES: {
    BASE: 'activities',
    IMAGES: 'activities/image',
    DETAIL: (activityId: number) => `activities/${activityId}`,
    RESERVATIONS: (activityId: number) =>
      `activities/${activityId}/reservations`,
    ISSUE: 'activities/issue',
  },

  MY_ACTIVITIES: {
    BASE: 'my-activities',
    DASHBOARD: (activityId: string, year: string, month: string) =>
      `my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
    SCHEDULE: (activityId: number) =>
      `my-activities/${activityId}/reserved-schedule`,
    RESERVATION_DETAIL: (activityId: number) =>
      `my-activities/${activityId}/reservations`,
    ACTIVITY_DETAIL: (activityId: number) => `my-activities/${activityId}`,
    RESERVATION: (activityId: number, reservationId: number) =>
      `my-activities/${activityId}/reservations/${reservationId}`,
  },

  MY_NOTIFICATIONS: {
    BASE: 'my-notifications',
    DETAIL: (notificationId: number) => `my-notifications/${notificationId}`,
  },

  MY_RESERVATIONS: {
    BASE: 'my-reservations',
    DETAIL: (reservationId: number) => `my-reservations/${reservationId}`,
    REVIEW: (reservationId: number) =>
      `my-reservations/${reservationId}/reviews`,
  },

  USERS: {
    DETAIL: (userId: number) => `users/${userId}`,
    ME: 'users/me',
    UPLOAD_IMAGE: 'users/me/image',
  },
};
