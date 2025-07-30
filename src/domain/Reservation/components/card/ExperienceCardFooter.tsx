import { ReactNode } from 'react';

interface ExperienceCardFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * ExperienceCard의 푸터 컴포넌트
 * 버튼이나 액션 영역을 포함합니다.
 */
export default function ExperienceCardFooter({
  children,
  className = '',
}: ExperienceCardFooterProps) {
  return <div className={`mt-3 flex gap-2 ${className}`}>{children}</div>;
}
