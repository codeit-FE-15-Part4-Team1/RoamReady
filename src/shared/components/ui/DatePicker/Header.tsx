import { ReactNode } from 'react';

import TriangleArrow from '../../icons/triangle-arrow';
import { useDatePickerContext } from './context';

export const DatePickerHeader = ({ children }: { children?: ReactNode }) => {
  const { currentMonth, setCurrentMonth } = useDatePickerContext();

  return (
    <>
      {children ? (
        children
      ) : (
        <div className='flex items-center justify-between pb-20'>
          <div className='font-size-16 font-medium text-gray-800'>
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
              />
            </button>

            <button
              onClick={() => setCurrentMonth((prev) => prev.add(1, 'month'))}
              className='cursor-pointer'
            >
              <TriangleArrow
                className='text-gray-950 hover:text-gray-300'
                direction='right'
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
