// app/api/my-reservations/route.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';

// 이 라우트는 항상 동적으로 렌더링되어 캐시되지 않도록 설정합니다.
// '나의 예약'과 같은 개인화된 데이터에 필수적입니다.
export const dynamic = 'force-dynamic';

// GET 요청을 처리하는 함수
export const GET = async () => {
  // 서버 컴포넌트나 라우트 핸들러에서 쿠키를 가져옵니다.
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // 인증 토큰이 없는 경우 401 Unauthorized 에러를 반환합니다.
  if (!accessToken) {
    return NextResponse.json(
      { message: '인증이 필요합니다.' },
      { status: 401 },
    );
  }

  try {
    // 외부 API로 요청을 보냅니다.
    const response = await fetch(
      // 환경 변수에서 API 기본 URL과 엔드포인트를 조합합니다.
      `${process.env.API_BASE_URL}${API_ENDPOINTS.MY_RESERVATIONS.BASE}`,
      {
        method: 'GET',
        headers: {
          // Bearer 토큰 방식으로 인증 정보를 전달합니다.
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // 외부 API로부터의 응답이 성공적이지 않은 경우 (상태 코드 200-299 범위 밖)
    if (!response.ok) {
      // API가 보낸 에러 메시지를 포함하여 클라이언트에 전달합니다.
      const errorData = await response.json().catch(() => ({
        message: 'API 응답을 파싱하는데 실패했습니다.',
      }));

      return NextResponse.json(
        {
          message: '데이터를 가져오는 중 오류가 발생했습니다.',
          details: errorData,
        },
        { status: response.status },
      );
    }

    // 성공적으로 응답을 받으면 JSON 데이터를 파싱합니다.
    const data = await response.json();

    // 파싱된 데이터를 클라이언트에 반환합니다.
    return NextResponse.json(data);
  } catch (error) {
    // fetch 요청 자체에서 네트워크 오류 등 예외가 발생한 경우
    console.error('나의 체험 예약 API 요청 처리 중 에러:', error);

    // 서버 내부 오류(500)를 클라이언트에 반환합니다.
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
};
