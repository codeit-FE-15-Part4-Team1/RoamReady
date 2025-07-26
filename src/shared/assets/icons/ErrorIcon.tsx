import type { SVGProps } from 'react';

/**
 * @component ErrorIcon
 * @description
 * 에러, 실패, 삭제 등 부정적인 상태를 나타내는 'X' 마크 아이콘입니다.
 * 주로 경고 토스트, 삭제 알림, 에러 메시지 등에 사용됩니다.
 *
 * @param {number} [size=59] - 아이콘의 너비와 높이
 * @param {string} [color] - 아이콘의 색상
 *  - 기본값은 `#FF2727`
 *  - Tailwind 색상 클래스 또는 HEX, CSS 변수로도 지정 가능
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성 (`className`, `style` 등)
 *
 * @example
 * <ErrorIcon className="text-red-500" />
 * <ErrorIcon size={24} color="#FF2727" />
 */
const ErrorIcon = ({
  size = 59,
  color = '#FF2727',
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
        d='M19 19L40.3333 40.3333'
        stroke='currentColor'
        strokeWidth='5.33333'
        strokeLinecap='round'
      />

      <path
        d='M40.3333 19L19 40.3333'
        stroke='currentColor'
        strokeWidth='5.33333'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ErrorIcon;
