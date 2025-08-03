import {
  ActivitySearchFormValues,
  EtlResponse,
  etlResponseSchema,
} from '@/domain/Activity/schemas/main';
import { apiClient } from '@/shared/libs/apiClient';

/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 * 로컬 시간대를 고려하여 정확한 날짜를 반환합니다.
 */
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
      // 로컬 시간대를 고려한 날짜 변환 사용
      params.append('date', formatDateToYYYYMMDD(searchParams.date));
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
