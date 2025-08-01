'use client';

import { useState } from 'react';

import StarIcon from '@/domain/Reservation/components/reservation-card/StarIcon';
import { cn } from '@/shared/libs/cn';

interface StarRatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarRatingInput({
  rating,
  onRatingChange,
}: StarRatingInputProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    onRatingChange(index + 1); // index는 0부터 시작하므로 +1
  };

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            'cursor-pointer',
            index < (hoveredRating || rating)
              ? 'text-yellow-500'
              : 'text-gray-300',
          )}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
