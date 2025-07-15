import { z } from 'zod';

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
// 🔸 회원가입 응답 스키마
//

/**
 * 회원가입 성공 시 응답 스키마
 *
 * `userSchema`와 동일
 */
export const signUpResponseSchema = userSchema;

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
