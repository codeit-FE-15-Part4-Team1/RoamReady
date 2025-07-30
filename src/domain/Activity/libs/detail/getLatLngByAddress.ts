interface AddressSearchResult {
  address_name: string;
  y: string; // 위도
  x: string; // 경도
}

// Kakao 지도 API에서 반환하는 상태 코드
type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

/**
 * 주어진 주소를 이용해 위도(lat)와 경도(lng)를 반환하는 함수입니다.
 *
 * Kakao Maps API의 Geocoder를 사용하여 주소를 좌표로 변환합니다.
 * API가 로드되지 않았거나 검색에 실패하면 null을 반환합니다.
 *
 * @param address 좌표로 변환할 주소 문자열
 * @returns 위도(lat)와 경도(lng)를 포함하는 객체 또는 null (검색 실패 시)
 */
export const getLatLngByAddress = async (
  address: string,
): Promise<{ lat: number; lng: number } | null> => {
  return new Promise((resolve) => {
    // Kakao Maps API가 로드되지 않은 경우 → 즉시 null 반환
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API is not loaded.');
      return resolve(null);
    }

    // Kakao 지도 서비스의 주소 검색을 위한 Geocoder 인스턴스 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소 → 좌표 변환 요청
    geocoder.addressSearch(
      address, // 변환할 주소
      (result: AddressSearchResult[], status: Status) => {
        // 검색 성공 && 결과 존재
        if (status === 'OK' && result.length > 0) {
          const { y, x } = result[0]; // 첫 번째 결과의 좌표
          resolve({
            lat: parseFloat(y), // 문자열을 숫자로 변환 (위도)
            lng: parseFloat(x), // 문자열을 숫자로 변환 (경도)
          });
        } else {
          // 검색 실패 또는 결과 없음
          console.warn(`주소 검색 실패: '${address}'`);
          resolve(null);
        }
      },
    );
  });
};
