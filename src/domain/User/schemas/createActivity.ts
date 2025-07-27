import dayjs from 'dayjs';
import z from 'zod';

// 새로운 파일(FileList)에 대한 유효성 검사 규칙
const fileListSchema = z
  .custom<FileList>()
  .refine(
    (files) => files && files.length > 0,
    '파일을 1개 이상 등록해주세요.',
  );

// 소개 이미지용 파일(FileList) 유효성 검사 규칙
const subImagesFileListSchema = z
  .custom<FileList>()
  .refine(
    (files) => files && files.length > 0,
    '소개 이미지를 1개 이상 등록해주세요.',
  );

export const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  price: z.coerce.number().min(0, '가격은 0 이상이어야 합니다.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  schedules: z
    .array(
      z
        .object({
          date: z.string().min(1, '날짜를 선택해주세요.'),
          startTime: z.string().min(1, '시작 시간을 선택해주세요.'),
          endTime: z.string().min(1, '종료 시간을 선택해주세요.'),
        })
        // [수정] .refine()을 사용하여 객체 수준의 유효성 검사를 추가합니다.
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
            // 유효성 검사 실패 시 이 메시지를 보여줍니다.
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
  // ✨ 배너 이미지 최종 스키마
  bannerImages: z
    .union([
      // Case 1: 새로 업로드하는 파일
      fileListSchema,
      // Case 2: 수정 시 불러온 기존 이미지 (URL 문자열)
      z
        .string()
        .url('유효하지 않은 URL입니다.')
        .min(1, '배너 이미지를 등록해주세요.'),
      // Case 3: 빈 상태 (null 허용)
      z.null(),
    ])
    .optional(),

  // ✨ 소개 이미지 최종 스키마
  subImages: z
    .union([
      // Case 1: 새로 업로드하는 파일
      subImagesFileListSchema,
      // Case 2: 수정 시 불러온 기존 이미지 (URL 문자열 배열)
      z.array(z.string().url()).min(1, '소개 이미지를 1개 이상 등록해주세요.'),
      // Case 3: 빈 상태 (null 허용)
      z.null(),
    ])
    .optional(),
});

export type FormValues = z.infer<typeof formSchema>;
