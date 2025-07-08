import { z } from 'zod';

//
// 🔸 공통 유저 정보 스키마
//

/**
 * 유저 정보 객체 스키마
 *
 * 로그인, 회원가입, OAuth 응답에서 공통으로 사용되는 유저 프로필 정보입니다.
 */
export const userSchema = z.object({
  /** 유저 고유 ID */
  id: z.number(),

  /** 유저 이메일 (email 형식 검증 포함) */
  email: z.string().email(),

  /** 닉네임 (일반 문자열) */
  nickname: z.string(),

  /** 프로필 이미지 URL (URL 형식이어야 함) */
  profileImageUrl: z.string().url(),

  /** 생성일 (ISO 문자열 datetime 형식) */
  createdAt: z.string().datetime(),

  /** 수정일 (ISO 문자열 datetime 형식) */
  updatedAt: z.string().datetime(),
});

/** `userSchema`의 타입 추론 결과 */
export type User = z.infer<typeof userSchema>;

//
// 🔸 로그인 요청 스키마
//

/**
 * 로그인 요청 시 사용하는 JSON 바디 스키마
 *
 * `POST /{teamId}/auth/login` 요청 본문에 사용됩니다.
 */
export const loginRequestSchema = z.object({
  /** 이메일 (필수, email 형식) */
  email: z.string().email(),

  /** 비밀번호 (필수, 빈 문자열 불가) */
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

//
// 🔸 로그인 응답 스키마
//

/**
 * 로그인 성공 시 응답 데이터 스키마
 *
 * 유저 정보 + 엑세스/리프레시 토큰을 포함합니다.
 */
export const loginResponseSchema = z.object({
  user: userSchema,

  /** 액세스 토큰 */
  accessToken: z.string(),

  /** 리프레시 토큰 */
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

//
// 🔸 토큰 재발급 응답 스키마
//

/**
 * 액세스/리프레시 토큰 재발급 응답 스키마
 *
 * `POST /{teamId}/auth/tokens` 응답 형식
 */
export const tokenRefreshResponseSchema = z.object({
  /** 새로운 리프레시 토큰 */
  refreshToken: z.string(),

  /** 새로운 액세스 토큰 */
  accessToken: z.string(),
});

export type TokenRefreshResponse = z.infer<typeof tokenRefreshResponseSchema>;

//
// 🔸 OAuth App 등록 요청 스키마
//

/**
 * OAuth 연동용 앱 등록 요청 스키마
 *
 * `POST /{teamId}/oauth/apps` 요청 본문
 */
export const oauthAppSchema = z.object({
  /** 앱 키 (Google: Client ID, Kakao: REST API 키 등) */
  appKey: z.string(),

  /** OAuth 제공자 (google, kakao 중 하나) */
  provider: z.enum(['google', 'kakao']),
});

export type OAuthAppRequest = z.infer<typeof oauthAppSchema>;

//
// 🔸 OAuth 회원가입 요청 스키마
//

/**
 * OAuth 기반 회원가입 요청 스키마
 *
 * `POST /{teamId}/oauth/sign-up/{provider}` 요청 본문
 */
export const oauthSignUpRequestSchema = z.object({
  /** 닉네임 */
  nickname: z.string(),

  /** OAuth 인증 후 리디렉션 URI */
  redirectUri: z.string().url(),

  /** OAuth 인증 토큰 */
  token: z.string(),
});

export type OAuthSignUpRequest = z.infer<typeof oauthSignUpRequestSchema>;

//
// 🔸 OAuth 로그인 요청 스키마
//

/**
 * OAuth 기반 로그인 요청 스키마
 *
 * `POST /{teamId}/oauth/sign-in/{provider}` 요청 본문
 */
export const oauthLoginRequestSchema = z.object({
  /** OAuth 인증 후 리디렉션 URI */
  redirectUri: z.string().url(),

  /** OAuth 인증 토큰 */
  token: z.string(),
});

export type OAuthLoginRequest = z.infer<typeof oauthLoginRequestSchema>;

//
// 🔸 일반 회원가입 요청 스키마
//

/**
 * 일반 회원가입 요청 스키마
 *
 * `POST /{teamId}/users` 요청 본문에 사용
 */
export const signUpRequestSchema = z.object({
  /** 이메일 (필수, email 형식) */
  email: z.string().email(),

  /** 닉네임 */
  nickname: z.string(),

  /** 비밀번호 (빈 문자열 불가) */
  password: z.string().min(1),
});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;

//
// 🔸 회원가입 응답 스키마
//

/**
 * 회원가입 성공 시 응답 스키마
 *
 * `userSchema`와 동일
 */
export const signUpResponseSchema = userSchema;

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

//
// 🔸 공통 에러 응답 스키마
//

/**
 * API 에러 응답 스키마
 *
 * `400`, `404`, `409` 등 오류 발생 시 공통 메시지 구조
 */
export const errorResponseSchema = z.object({
  /** 에러 메시지 */
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
