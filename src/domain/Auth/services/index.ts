import { apiClient } from '@/shared/libs/apiClient';

import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '../constants/endpoints';
import type { SigninRequest, SignupRequest } from '../schemas/request';
import type { SigninResponse, SignupResponse } from '../schemas/response';

/**
 * @function signup
 * @description 회원가입 API 함수입니다.
 * 서버에 이메일, 닉네임, 비밀번호를 전송하여 계정을 생성하며, 성공 시 생성된 사용자 정보를 반환합니다.
 * 이 함수는 Zod 스키마로 유효성이 검증된 데이터를 POST 요청의 HTTP 바디(Request Body)에 담아 JSON 형태로 서버로 전송하며,
 * 성공 시 생성된 사용자 정보를 반환하고 서버 응답을 SignupResponse 타입으로 파싱합니다.
 *
 * @param {SignupRequest} userData - 회원가입에 필요한 유효한 사용자 데이터 객체입니다.
 * - `email`: 사용자의 이메일 주소 (이메일 형식)
 * - `nickname`: 사용자 닉네임 (1~10자)
 * - `password`: 사용자 비밀번호 (최소 8자)
 * @returns {Promise<SignupResponse>} 회원가입 성공 시 서버에서 반환되는 사용자 정보 객체입니다. 응답은 `SignupResponse` 타입으로 파싱됩니다.
 * - `id`: 생성된 사용자의 고유 ID
 * - `email`: 사용자의 이메일 주소
 * - `nickname`: 사용자의 닉네임
 * - `profileImageUrl`: 사용자 프로필 이미지 URL (nullable)
 * - `createdAt`: 계정 생성일시 (ISO 8601 형식)
 * - `updatedAt`: 계정 마지막 업데이트일시 (ISO 8601 형식)
 * @throws {ErrorResponse} ky 내부에서 HTTP 응답이 4xx/5xx일 경우 예외가 발생합니다.
 * - `message`: 오류 메시지 (예: "중복된 이메일입니다.", "이메일 형식으로 작성해주세요.")
 * - `statusCode`: HTTP 상태 코드 (예: 409, 400)
 * @example
 * ```typescript
 * async function handleSignupSubmit() {
 *  try {
 *    const user = await signup({
 *      email: 'newuser@example.com',
 *      nickname: '새로운유저',
 *      password: 'password123',
 *     });
 *      console.log('회원가입 성공:', user);
 *      예: 로그인 페이지로 리다이렉트
 *    } catch (error) {
 *      console.error('회원가입 실패:', error);
 *      예: 사용자에게 오류 메시지 표시
 *  }
 * }
 * ```
 */
export const signup = async (
  userData: SignupRequest,
): Promise<SignupResponse> => {
  return apiClient
    .post(USER_ENDPOINTS.SIGNUP, {
      json: userData,
    })
    .json<SignupResponse>();
};

/**
 * @function signin
 * @description 사용자의 로그인 요청을 처리하는 API 함수입니다.
 * 서버에 이메일과 비밀번호를 전송하여 인증을 시도하며, 성공 시 사용자 정보와 인증 토큰을 반환합니다.
 * 이 함수는 Zod 스키마로 유효성이 검증된 데이터를 POST 요청의 HTTP 바디(Request Body)에 담아 JSON 형태로 서버로 전송하며,
 * 성공 시 생성된 사용자 정보를 반환하고 서버 응답을 SigninResponse 타입으로 파싱합니다.
 *
 * @param {SigninRequest} credentials - 로그인에 필요한 이메일과 비밀번호 정보를 담은 객체입니다.
 * - `email`: 사용자의 이메일 주소
 * - `password`: 사용자의 비밀번호
 * @returns {Promise<SigninResponse>} 로그인 성공 시 서버에서 반환되는 인증 응답 객체입니다. 응답은 `SigninResponse` 타입으로 파싱됩니다.
 * - `user`: 로그인한 사용자 정보 객체 (`id`, `email`, `nickname`, `profileImageUrl` 등)
 * - `accessToken`: 서버로부터 발급된 액세스 토큰
 * - `refreshToken`: 서버로부터 발급된 리프레시 토큰
 * @throws {ErrorResponse} ky 내부에서 HTTP 응답이 4xx/5xx일 경우 예외가 발생합니다.
 * - `message`: 오류 메시지 (예: "이메일 또는 비밀번호를 잘못 입력했습니다.")
 * - `statusCode`: HTTP 상태 코드 (예: 401)
 * @example
 * ```typescript
 * async function handleSigninSubmit() {
 *  try {
 *    const response = await signin({
 *      email: 'test@example.com',
 *      password: 'password123',
 *     });
 *     console.log('로그인 성공:', response.user.nickname);
 *      예: 토큰을 로컬 스토리지에 저장하고 메인 페이지로 리다이렉트
 *   } catch (error) {
 *     console.error('로그인 실패:', error);
 *      예: 사용자에게 오류 메시지 표시
 *   }
 * }
 * ```
 */
export const signin = async (
  credentials: SigninRequest,
): Promise<SigninResponse> => {
  return apiClient
    .post(AUTH_ENDPOINTS.SIGNIN, {
      json: credentials,
    })
    .json<SigninResponse>();
};
