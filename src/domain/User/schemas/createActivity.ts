import dayjs from 'dayjs';
import z from 'zod';

// 배너 이미지(FileList)에 대한 유효성 검사 규칙
const fileListSchema = z
  .custom<FileList>()
  .refine(
    (files) => files && files.length > 0,
    '배너 이미지를 1개 이상 등록해주세요.',
  );

// 소개 이미지 파일(FileList) 유효성 검사 규칙
const subImagesFileListSchema = z
  .custom<FileList>()
  .refine(
    (files) => files && files.length > 0,
    '소개 이미지를 1개 이상 등록해주세요.',
  )
  .refine(
    (files) => files && files.length <= 4,
    '소개 이미지는 최대 4개까지 등록할 수 있습니다.',
  );

// 체험 등록 폼의 유효성 검사
export const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  //coerce로 숫자로 강제 변경
  price: z.coerce.number().min(0, '가격은 0 이상이어야 합니다.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  schedules: z
    .array(
      z
        .object({
          date: z.string().min(1, '날짜를 선택해주세요.'),
          startTime: z
            .string()
            .min(1, '시간을 선택해주세요.')
            .refine((time) => dayjs(time, 'HH:mm', true).isValid, {
              message: '유효한 시간을 입력해주세요.',
            }),
          endTime: z
            .string()
            .min(1, '시간을 선택해주세요.')
            .refine((time) => dayjs(time, 'HH:mm', true).isValid, {
              message: '유효한 시간을 입력해주세요.',
            }),
        })
        .refine(
          (data) => {
            // date, startTime, endTime이 모두 있어야 비교가 가능합니다.
            if (!data.date || !data.startTime || !data.endTime) {
              return true; // 아직 모든 필드가 채워지지 않았을 때는 통과시킵니다.
            }
            const start = dayjs(`${data.date} ${data.startTime}`);
            const end = dayjs(`${data.date} ${data.endTime}`);
            return end.isAfter(start); // end가 start 이후 시간인지 확인합니다.
          },
          {
            message: '종료 시간은 시작 시간보다 늦어야 합니다.',
            // 이 에러가 'endTime' 필드에 대한 것임을 명시합니다.
            path: ['endTime'],
          },
        ),
    )
    .min(1, '예약 가능한 시간대를 최소 1개 이상 추가해주세요.')
    .refine(
      (schedules) => {
        const seen = new Set<string>();
        for (const schedule of schedules) {
          const uniqueKey = `${schedule.date}-${schedule.startTime}-${schedule.endTime}`;
          if (seen.has(uniqueKey)) {
            return false;
          }
          seen.add(uniqueKey);
        }
        return true;
      },
      { message: '중복된 시간대는 등록할 수 없습니다.' },
    ),
  bannerImages: z.union([
    // 새로 업로드하는 파일
    fileListSchema,
    // 수정 시 불러온 기존 이미지 (URL 문자열)
    z
      .string()
      .url('유효하지 않은 URL입니다.')
      .min(1, '배너 이미지를 등록해주세요.'),
  ]),
  subImages: z
    .union([
      // 새로 업로드하는 파일 (최대 4개)
      subImagesFileListSchema,
      // 수정 시 불러온 기존 이미지 (URL 문자열 배열, 최대 4개)
      z
        .array(z.string().url())
        .min(1, '소개 이미지를 1개 이상 등록해주세요.')
        .max(4, '소개 이미지는 최대 4개까지만 등록할 수 있습니다.'),
      // 빈 상태 (null 허용)
      z.null(),
    ])
    // 기존 이미지 + 새 파일의 총합이 4개를 넘지 않는지 확인
    .refine(
      (value) => {
        if (value instanceof FileList) {
          return value.length <= 4;
        }
        if (Array.isArray(value)) {
          return value.length <= 4;
        }
        return true;
      },
      {
        message: '소개 이미지는 최대 4개까지만 등록할 수 있습니다.',
      },
    )
    .optional(),
});

// 추가적으로 기존 이미지와 새 파일을 함께 검증하는 커스텀 훅이나 함수가 필요한 경우
export const validateTotalImageCount = (
  existingImages: string[],
  newFiles: FileList | null,
): { isValid: boolean; message?: string } => {
  const existingCount = existingImages.length;
  const newFileCount = newFiles ? newFiles.length : 0;
  const totalCount = existingCount + newFileCount;

  if (totalCount === 0) {
    return { isValid: false, message: '소개 이미지를 1개 이상 등록해주세요.' };
  }

  if (totalCount > 4) {
    return {
      isValid: false,
      message: '소개 이미지는 최대 4개까지만 등록할 수 있습니다.',
    };
  }

  return { isValid: true };
};

export type FormValues = z.infer<typeof formSchema>;
