/**
 * @interface KyHTTPError
 * @augments {Error}
 * @description
 * Ky 라이브러리에서 발생하는 HTTP 에러의 구조를 정의하는 인터페이스입니다.
 * 이 에러는 HTTP 응답(Response) 객체를 포함하여, 네트워크 요청 실패 시
 * 응답 상태 코드 및 추가적인 응답 데이터를 확인할 수 있도록 합니다.
 *
 * @property {Response} response - HTTP 요청에 대한 응답 객체입니다.
 */
export interface KyHTTPError extends Error {
  response: Response;
}

/**
 * @function isKyHTTPError
 * @description
 * 주어진 'error' 객체가 Ky 라이브러리에서 발생한 HTTP 에러(`KyHTTPError`) 타입인지 확인하는 타입 가드 함수입니다.
 * 이 함수를 통해 'error' 객체가 `response` 속성을 가지고 있으며, 해당 `response`가 유효한 HTTP 응답 객체인지 안전하게 검사할 수 있습니다.
 *
 * @param {unknown} error - 검사할 에러 객체입니다. `unknown` 타입으로 받습니다.
 * @returns {boolean} 'error'가 `KyHTTPError` 타입이면 `true`를, 그렇지 않으면 `false`를 반환합니다.
 */
export const isKyHTTPError = (error: unknown): error is KyHTTPError => {
  return (
    error instanceof Error &&
    typeof (error as KyHTTPError).response === 'object' &&
    (error as KyHTTPError).response !== null &&
    'status' in (error as KyHTTPError).response
  );
};
