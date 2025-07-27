'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useScrollLock } from '@/shared/hooks/useScrollLock';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageModal({
  images,
  initialIndex,
  onClose,
}: ImageModalProps) {
  useScrollLock(true);

  const [index, setIndex] = useState(initialIndex);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.min(Math.max(prev + e.deltaY * -0.001, 1), 3));
  };

  const handleClickZoom = () => {
    setScale((prev) => (prev === 1 ? 2 : 1));
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
      <button
        className='absolute top-6 right-6 z-10 cursor-pointer text-white hover:text-gray-200'
        onClick={onClose}
      >
        <X />
      </button>

      <button
        className='absolute left-4 z-10 cursor-pointer text-5xl text-white'
        onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
      >
        &#8592;
      </button>

      <div
        onWheel={handleWheel}
        onDoubleClick={handleClickZoom}
        className='tablet:h-[80vh] tablet:w-[90vw] relative h-[70vh] w-[80vw] max-w-3xl cursor-pointer'
      >
        <Image
          src={images[index]}
          alt={`Modal Image ${index + 1}`}
          fill
          className='object-contain'
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
          }}
        />
      </div>

      <button
        className='absolute right-4 z-10 cursor-pointer text-5xl text-white'
        onClick={() => setIndex((i) => (i + 1) % images.length)}
      >
        &#8594;
      </button>
    </div>
  );
}
