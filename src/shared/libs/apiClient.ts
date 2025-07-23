import ky from 'ky';

import { BRIDGE_API } from '../constants/bridgeEndpoints';

/**
 * @file apiClient.ts - 인증이 필요한 API 요청을 위한 ky 클라이언트 인스턴스
 *
 * @description
 * 인증이 필요한 일반 API 요청을 처리하는 ky 인스턴스입니다.
 * 모든 요청은 Next.js 미들웨어(`middleware.ts`)를 통과하는 `/api` 접두사를 가집니다.
 *
 * ### 주요 특징:
 * - **BFF (Backend for Frontend) 패턴**:
 * 클라이언트는 토큰을 직접 다루지 않습니다. 모든 API 요청은 `/api`로 보내지고,
 * 미들웨어가 요청을 가로채 HttpOnly 쿠키의 `accessToken`을 `Authorization` 헤더에 담아 실제 백엔드로 전달합니다.
 * - **자동 토큰 갱신**
 * `accessToken`이 만료되어 백엔드에서 401 에러를 반환하면, 미들웨어가 `refreshToken`을 사용해 자동으로 토큰을 갱신하고 원래 요청을 재시도합니다.
 * - **중앙화된 에러 처리**
 * `beforeError` 훅을 통해 모든 API 요청 실패 시 일관된 에러 처리를 수행합니다. 백엔드가 반환하는 JSON 형태의 에러 메시지를 파싱하여 에러 객체에 담아줍니다.
 *
 * @see /src/middleware.ts - 실제 토큰 처리 및 프록시 로직 포함
 */
export const apiClient = ky.create({
  prefixUrl: BRIDGE_API.PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },

  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;

        try {
          const errorBody = await response.clone().json();
          if (errorBody?.message) {
            error.name = 'APIError';
            error.message = errorBody.message;
          }
        } catch {}
        //! 에러 처리 추가 예정
        // 예: 토큰 만료 시 강제 로그아웃 처리도 가능
        // if (response.status === 401) {
        //   logoutUser(); // 클라이언트 전용 logout 함수 등 호출
        // }

        // 사용자 경험(UX) 중심: 에러 메시지 가공, 토스트 알림, 최종 인증 실패 시 로그아웃 및 페이지 이동 처리.

        return error;
      },
    ],
  },
});
