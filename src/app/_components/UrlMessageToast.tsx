'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import {
  DEFAULT_REDIRECT_ERROR_MESSAGE,
  REDIRECT_ERROR_MESSAGES,
} from '@/shared/constants/routes';
import { useToast } from '@/shared/hooks/useToast';

/**
 * @component UrlMessageToast
 * @description
 * 이 클라이언트 컴포넌트는 URL 쿼리 파라미터(`toast_message`, `error`, `message`)를 감지하여 사용자에게 토스트 메시지를 표시합니다.
 * 미들웨어나 서버 컴포넌트에서 리디렉션 시 URL에 포함된 메시지를 클라이언트 측에서 처리하기 위해 사용됩니다.
 *
 * ### 동작 원리:
 * 1. `useEffect` 훅을 사용하여 `searchParams`의 변경을 감지합니다.
 * 2. URL에 `toast_message` 파라미터가 있으면 `showInfo`로 정보성 토스트를 띄웁니다.
 * 3. URL에 `error` 파라미터가 있으면 `showError`로 에러 토스트를 띄웁니다. `message` 파라미터가 우선 사용되며, 없을 경우 미리 정의된 에러 코드 메시지를 사용합니다.
 * 4. 토스트 메시지를 표시한 후에는 `router.replace`를 사용하여 URL에서 관련 쿼리 파라미터를 모두 제거합니다. 이를 통해 페이지 새로고침 시 토스트가 다시 나타나는 것을 방지하고, URL을 깔끔하게 유지합니다.
 * 5. `useRef`를 사용하여 페이지 로드 시 단 한 번만 로직이 실행되도록 합니다.
 *
 * @returns {null} UI를 렌더링하지 않습니다.
 */
export default function UrlMessageToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showInfo, showError } = useToast();
  const hasHandledUrlParams = useRef(false);

  useEffect(() => {
    if (hasHandledUrlParams.current) {
      return;
    }

    const toastMessage = searchParams.get('toast_message');
    const errorCode = searchParams.get('error');
    const serverMessage = searchParams.get('message');

    let messageToDisplay = '';

    if (toastMessage) {
      messageToDisplay = toastMessage;
      showInfo(messageToDisplay);
    } else if (errorCode) {
      messageToDisplay =
        serverMessage ||
        (REDIRECT_ERROR_MESSAGES as Record<string, string>)[errorCode] ||
        DEFAULT_REDIRECT_ERROR_MESSAGE;
      showError(messageToDisplay);
    }

    if (messageToDisplay) {
      hasHandledUrlParams.current = true;
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('toast_message');
      newSearchParams.delete('error');
      newSearchParams.delete('message');

      const newQuery = newSearchParams.toString();
      router.replace(newQuery ? `?${newQuery}` : window.location.pathname);
    }
  }, [searchParams, showInfo, showError, router]);

  return null;
}
