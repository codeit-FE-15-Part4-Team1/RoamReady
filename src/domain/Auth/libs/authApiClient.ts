import ky from 'ky';

import { BRIDGE_API } from '@/shared/constants/bridgeEndpoints';
import { formatErrorResponseHooks } from '@/shared/libs/formatErrorResponseHooks';

/**
 * @file authApiClient.ts - 인증 전용 API 요청을 위한 ky 클라이언트 인스턴스
 *
 * @description
 * 로그인, 회원가입 등 **인증 자체를 위한 API 요청**에 사용되는 ky 인스턴스입니다.
 * 요청 경로가 `/api/auth`로 시작하며, 이 경로는 미들웨어의 토큰 인증 및 갱신 로직에서 제외됩니다.
 * 이 클라이언트를 통한 요청은 Next.js 서버의 API 라우트 핸들러 (`/src/app/api/auth/...`)로 직접 전달됩니다.
 *
 * ### 주요 특징:
 * - **인증 전용**: 토큰이 아직 없거나 필요 없는 로그인, 회원가입, 로그아웃 등 인증 관련 API 호출을 담당합니다.
 * - **미들웨어 제외**: `/api/auth` 경로는 Next.js 미들웨어의 토큰 인증 및 갱신 로직에서 제외됩니다.
 * - **중앙화된 에러 처리**: `formatErrorResponseHooks`를 `beforeError` 훅으로 사용하여 모든 API 요청 실패 시 일관된 에러 처리를 수행합니다.
 * 백엔드가 반환하는 JSON 형태의 에러 메시지를 파싱하여 `HTTPError` 객체에 포함시킵니다.
 *
 * ### 기본 설정:
 * - 모든 요청에 `Content-Type: application/json` 헤더를 포함합니다.
 * - 요청 타임아웃을 10초로 설정합니다.
 *
 * @example
 * ```ts
 * 로그인 요청
 * await authApiClient.post('signin', { json: { email, password } });
 *
 * 회원가입 요청
 * await authApiClient.post('signup', { json: { email, nickname, password } });
 * ```
 *
 * @see {@link /src/app/api/auth/signin/route.ts | `src/app/api/auth/signin/route.ts`} - 실제 로그인 처리 및 쿠키 설정 상세
 * @see {@link /src/middleware.ts | `src/middleware.ts`} - `/api/auth` 경로를 제외하는 미들웨어 로직 확인
 */
export const authApiClient = ky.create({
  prefixUrl: BRIDGE_API.AUTH_PREFIX,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: formatErrorResponseHooks,
});
