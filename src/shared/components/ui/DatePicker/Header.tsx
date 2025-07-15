import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';

import TriangleArrow from '../../icons/triangle-arrow';
import { useDatePickerContext } from './context';

export const DatePickerHeader = ({ children }: { children?: ReactNode }) => {
  const { currentMonth, setCurrentMonth, size } = useDatePickerContext();

  return (
    <>
      {children ? (
        children
      ) : (
        <div
          className={cn(
            'flex items-center justify-between',
            size === 's' ? 'pb-6' : 'pb-20',
          )}
        >
          <div
            className={cn(
              size === 's' ? 'font-size-10' : 'font-size-16',
              'font-medium text-gray-800',
            )}
          >
            {currentMonth.format('MMMM YYYY')}
          </div>

          <div className='flex items-center gap-20'>
            <button
              onClick={() =>
                setCurrentMonth((prev) => prev.subtract(1, 'month'))
              }
              className='cursor-pointer'
            >
              <TriangleArrow
                className='text-gray-950 hover:text-gray-300'
                direction='left'
                width={size === 's' ? '8' : '16'}
                height={size === 's' ? '8' : '16'}
              />
            </button>

            <button
              onClick={() => setCurrentMonth((prev) => prev.add(1, 'month'))}
              className='cursor-pointer'
            >
              <TriangleArrow
                className='text-gray-950 hover:text-gray-300'
                direction='right'
                width={size === 's' ? '8' : '16'}
                height={size === 's' ? '8' : '16'}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
