'use client';

import ky from 'ky';
import React from 'react';

import Button from '@/shared/components/Button';
import { useToast } from '@/shared/hooks/useToast';
import { formatErrorResponseHooks } from '@/shared/libs/formatErrorResponseHooks';

const isError = (err: unknown): err is Error => {
  return err instanceof Error;
};

/**
 * @description
 * API 에러 핸들링 로직을 테스트하기 위한 클라이언트 컴포넌트입니다.
 * 이 컴포넌트는 ky 라이브러리를 사용하여 로컬 테스트 API로 의도적인 에러 요청을 보내고,
 * `formatErrorResponseHooks`를 거쳐 포맷팅된 에러 메시지가 토스트로 올바르게 표시되는지 확인하는 역할을 합니다.
 *
 * @details
 * - **`isError`**: 주어진 값이 Error 객체인지 확인하는 타입 가드 함수입니다.
 * - **`handleApiCall`**: HTTP 상태 코드(400, 403, 500)에 따라 API 호출을 트리거하며, 서버 메시지 우선 또는 공통 메시지 사용 로직을 테스트합니다.
 * - **`handleJsonParseError`**: 유효하지 않은 JSON 응답을 시뮬레이션하여 파싱 오류를 테스트합니다.
 *
 * 이 컴포넌트를 통해 개발자는 네트워크 및 외부 API에 의존하지 않고,
 * 모든 에러 핸들링 시나리오를 로컬에서 안정적으로 검증할 수 있습니다.
 */
const ApiErrorToastTest = () => {
  const { showError } = useToast();

  const handleApiCall = async (statusCode: number) => {
    try {
      await ky
        .get(`/api/test/error?status=${statusCode}`, {
          hooks: { beforeError: formatErrorResponseHooks.beforeError },
          retry: { limit: 0 },
        })
        .json();
    } catch (error) {
      if (isError(error)) {
        showError(error.message);
        console.error('Captured error in component:', error);
      } else {
        showError('알 수 없는 오류가 발생했습니다.');
        console.error('Captured unknown error:', error);
      }
    }
  };

  const handleJsonParseError = async () => {
    try {
      await ky.get(`/api/test/error?status=json-parse-error`).json();
    } catch (error) {
      console.error('Captured error in component:', error);
    }
  };

  return (
    <div className='font-size-20 flex-col-center min-h-screen gap-10'>
      <h1 className='font-size-25 font-bold'>API 에러 테스트</h1>
      <p>
        아래 버튼을 클릭하여 토스트 메시지가 올바르게 표시되는지 확인하세요.
      </p>

      <Button onClick={() => handleApiCall(400)}>
        400 Bad Request (서버 메시지 테스트)
      </Button>

      <Button onClick={() => handleApiCall(403)}>
        403 Forbidden (공통 메시지 테스트)
      </Button>

      <Button onClick={() => handleApiCall(500)}>
        500 Internal Server Error (공통 메시지 테스트)
      </Button>

      <Button onClick={handleJsonParseError}>JSON 파싱 오류 테스트</Button>
    </div>
  );
};

export default ApiErrorToastTest;
