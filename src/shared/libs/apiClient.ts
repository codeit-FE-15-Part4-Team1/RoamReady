import ky from 'ky';

import { formatErrorResponseHooks } from '@/shared/libs/formatErrorResponseHooks';

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
 *
 * - **자동 토큰 갱신**
 * `accessToken`이 만료되어 백엔드에서 401 에러를 반환하면, 미들웨어가 `refreshToken`을 사용해 자동으로 토큰을 갱신하고 원래 요청을 재시도합니다.
 *
 * - **중앙화된 에러 처리**
 * `formatErrorResponseHooks`를 `beforeError` 훅으로 사용하여 모든 API 요청 실패 시 일관된 에러 처리를 수행합니다.
 * 백엔드가 반환하는 JSON 형태의 에러 메시지를 파싱하여 `HTTPError` 객체에 포함시킵니다.
 *
 * - **기본 설정**: 모든 요청에 `Content-Type: application/json` 헤더를 포함하며, 10초의 타임아웃을 설정합니다.
 *
 * @see {@link /src/middleware.ts | `middleware.ts`} - 실제 토큰 처리 및 프록시 로직 상세
 */
export const apiClient = ky.create({
  prefixUrl: BRIDGE_API.PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
  hooks: formatErrorResponseHooks,
});
