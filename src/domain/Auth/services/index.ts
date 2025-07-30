import { BRIDGE_API } from '@/shared/constants/bridgeEndpoints';
import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';
import type { User } from '@/shared/slices/userSlice';

import { authApiClient } from '../libs/authApiClient';
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
  return authApiClient
    .post(BRIDGE_API.AUTH.SIGNUP, {
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
  return authApiClient
    .post(BRIDGE_API.AUTH.SIGNIN, {
      json: credentials,
    })
    .json<SigninResponse>();
};

/**
 * @function getMe
 * @description
 * 현재 로그인된 사용자의 정보를 가져오는 API 함수입니다.
 * apiClient가 쿠키에 담긴 인증 토큰을 자동으로 헤더에 담아 요청합니다.
 *
 * @summary
 * ### OAuth 로그인 흐름에서 getMe 함수의 역할
 * 카카오 같은 OAuth 로그인은 중간에 다른 사이트(카카오)에 다녀오는 과정 때문에, 일반 로그인과 달리 서버와 클라이언트의 역할 분담이 필요합니다.
 * 1. **서버의 역할**:
 * OAuth 콜백 API는 인증 성공 후, 백엔드로부터 토큰을 받아 브라우저에 **쿠키만 설정**하고 역할이 끝납니다.
 * 서버는 브라우저의 상태(Zustand 스토어)를 직접 수정할 수 없습니다.
 * 2. **클라이언트의 역할**:
 * 사용자가 메인 페이지로 돌아오면, 브라우저에는 쿠키는 있지만 화면에 보여줄 사용자 정보(Zustand 스토어)는 비어있습니다.
 * 3. **getMe의 등장**:
 * 바로 이때! RootLayout이나 헤더 같은 최상위 클라이언트 컴포넌트가 이 `getMe` 함수를 호출합니다.
 * 브라우저는 쿠키를 이용해 백엔드에 "나 지금 누구로 로그인되어 있어?"라고 물어보고, 응답으로 받은 사용자 정보를 비로소 Zustand 스토어에 저장합니다.
 * 따라서 `getMe` 함수는 서버가 처리한 로그인 결과를 클라이언트가 이어받아, 최종적으로 화면에 로그인 상태를 반영하기 위한 **필수적인 연결고리** 역할을 합니다.
 *
 * @returns {Promise<User>} 인증된 사용자 정보를 포함하는 프로미스입니다.
 * @throws {Error} API 요청 실패 시 (예: 네트워크 오류, 인증되지 않음) 오류를 발생시킬 수 있습니다.
 */
export const getMe = async (): Promise<User> => {
  return apiClient.get(API_ENDPOINTS.USERS.ME).json<User>();
};
