import ky from 'ky';

/**
 * `apiClient`는 ky 라이브러리로 만든 기본 API 클라이언트 인스턴스입니다.
 *
 * - `prefixUrl`은 환경 변수 `NEXT_PUBLIC_API_BASE_URL`을 기본 API 주소로 사용합니다.
 * - `timeout`은 요청 제한 시간을 10,000ms (10초)로 설정합니다.
 * - 모든 요청에 `'Content-Type': 'application/json'` 헤더를 기본으로 포함합니다.
 * - `beforeError` 훅을 통해 모든 HTTP 오류를 통합 처리합니다.
 * - 필요 시 `credentials` 옵션을 주석 해제하여 쿠키 등 인증 정보를 포함할 수 있습니다.
 *
 * ### 사용 예시
 *
 * ```ts
 * const users = await apiClient.get('users').json();
 * const data = await apiClient.post('login', { json: { email, password } }).json();
 * ```
 */
export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // credentials: 'include', // 인증 쿠키 필요 시 활성화

  hooks: {
    /**
     * HTTP 에러가 발생했을 때 실행되는 훅입니다.
     * 에러 내용을 통일된 형태로 변환하거나 로깅할 수 있습니다.
     */
    beforeError: [
      async (error) => {
        const { response } = error;

        try {
          const errorBody = await response.clone().json();

          // 에러 응답 내 message 필드가 있으면 메시지 포함시킴
          if (errorBody?.message) {
            error.name = 'APIError';
            error.message = errorBody.message;
          }
        } catch {
          // JSON 파싱 실패시 무시 (text 또는 빈 응답일 수 있음)
        }

        // 예: 토큰 만료 시 강제 로그아웃 처리도 가능
        // if (response.status === 401) {
        //   logoutUser(); // 클라이언트 전용 logout 함수 등 호출
        // }

        return error;
      },
    ],
  },
});
