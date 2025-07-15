import { IconsProps } from '@/shared/types/icons';

interface DirectionIconProps extends IconsProps {
  direction?: 'right' | 'left' | 'top' | 'bottom';
}

/**
 * 날카로운 화살표 아이콘
 *
 * @component
 * @param {number|string} [size=12] - 아이콘의 크기
 * @param {string} [color='#1F1F22'] - 아이콘 색상
 * @param {'right'|'left'|'top'|'bottom'} [direction='right'] - 화살표 방향
 * @returns {JSX.Element} SVG 화살표 아이콘
 *
 * @example
 * ```tsx
 * <TriangleArrow direction="left" color="#999" size={10} />
 * ```
 */

export default function TriangleArrow({
  width = '8',
  height = '12',
  direction = 'right',
  className = '',
}: DirectionIconProps) {
  const rotation = {
    right: '0',
    bottom: '90',
    left: '180',
    top: '-90',
  }[direction];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='currentColor'
      style={{ transform: `rotate(${rotation}deg)` }}
      viewBox='0 0 8 12'
      className={className}
    >
      <path d='M6.973 6.722c.4-.361.4-1.084 0-1.445L1.931.727C1.435.282.728.706.728 1.45v9.099c0 .745.707 1.17 1.203.723l5.042-4.55Z' />
    </svg>
  );
}
