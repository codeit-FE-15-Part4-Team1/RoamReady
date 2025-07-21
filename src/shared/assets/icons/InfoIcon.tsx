import type { SVGProps } from 'react';

/**
 * @component InfoIcon
 * @description
 * 일반적인 정보, 알림, 공지를 나타낼 때 사용하는 'i' 아이콘입니다.
 * 주로 안내 메시지, 도움말, 정보성 토스트 등에 사용됩니다.
 *
 * @param {number} [size=59] - 아이콘의 너비와 높이
 * @param {string} [color] - 아이콘의 색상
 *  - 기본값은 `#3D9EF2`
 *  - Tailwind 색상 클래스, HEX 코드, 또는 CSS 변수로 지정 가능
 * @param {React.SVGProps<SVGSVGElement>} props - 기타 SVG 속성  (`className`, `style` 등)
 *
 * @example
 * <InfoIcon className="text-blue-500" />
 * <InfoIcon size={24} color="#3D9EF2" />
 */
const InfoIcon = ({
  size = 59,
  color = '#3D9EF2',
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
        d='M29.666 13.999C31.1388 13.999 32.333 15.1933 32.333 16.666C32.333 18.1388 31.1388 19.333 29.666 19.333C28.1933 19.333 26.999 18.1388 26.999 16.666C26.999 15.1933 28.1933 13.999 29.666 13.999Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2.66667'
      />

      <path
        d='M29.666 28.666V44.666'
        stroke='currentColor'
        strokeWidth='5.33333'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default InfoIcon;
