import type { SVGProps } from 'react';

/**
 * @component WarningIcon
 * @description
 * 경고 또는 주의가 필요한 상황을 나타내는 느낌표 아이콘입니다.
 * 주로 위험 알림, 확인 요청, 경고성 토스트 등에 사용됩니다.
 *
 * @param {number} [size=59] - 아이콘의 너비와 높이
 * @param {string} [color] - 아이콘의 색상
 * - 기본값은 `#FFA000`
 * - Tailwind 색상 클래스, HEX 코드, 또는 CSS 변수로 지정 가능
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (`className`, `style` 등)
 *
 * @example
 * <WarningIcon className="text-yellow-500" />
 * <WarningIcon size={24} color="#FFA000" />
 */
const WarningIcon = ({
  size = 59,
  color = '#FFA000',
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
        d='M29.6667 56.3333C44.3943 56.3333 56.3333 44.3943 56.3333 29.6667C56.3333 14.9391 44.3943 3 29.6667 3C14.9391 3 3 14.9391 3 29.6667C3 44.3943 14.9391 56.3333 29.6667 56.3333Z'
        stroke='currentColor'
        strokeWidth='5.33333'
      />

      <path
        d='M29.666 16.332V32.332'
        stroke='currentColor'
        strokeWidth='5.33333'
        strokeLinecap='round'
      />

      <path
        d='M29.666 47C31.8752 47 33.666 45.2091 33.666 43C33.666 40.7909 31.8752 39 29.666 39C27.4569 39 25.666 40.7909 25.666 43C25.666 45.2091 27.4569 47 29.666 47Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default WarningIcon;
