import { EtlResponse, etlResponseSchema } from '@/domain/Activity/schemas/main';
import { apiClient } from '@/shared/libs/apiClient';

export const getEtlActivities = async (): Promise<EtlResponse> => {
  try {
    const response = await apiClient.get('etl');
    const data = await response.json();

    const parsed = etlResponseSchema.safeParse(data);

    if (!parsed.success) {
      console.error('getEtlActivities API 응답 검증 실패: ', parsed.error);
      throw new Error('잘못된 ETL API 응답 구조입니다.');
    }

    return parsed.data;
  } catch (error) {
    console.error('ETL 데이터 가져오기 실패:', error);
    throw error;
  }
};
