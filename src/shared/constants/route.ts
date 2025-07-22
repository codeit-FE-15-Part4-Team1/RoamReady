/**
 * 사이트 내에서 사용하는 주요 라우트 경로 상수 모음입니다.
 * 유지보수성과 오타 방지를 위해 문자열을 상수로 정의해 두었습니다.
 * Login, Signup, Main(/activities), Mypage 경로가 포함되어 있습니다.
 */
export const ROUTES = {
  Login: '/login',
  Signup: '/signup',
  Main: '/activities',
  MYPAGE: {
    ROOT: '/mypage',
    EXPERIENCES: '/mypage/experiences',
    EXPERIENCES_DELETE: '/mypage/experiences/delete',
    EXPERIENCES_EDIT: '/mypage/experiences/edit',
    INFO: '/mypage/info',
    RESERVATIONS: '/mypage/reservations',
    RESERVATIONS_STATUS: '/mypage/reservations-status',
  },
} as const;
