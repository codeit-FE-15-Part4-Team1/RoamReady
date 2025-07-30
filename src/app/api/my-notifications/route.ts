import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * @file /api/my-notifications/route.ts
 * @description 환경 변수에서 teamId를 불러와 알림 리스트를 조회하는 BFF API 라우트입니다.
 * @query cursorId - 커서 기반 페이지네이션을 위한 cursor ID
 * @query size - 페이지당 항목 수 (기본값: 10)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId');
  const size = searchParams.get('size') || '10';

  try {
    const query = new URLSearchParams({
      ...(cursorId ? { cursorId } : {}),
      size,
    });

    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}my-notifications/?${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: data.message || '알림 조회에 실패했습니다.' },
        { status: apiResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('알림 리스트 조회 중 에러:', err);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
