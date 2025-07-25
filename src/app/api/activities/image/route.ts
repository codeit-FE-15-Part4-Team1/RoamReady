import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. 미들웨어가 추가한 인증 토큰을 요청 헤더에서 가져옵니다.
    const authToken = request.headers.get('Authorization');

    // 인증 토큰이 없다면 에러를 반환합니다.
    if (!authToken) {
      return NextResponse.json(
        { message: 'Authorization header is missing' },
        { status: 401 },
      );
    }

    // 2. 클라이언트(서버 액션)로부터 받은 FormData를 그대로 가져옵니다.
    const formData = await request.formData();

    // 3. .env.local에 저장된 실제 백엔드 API 주소를 사용합니다.
    const backendUrl = `${process.env.API_BASE_URL}/my-activities/image`;

    // 4. 실제 백엔드로 인증 토큰과 FormData를 담아 요청을 전달(forward)합니다.
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        // 인증 토큰만 전달합니다. Content-Type 등은 fetch가 FormData를 보고 자동으로 처리합니다.
        Authorization: authToken,
      },
      body: formData,
    });

    // 5. 실제 백엔드로부터 받은 응답을 파싱합니다.
    // 백엔드가 성공 시 빈 응답을 줄 수도 있으므로, 내용이 있는지 확인합니다.
    const responseText = await response.text();
    const responseBody = responseText ? JSON.parse(responseText) : {};

    // 6. 백엔드의 응답을 원래 요청했던 클라이언트(서버 액션)로 다시 전달합니다.
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 },
    );
  }
}
