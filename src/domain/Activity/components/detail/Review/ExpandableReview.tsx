'use client';

import { useEffect, useRef, useState } from 'react';

import TriangleArrow from '@/shared/assets/icons/TriangleArrow';

interface ExpandableReviewProps {
  text: string;
}

export default function ExpandableReview({ text }: ExpandableReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const COLLAPSED_LINE_COUNT = 5;
  const LINE_HEIGHT = 24;
  const collapsedMaxHeight = COLLAPSED_LINE_COUNT * LINE_HEIGHT;

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (el && el.scrollHeight > collapsedMaxHeight + 5) {
        setShowToggle(true);
      }
    });
  }, [text]);

  useEffect(() => {
    const handleResize = () => {
      const el = contentRef.current;
      if (el && el.scrollHeight > collapsedMaxHeight + 5) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='w-full'>
      {/* 본문 텍스트 */}
      <div
        ref={contentRef}
        className={`font-size-16 relative overflow-hidden font-medium break-words whitespace-pre-line text-gray-950 transition-all duration-900 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-80' : 'max-h-[120px] opacity-100'
        }`}
      >
        {text}

        {/* 말줄임용 그라디언트 */}
        {!isExpanded && showToggle && (
          <div className='pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white via-white/100 to-transparent transition-opacity duration-500' />
        )}
      </div>

      {/* 더보기 버튼 */}
      {showToggle && (
        <div className='mt-8 text-center'>
          <button
            type='button'
            onClick={() => setIsExpanded((prev) => !prev)}
            className='font-size-12 cursor-pointer text-gray-800 underline'
          >
            {isExpanded ? (
              <TriangleArrow
                className='text-gray-300 hover:text-gray-950'
                direction='top'
              />
            ) : (
              <TriangleArrow
                className='text-gray-300 hover:text-gray-950'
                direction='bottom'
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
