import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/activities/[activityId]/reviews
 *
 * 특정 체험의 리뷰 목록을 페이지네이션으로 조회하는 BFF API 라우트입니다.
 * 클라이언트는 page, size를 쿼리 파라미터로 전달해야 합니다.
 *
 * @query page - 현재 페이지 번호 (기본값: 1)
 * @query size - 페이지당 리뷰 수 (기본값: 3)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { activityId: string } },
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '3';
  const { activityId } = params;

  try {
    const apiResponse = await fetch(
      `${process.env.API_BASE_URL}activities/${activityId}/reviews?page=${page}&size=${size}`,
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
        { message: data.message || '리뷰 조회 실패' },
        { status: apiResponse.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('리뷰 조회 API 에러:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
