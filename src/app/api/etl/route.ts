import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const etlApiUrl = process.env.API_ETL_URL;
    if (!etlApiUrl) {
      console.error('ETL_API_URL 환경변수가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'ETL API URL이 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    // 검색 파라미터를 ETL API에 전달
    const { searchParams } = new URL(request.url);
    const etlUrl = new URL(etlApiUrl);

    // 검색 파라미터 복사
    searchParams.forEach((value, key) => {
      etlUrl.searchParams.set(key, value);
    });

    const response = await fetch(etlUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`ETL API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('ETL 프록시 에러:', error);
    return NextResponse.json(
      { error: 'ETL 데이터를 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
}
