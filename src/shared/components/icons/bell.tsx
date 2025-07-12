import { IconsProps } from '@/shared/types/icons';

export default function Bell({
  width = '24',
  height = '24',
  fill = 'none',
  color = '#1F1F22',
  className = '',
}: IconsProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill={fill}
      className={className}
    >
      <path
        fill={color}
        d='M13.505 4.127a1.558 1.558 0 1 1-3.117 0 1.558 1.558 0 0 1 3.117 0Z'
      />
      <path
        fill={color}
        d='M11.948 4.127a5.788 5.788 0 0 1 5.783 5.565c0 .002.002.003.003.003.002 0 .003.001.003.003v3.376c0 .62.718 1.114 1.066 1.627l1.011 1.494a1 1 0 0 1-.828 1.56H5.016a1 1 0 0 1-.829-1.56L5.198 14.7c.33-.487.962-.953.962-1.541V9.698c0-.002.001-.003.003-.003a.003.003 0 0 0 .003-.003 5.787 5.787 0 0 1 5.782-5.565ZM14.352 19.02a2.412 2.412 0 0 1-4.811.246l-.013-.246h4.824Z'
      />
    </svg>
  );
}
