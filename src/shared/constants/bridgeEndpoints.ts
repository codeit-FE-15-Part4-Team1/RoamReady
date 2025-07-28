/**
 * @file bridgeEndpoints.ts
 * @description
 * 클라이언트(브라우저)에서 호출하는 내부 API(BFF) 엔드포인트를 정의합니다.
 * 이 경로들은 Next.js 서버의 API 라우트 핸들러로 연결되는 "다리" 역할을 합니다.
 *
 * ### 주요 프로퍼티:
 * - `PREFIX`: 인증이 필요한 일반 API 요청에 사용되는 기본 접두사입니다. (값: '/api')
 * - **사용처**: `apiClient`의 `prefixUrl` 설정
 *
 * - `AUTH_PREFIX`: 인증(Auth) 관련 API 요청에 사용되는 전용 접두사입니다. (값: '/api/auth')
 * - **사용처**: `authApiClient`의 `prefixUrl` 설정
 *
 * - `AUTH`: 인증 도메인의 상세 엔드포인트 모음입니다. `AUTH_PREFIX` 뒤에 조합하여 사용합니다.
 * - `SIGNUP`: 회원가입 경로 (-> /api/auth/signup)
 * - `SIGNIN`: 로그인 경로 (-> /api/auth/signin)
 * - `SIGNOUT`: 로그아웃 경로 (-> /api/auth/signout)
 */
export const BRIDGE_API = {
  PREFIX: '/api',
  AUTH_PREFIX: '/api/auth',

  AUTH: {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    SIGNOUT: 'signout',
  },
};
