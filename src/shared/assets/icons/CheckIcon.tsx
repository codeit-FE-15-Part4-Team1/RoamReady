import type { SVGProps } from 'react';

/**
 * @component CheckIcon
 * @description
 * 성공 또는 완료 상태를 나타내는 체크 마크가 있는 원형 SVG 아이콘입니다.
 * 주로 토스트, 확인 알림, 완료 메시지 등에서 사용됩니다.
 *
 * @param {number} [size=59] - 아이콘의 너비와 높이
 * @param {string} [color] - 아이콘의 색상
 * - 기본값은 `#4CAF50`.
 * - Tailwind 클래스(`text-green-500`) 또는 HEX/CSS 변수(`var(--color-success)` 등)로 커스터마이징할 수 있습니다.
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (예: `className`, `style` 등).
 *
 * @example
 * <CheckCircleIcon />
 * <CheckCircleIcon size={24} color="#4CAF50" />
 * <CheckCircleIcon className="text-green-500" />
 */
const CheckIcon = ({
  size = 59,
  color = '#4CAF50',
  ...props
}: {
  size?: number;
  color?: string;
} & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 59 59'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color={color}
      {...props}
    >
      <path
        d='M19 30L27 38L40.3333 22'
        stroke='currentColor'
        strokeWidth='5.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M29.6667 56.3333C44.3943 56.3333 56.3333 44.3943 56.3333 29.6667C56.3333 14.9391 44.3943 3 29.6667 3C14.9391 3 3 14.9391 3 29.6667C3 44.3943 14.9391 56.3333 29.6667 56.3333Z'
        stroke='currentColor'
        strokeWidth='5.33333'
      />
    </svg>
  );
};

export default CheckIcon;
