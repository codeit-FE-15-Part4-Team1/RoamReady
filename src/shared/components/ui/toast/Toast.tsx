import {
  Ban as ErrorIcon,
  CircleAlert as WarningIcon,
  CircleCheck as CheckIcon,
  Info as InfoIcon,
  X as CloseIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import useToast from '@/shared/hooks/useToast';
import { cn } from '@/shared/libs/cn';
import { ToastState } from '@/shared/slices/toastSlice';

import Button from '../../Button';
import ToastTimer from './ToastTimer';

export interface ToastProps {
  toast: ToastState;
}

const typeStyles = {
  success: {
    border: 'border-l-green',
    color: 'bg-green',
    title: 'Success',
    icon: <CheckIcon />,
  },
  error: {
    border: 'border-l-red',
    color: 'bg-red',
    title: 'Error',
    icon: <ErrorIcon />,
  },
  info: {
    border: 'border-l-brand-2',
    color: 'bg-brand-2',
    title: 'Info',
    icon: <InfoIcon />,
  },
  warning: {
    border: 'border-l-orange',
    color: 'bg-orange',
    title: 'Warning',
    icon: <WarningIcon />,
  },
  default: {
    border: 'border-l-brand-2',
    color: 'bg-brand-2',
    title: 'Notice',
    icon: <InfoIcon />,
  },
};

/**
 * @description
 * 단일 토스트 알림 UI를 표시하는 컴포넌트입니다.
 *
 * @feature
 * - **동적 스타일링**: `toast.type`에 따라 아이콘, 색상, 좌측 테두리 스타일이 동적으로 변경됩니다.
 * - **자동 제거**: `toast.duration` 시간(밀리초)이 지나면 자동으로 사라집니다.
 * - **수동 제거**: 우측 상단의 닫기(X) 버튼을 클릭하여 수동으로 제거할 수 있습니다.
 * - **애니메이션**: 마운트될 때 오른쪽에서 슬라이드 인, 언마운트될 때 슬라이드 아웃 애니메이션 효과가 적용됩니다.
 * - **타이머 시각화**: 하단의 `ToastTimer` 컴포넌트를 통해 남은 시간을 시각적으로 표시합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {ToastState} props.toast - 표시할 토스트의 상태 객체 (`id`, `message`, `type`, `duration` 포함)
 */
export default function Toast({
  toast: { id, message, type, duration },
}: ToastProps) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const animationDuration = 500;

  useEffect(() => {
    setIsVisible(true);

    const close = () => {
      setIsVisible(false);
      setTimeout(() => {
        removeToast(id);
      }, animationDuration);
    };

    const timer = setTimeout(close, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, removeToast]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      removeToast(id);
    }, animationDuration);
  };

  const currentTypeStyle = typeStyles[type];

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-sm bg-white shadow-lg',
        'py-5 pr-9 pl-6',
        'max-w-400 min-w-300',
        'transform transition-all duration-500 ease-in-out',
        isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+30px)]',
        'border-l-8',
        currentTypeStyle.border,
      )}
      role='alert'
    >
      <div className='flex items-center gap-2'>
        {currentTypeStyle.icon && (
          <div
            className={cn(
              'flex size-20 items-center justify-center rounded-full p-1',
              currentTypeStyle.color,
              'text-white',
            )}
          >
            {currentTypeStyle.icon}
          </div>
        )}
        <div className='mx-5 flex flex-col'>
          <span className='text-md font-bold text-gray-800'>
            {currentTypeStyle.title}
          </span>
          <span className='text-lg text-gray-800'>{message}</span>
        </div>
      </div>

      <Button
        className={cn(
          'absolute top-2.5 right-4 opacity-50',
          'border-0 bg-transparent hover:bg-transparent',
          'rounded-full p-1',
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <CloseIcon className='size-15' />
      </Button>

      <ToastTimer
        color={currentTypeStyle.color}
        duration={duration}
        isVisible={isVisible}
      />
    </div>
  );
}
