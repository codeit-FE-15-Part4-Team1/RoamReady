import React, { ErrorInfo, ReactNode } from 'react';

import ErrorFallback from '@/shared/components/ui/error-fallback';

/**
 * @description
 * ComponentErrorBoundary 컴포넌트의 props를 정의하는 인터페이스입니다.
 * @property {ReactNode} children - 렌더링될 자식 컴포넌트입니다.
 * @property {ReactNode} [fallback] - 에러 발생 시 표시될 대체 UI입니다. 이 prop이 제공되지 않으면 기본 ErrorFallback 컴포넌트가 사용됩니다.
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * @description
 * ComponentErrorBoundary 컴포넌트의 상태를 정의하는 인터페이스입니다.
 * @property {boolean} hasError - 컴포넌트 트리에서 에러가 발생했는지 여부를 나타냅니다.
 */
interface State {
  hasError: boolean;
}

/**
 * @description
 * React 클래스 컴포넌트로 구현된 에러 바운더리입니다.
 * 자식 컴포넌트 트리에서 발생하는 렌더링 에러를 포착하여,
 * 애플리케이션 전체가 멈추는 것을 방지하고 대체 UI를 표시합니다.
 *
 * @param {object} props - 컴포넌트 props 객체.
 * @param {ReactNode} props.children - 렌더링될 자식 컴포넌트입니다.
 * @param {ReactNode} [props.fallback] - 에러 발생 시 표시될 대체 UI입니다. 이 prop이 제공되지 않으면 기본 ErrorFallback 컴포넌트가 사용됩니다.
 *
 * @remarks
 * - 이 컴포넌트는 자식 트리에서 발생하는 렌더링 에러만 처리합니다.
 * - `fallback` prop을 통해 원하는 에러 UI를 커스터마이징할 수 있습니다.
 * - `fallback` prop이 제공되지 않으면, 기본적으로 `<ErrorFallback />` 컴포넌트가 렌더링됩니다.
 * - `getDerivedStateFromError`: 렌더링 중 발생한 에러를 포착하여 상태를 업데이트합니다.
 * - `componentDidCatch`: 포착된 에러를 로깅하거나 외부 서비스로 전송할 때 사용됩니다.
 */
class ComponentErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Uncaught error]:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;
