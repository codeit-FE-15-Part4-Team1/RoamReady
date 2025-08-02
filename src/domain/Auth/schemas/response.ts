import z from 'zod';

//
// ─────────────── 🔁 액세스/리프레시 토큰 재발급 (Token Refresh) ───────────────
//

/**
 * @schema tokenRefreshResponseSchema
 * @description 액세스 및 리프레시 토큰 재발급 응답 스키마입니다.
 * @note 향후 중복 제거를 위해 tokenPairSchema 등으로 분리 가능성 있습니다.
 */
export const tokenRefreshResponseSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

/**
 * @type TokenRefreshResponse
 * @description 토큰 재발급 응답에서 사용되는 타입입니다.
 */
export type TokenRefreshResponse = z.infer<typeof tokenRefreshResponseSchema>;

//
// ───────────────────── 🎉 사용자  ─────────────────────
//

/**
 * @schema userResponseSchema
 * @description 공통적인 사용자 정보 응답 스키마입니다.
 */
export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(), // ISO timestamp
  updatedAt: z.string(), // ISO timestamp
});

/**
 * @type User
 * @description 앱 전체에서 사용될 표준 사용자 정보 타입입니다.
 */
export type User = z.infer<typeof userResponseSchema>;

//
// ───────────────────── 🎉 회원가입 (Sign Up) ─────────────────────
//

/**
 * @schema signupResponseSchema
 * @description 회원가입 응답 스키마입니다.
 */
export const signupResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(), // ISO timestamp
  updatedAt: z.string(), // ISO timestamp
});

/**
 * @type SignupResponse
 * @description 회원가입 응답에 사용되는 타입입니다.
 */
export type SignupResponse = z.infer<typeof signupResponseSchema>;

//
// ─────────────── 🔐 인증 공통 응답 (Auth Response) ───────────────
//

/**
 * @schema authResponseSchema
 * @description
 * 일반 로그인, 회원가입 후 자동 로그인 인증 성공 시
 * BFF 서버가 클라이언트에게 최종적으로 반환하는 공통 응답 스키마입니다.
 * 사용자 정보와 함께 액세스/리프레시 토큰이 포함됩니다.
 */
export const authResponseSchema = z.object({
  user: userResponseSchema,
  refreshToken: z.string(),
  accessToken: z.string(),
});

/**
 * @type SigninResponse
 * @description 일반 로그인 응답 타입입니다.
 * @note authResponseSchema를 기반으로 하며, OAuth 관련 응답 타입과 동일한 구조입니다.
 */
export type SigninResponse = z.infer<typeof authResponseSchema>;

/**
 * @schema oauthResponseSchema
 * @description
 * OAuth 로그인 또는 회원가입 성공 시, 백엔드로부터 받는 최종 응답 스키마입니다.
 * 사용자 정보와 함께 액세스/리프레시 토큰이 포함됩니다.
 */
export const oauthResponseSchema = z.object({
  user: userResponseSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

/**
 * @type OAuthResponse
 * @description OAuth 회원가입, 로그인 응답 타입입니다.
 * @note authResponseSchema를 기반으로 하며, 일반 로그인과 동일한 구조입니다.
 */
export type OAuthResponse = z.infer<typeof oauthResponseSchema>;
