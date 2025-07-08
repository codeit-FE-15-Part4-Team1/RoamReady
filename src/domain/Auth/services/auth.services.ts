import { apiClient } from '@/shared/libs/apiClient';

import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '../schemas/auth.schemas';

/**
 * 사용자의 로그인 요청을 처리하는 API 함수입니다.
 *
 * 서버에 이메일과 비밀번호를 전송하여 인증을 시도하고,
 * 성공 시 사용자 정보 및 액세스/리프레시 토큰을 포함한 JSON 데이터를 반환합니다.
 *
 * 요청 경로: `POST /auth/login`
 *
 * @param email - 사용자의 이메일 주소 (이메일 형식)
 * @param password - 사용자의 비밀번호
 *
 * @returns 로그인 성공 시 `LoginResponse` 타입의 JSON 데이터
 * - `user`: 로그인한 사용자 정보 (`id`, `email`, `nickname`, `profileImageUrl` 등)
 * - `accessToken`: 액세스 토큰
 * - `refreshToken`: 리프레시 토큰
 *
 * @throws {HTTPError} ky 내부에서 HTTP 응답이 4xx/5xx일 경우 예외 발생
 * → `beforeError` 훅에 따라 `.message`를 사용자 메시지로 처리 가능
 *
 * @example
 * ```ts
 * const res = await login({ email: 'test@example.com', password: '1234' });
 * console.log(res.user.nickname); // 홍길동
 * ```
 */
export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  return apiClient
    .post('auth/login', {
      json: { email, password },
    })
    .json<LoginResponse>();
};

/**
 * 새로운 사용자를 회원가입시키는 API 함수입니다.
 *
 * 서버에 이메일, 닉네임, 비밀번호를 전송하여 계정을 생성합니다.
 * 성공 시 생성된 사용자 정보를 반환합니다.
 *
 * 요청 경로: `POST /users`
 *
 * @param email - 사용자 이메일 (이메일 형식)
 * @param nickname - 사용자 닉네임
 * @param password - 사용자 비밀번호
 *
 * @returns 회원가입 성공 시 `SignUpResponse` 타입의 사용자 정보 객체
 * - `id`, `email`, `nickname`, `profileImageUrl`, `createdAt`, `updatedAt`
 *
 * @throws {HTTPError} ky 내부에서 HTTP 에러가 발생하면 예외 발생
 * 서버로부터 다음과 같은 에러 메시지가 내려올 수 있습니다:
 * - "중복된 이메일입니다." (409)
 * - "이메일 형식으로 작성해주세요." (400)
 *
 * @example
 * ```ts
 * const user = await signup({
 *   email: 'new@example.com',
 *   nickname: 'neo',
 *   password: 'secure123',
 * });
 * console.log(user.id); // 생성된 유저 ID
 * ```
 */
export const signup = async ({
  email,
  nickname,
  password,
}: SignUpRequest): Promise<SignUpResponse> => {
  return apiClient
    .post('users', {
      json: { email, nickname, password },
    })
    .json<SignUpResponse>();
};
