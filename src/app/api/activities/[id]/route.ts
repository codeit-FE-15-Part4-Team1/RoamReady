import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { params } = context;
  const { id } = params;
  try {
    // 1. URL에서 활동 ID를 가져옵니다.
    const activityId = id;

    // 2. 미들웨어가 추가한 인증 토큰을 요청 헤더에서 가져옵니다.
    const authToken = request.headers.get('Authorization');

    // 인증 토큰이 없다면 에러를 반환합니다.
    if (!authToken) {
      return NextResponse.json(
        { message: 'Authorization header is missing' },
        { status: 401 },
      );
    }

    // 3. 클라이언트로부터 받은 JSON 데이터를 파싱합니다.
    const requestBody = await request.json();

    // 4. .env.local에 저장된 실제 백엔드 API 주소를 사용합니다.
    // PATCH는 특정 활동을 수정하므로 ID를 포함한 URL을 사용합니다.
    const backendUrl = `${process.env.API_BASE_URL}/my-activities/${activityId}`;

    // 5. 실제 백엔드로 인증 토큰과 JSON 데이터를 담아 PATCH 요청을 전달합니다.
    const response = await fetch(backendUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(requestBody),
    });

    // 6. 실제 백엔드로부터 받은 응답을 파싱합니다.
    // PATCH 요청은 보통 수정된 데이터나 성공 메시지를 반환합니다.
    const responseText = await response.text();
    const responseBody = responseText ? JSON.parse(responseText) : {};

    // 7. 백엔드의 응답을 클라이언트로 다시 전달합니다.
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('PATCH API Route Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 },
    );
  }
}
