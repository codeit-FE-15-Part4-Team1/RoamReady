import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * @file /api/my-notifications/[notificationId]/route.ts
 * @description 단일 알림을 삭제하는 BFF API 라우트입니다.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { notificationId: string } },
) {
  console.log('route 진입');
  const { notificationId } = params;

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}my-notifications/${Number(notificationId)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      const errBody = await res.json();
      return NextResponse.json(
        { message: errBody?.message ?? '알림 삭제 실패' },
        { status: res.status },
      );
    }

    return NextResponse.json({ message: '알림이 삭제되었습니다.' });
  } catch (err) {
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}
