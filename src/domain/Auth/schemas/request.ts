import z from 'zod';

//
// ───────────────────── 🔐 회원가입 (Sign Up) ─────────────────────
//

/**
 * @schema baseSignupRequestSchema
 * @description
 * 회원가입 폼 입력값에 대한 기본 스키마입니다.
 * passwordConfirm은 서버 전송에는 포함되지 않으며, 클라이언트에서만 사용됩니다.
 */
const baseSignupRequestSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(10, { message: '닉네임은 10자 이하로 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  passwordConfirm: z
    .string()
    .min(8, { message: '비밀번호 확인을 입력해주세요.' }),
});

/**
 * @schema signupRequestSchema
 * @description 비밀번호와 비밀번호 확인 필드가 일치하는지 검사하는 refine이 적용된 스키마입니다.
 */
export const signupRequestSchema = baseSignupRequestSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  },
);

/**
 * @schema signupDataRequestSchema
 * @description 서버에 실제로 전송할 회원가입 데이터에서 passwordConfirm을 제거한 스키마입니다.
 */
export const signupDataRequestSchema = baseSignupRequestSchema.omit({
  passwordConfirm: true,
});

/**
 * @type SignupRequest
 * @description 회원가입 요청에 사용되는 타입입니다. 서버에는 passwordConfirm이 포함되지 않습니다.
 */
export type SignupRequest = z.infer<typeof signupDataRequestSchema>;

//
// ───────────────────── 🔓 로그인 (Sign In) ─────────────────────
//

/**
 * @schema signinRequestSchema
 * @description 로그인 시 필요한 이메일과 비밀번호 입력값에 대한 유효성 검사 스키마입니다.
 */
export const signinRequestSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});

/**
 * @type SigninRequest
 * @description 로그인 요청에 사용되는 타입입니다.
 */
export type SigninRequest = z.infer<typeof signinRequestSchema>;

//
// ─────────────── 🌐 OAuth 회원가입 (OAuth Sign Up) ───────────────
//

/**
 * @schema oauthSignupRequestSchema
 * @description OAuth 간편 회원가입 요청 시 필요한 nickname, redirectUri, token을 검증하는 스키마입니다.
 */
export const oauthSignupRequestSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(10, { message: '닉네임은 10자 이하로 입력해주세요.' }),
  redirectUri: z.string().url({ message: '유효한 리다이렉트 URI가 아닙니다.' }),
  token: z.string().min(1, { message: '토큰이 누락되었습니다.' }),
});

/**
 * @type OAuthSignupRequest
 * @description OAuth 회원가입 요청에 사용되는 타입입니다.
 */
export type OAuthSignupRequest = z.infer<typeof oauthSignupRequestSchema>;

//
// ─────────────── 🌐 OAuth 로그인 (OAuth Sign In) ───────────────
//

/**
 * @schema oauthSigninRequestSchema
 * @description OAuth 간편 로그인 요청 시 필요한 redirectUri와 token을 검증하는 스키마입니다.
 */
export const oauthSigninRequestSchema = z.object({
  redirectUri: z.string().url({ message: '유효한 리다이렉트 URI가 아닙니다.' }),
  token: z.string().min(1, { message: '토큰이 누락되었습니다.' }),
});

/**
 * @type OAuthSigninRequest
 * @description OAuth 로그인 요청에 사용되는 타입입니다.
 */
export type OAuthSigninRequest = z.infer<typeof oauthSigninRequestSchema>;
