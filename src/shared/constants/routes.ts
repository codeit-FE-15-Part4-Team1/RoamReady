export const ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ACTIVITIES: {
    ROOT: '/activities',
    DETAIL: (id: number) => `/activities/${id}`,
  },
  MYPAGE: {
    ROOT: '/mypage',
    EXPERIENCES: '/mypage/experiences',
    EXPERIENCES_DELETE: '/mypage/experiences/delete',
    EXPERIENCES_CREATE: '/mypage/experiences/create',
    EXPERIENCES_EDIT: (id: number) => `/mypage/experiences/edit/${id}`,
    INFO: '/mypage/info',
    RESERVATIONS: '/mypage/reservations',
    RESERVATIONS_STATUS: '/mypage/reservations-status',
  },
};

/**
 * @description OAuth 및 기타 에러 상황 시 리디렉션 URL에 포함될 에러 코드 상수입니다.
 * 서버(API 라우트)는 이 코드를 URL 쿼리 파라미터(`?error=...`)에 담아 클라이언트로 리디렉션시키고,
 * 클라이언트 페이지는 이 코드를 읽어 적절한 사용자 피드백(토스트 메시지 등)을 표시합니다.
 *
 * ### 에러 코드 상세
 * - `OAUTH_ALREADY_EXISTS`: OAuth 시도 시 이미 가입된 계정일 경우 (HTTP 409 Conflict)
 * - `OAUTH_NOT_A_MEMBER`: OAuth 시도 시 가입되지 않은 계정일 경우 (HTTP 404 Not Found)
 * - `OAUTH_KAKAO_FAILED`: 카카오 서버와의 인증 과정 자체에서 실패했을 경우
 * - `OAUTH_INVALID_CODE`: 카카오로부터 받은 인가 코드가 유효하지 않을 경우
 * - `OAUTH_INVALID_STATE`: OAuth 요청의 state 파라미터가 유효하지 않을 경우
 */
export const ERROR_CODES = {
  OAUTH_ALREADY_EXISTS: 'already_exists',
  OAUTH_NOT_A_MEMBER: 'not_a_member',
  OAUTH_KAKAO_FAILED: 'kakao_failed',
  OAUTH_INVALID_CODE: 'invalid_code',
  OAUTH_INVALID_STATE: 'invalid_state',
  SESSION_EXPIRED: 'session_expired',
};

/**
 * @description OAuth 에러 코드와 사용자에게 보여줄 메시지를 매핑하는 객체입니다.
 * 클라이언트 페이지(예: signin/page.tsx)는 URL에서 에러 코드를 읽은 후,
 * 이 객체를 참조하여 사용자에게 보여줄 적절한 토스트 메시지를 결정합니다.
 */
export const REDIRECT_ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.OAUTH_ALREADY_EXISTS]: '이미 가입된 계정입니다. 로그인해주세요.',
  [ERROR_CODES.OAUTH_NOT_A_MEMBER]:
    '가입되지 않은 계정입니다. 회원가입을 진행해주세요.',
  [ERROR_CODES.OAUTH_KAKAO_FAILED]:
    '카카오 인증에 실패했습니다. 잠시 후 다시 시도해주세요.',
  [ERROR_CODES.SESSION_EXPIRED]:
    '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
};

/**
 * OAuth 에러 처리 시, 특정 에러 코드에 해당하지 않는 모든 경우에 사용될 기본 에러 메시지입니다.
 */
export const DEFAULT_REDIRECT_ERROR_MESSAGE =
  '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
