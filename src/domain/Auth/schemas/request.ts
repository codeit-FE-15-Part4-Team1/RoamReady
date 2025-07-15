import z from 'zod';

//
// ───────────────────── 🔐 회원가입 (Sign Up) ─────────────────────
//

/**
 * @schema baseSignupSchema
 * 회원가입 폼 입력값에 대한 기본 스키마입니다.
 * passwordConfirm은 서버 전송에는 포함되지 않으며, 클라이언트에서만 사용됩니다.
 */
const baseSignupSchema = z.object({
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
 * @schema signupSchema
 * 비밀번호와 비밀번호 확인 필드가 일치하는지 검사하는 refine이 적용된 스키마입니다.
 */
export const signupSchema = baseSignupSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  },
);

/**
 * @schema signupDataSchema
 * 서버에 실제로 전송할 회원가입 데이터에서 passwordConfirm을 제거한 스키마입니다.
 */
export const signupDataSchema = baseSignupSchema.omit({
  passwordConfirm: true,
});

/**
 * @type SignupRequest
 * 회원가입 요청에 사용되는 타입입니다. 서버에는 passwordConfirm이 포함되지 않습니다.
 */
export type SignupRequest = z.infer<typeof signupDataSchema>;

//
// ───────────────────── 🔓 로그인 (Sign In) ─────────────────────
//

/**
 * @schema signinSchema
 * 로그인 시 필요한 이메일과 비밀번호 입력값에 대한 유효성 검사 스키마입니다.
 */
export const signinSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});

/**
 * @type SigninRequest
 * 로그인 요청에 사용되는 타입입니다.
 */
export type SigninRequest = z.infer<typeof signinSchema>;

//
// ─────────────── 🌐 OAuth 회원가입 (OAuth Sign Up) ───────────────
//

/**
 * @schema oauthSignUpSchema
 * OAuth 간편 회원가입 요청 시 필요한 nickname, redirectUri, token을 검증하는 스키마입니다.
 */
export const oauthSignUpSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요.' })
    .max(10, { message: '닉네임은 10자 이하로 입력해주세요.' }),
  redirectUri: z.string().url({ message: '유효한 리다이렉트 URI가 아닙니다.' }),
  token: z.string().min(1, { message: '토큰이 누락되었습니다.' }),
});

/**
 * @type OAuthSignUpRequest
 * OAuth 회원가입 요청에 사용되는 타입입니다.
 */
export type OAuthSignUpRequest = z.infer<typeof oauthSignUpSchema>;

//
// ─────────────── 🌐 OAuth 로그인 (OAuth Sign In) ───────────────
//

/**
 * @schema oauthSignInSchema
 * OAuth 간편 로그인 요청 시 필요한 redirectUri와 token을 검증하는 스키마입니다.
 */
export const oauthSignInSchema = z.object({
  redirectUri: z.string().url({ message: '유효한 리다이렉트 URI가 아닙니다.' }),
  token: z.string().min(1, { message: '토큰이 누락되었습니다.' }),
});

/**
 * @type OAuthSignInRequest
 * OAuth 로그인 요청에 사용되는 타입입니다.
 */
export type OAuthSignInRequest = z.infer<typeof oauthSignInSchema>;
