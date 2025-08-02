import z from 'zod';

import type { User } from '@/domain/Auth/schemas/response';

/**
 * 사용자 정보 폼 스키마
 *
 * 닉네임, 이메일, 비밀번호, 비밀번호 확인을 입력받고,
 * 비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
 * 비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지를 반환합니다.
 */
export const userInfoFormSchema = z
  .object({
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
    email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

/**
 * 사용자 정보 폼 값 타입
 */
export type UserInfoFormValues = z.infer<typeof userInfoFormSchema>;

/**
 * API 요청을 위한 사용자 정보 업데이트 요청 타입
 */
export interface UpdateUserInfoRequest {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}

/**
 * API 응답을 위한 사용자 정보 업데이트 응답 타입
 */
export type UpdateUserInfoResponse = User;
