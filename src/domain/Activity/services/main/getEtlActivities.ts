import {
  ActivitySearchFormValues,
  EtlResponse,
  etlResponseSchema,
} from '@/domain/Activity/schemas/main';
import { apiClient } from '@/shared/libs/apiClient';

export const getEtlActivities = async (
  searchParams?: ActivitySearchFormValues,
): Promise<EtlResponse> => {
  try {
    // 검색 파라미터가 있으면 URL에 추가
    let url = 'etl';
    const params = new URLSearchParams();

    if (searchParams?.keyword) {
      params.append('keyword', searchParams.keyword);
    }
    if (searchParams?.address) {
      params.append('address', searchParams.address);
    }
    if (searchParams?.date) {
      params.append('date', searchParams.date.toISOString().split('T')[0]);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await apiClient.get(url);
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
