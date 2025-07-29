import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');

  const status = Number(statusParam);

  if (![401, 409, 500].includes(status)) {
    return NextResponse.json(
      { message: '지원되지 않는 상태 코드입니다.' },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: `${status} 테스트용 에러입니다.` },
    { status },
  );
}
