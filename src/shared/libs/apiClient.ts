import ky from 'ky';

/**
 * `apiClient`는 ky 라이브러리로 만든 기본 API 클라이언트 인스턴스입니다.
 *
 * - `prefixUrl`은 환경 변수 `NEXT_PUBLIC_API_BASE_URL`을 기본 API 주소로 사용합니다.
 * - `timeout`은 요청 제한 시간을 10,000ms (10초)로 설정합니다.
 * - 모든 요청에 `'Content-Type': 'application/json'` 헤더를 기본으로 포함합니다.
 * - 필요 시 `credentials` 옵션을 주석 해제하여 쿠키 등 인증 정보를 포함할 수 있습니다.
 *
 * ### 사용 예시
 *
 * ```ts
 * // 1. 일반 GET 요청 (경로만)
 * const users = await apiClient.get('users').json();
 *
 * // 2. GET 요청 + 쿼리 스트링
 * const filteredUsers = await apiClient.get('users', {
 *   searchParams: { role: 'admin', active: 'true' },
 * }).json();
 *
 * // 3. POST 요청 + JSON 바디
 * const newUser = await apiClient.post('users', {
 *   json: { name: 'John Doe', email: 'john@example.com' },
 * }).json();
 *
 * // 4. 요청 헤더 추가 지정
 * const dataWithAuth = await apiClient.get('profile', {
 *   headers: { Authorization: 'Bearer TOKEN_HERE' },
 * }).json();
 * ```
 *
 * @constant
 * @type {ky}
 */
export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // 기본 API 주소
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json', // JSON 요청 기본 헤더
  },
  // credentials: 'include', // 인증 쿠키 필요 시 활성화
});
