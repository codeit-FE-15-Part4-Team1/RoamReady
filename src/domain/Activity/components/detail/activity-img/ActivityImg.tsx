'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import ImageModal from './ImageModal';

interface SubImage {
  id: number;
  imageUrl: string;
}

interface ActivityImgProps {
  bannerImage: string;
  subImages: SubImage[];
}

export default function ActivityImg({
  bannerImage,
  subImages,
}: ActivityImgProps) {
  const images = [bannerImage, ...subImages.map((img) => img.imageUrl)];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  if (!subImages || subImages.length === 0) return null;

  if (subImages.length === 1) {
    return (
      <div className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'>
        <Image
          src={subImages[0].imageUrl}
          alt='Activity Image'
          fill
          className='h-auto w-full rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          priority
          onClick={() => handleClick(1)}
        />
        {isOpen && (
          <ImageModal
            images={images}
            initialIndex={1}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  if (subImages.length === 2) {
    return (
      <div className='flex gap-4'>
        {[bannerImage, ...subImages.map((img) => img.imageUrl)]
          .slice(0, 3)
          .map((src, index) => (
            <div
              key={index}
              className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'
              onClick={() => handleClick(index)}
            >
              <Image
                src={src}
                alt='Activity Image'
                fill
                className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
              />
            </div>
          ))}
        {isOpen && (
          <ImageModal
            images={images}
            initialIndex={currentIndex}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  if (subImages.length === 3) {
    return (
      <div className='flex gap-4'>
        <div
          className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'
          onClick={() => handleClick(0)}
        >
          <Image
            src={bannerImage}
            alt='Activity Image'
            fill
            className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          />
        </div>

        <div className='flex flex-col gap-2'>
          {subImages.slice(0, 2).map((img, idx) => (
            <div
              key={img.id}
              className='tablet:w-330 tablet:h-200 relative h-110 w-150 overflow-hidden rounded-xl'
              onClick={() => handleClick(idx + 1)}
            >
              <Image
                src={img.imageUrl}
                alt='Activity Image'
                fill
                className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
              />
            </div>
          ))}
        </div>
        {isOpen && (
          <ImageModal
            images={images}
            initialIndex={currentIndex}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  if (subImages.length >= 4) {
    return (
      <div className='tablet:h-410 grid h-220 w-full grid-cols-2 grid-rows-2 gap-4'>
        {[bannerImage, ...subImages.map((img) => img.imageUrl)]
          .slice(0, 4)
          .map((src, index) => (
            <div
              key={index}
              className='relative h-full w-full cursor-pointer overflow-hidden rounded-xl'
              onClick={() => handleClick(index)}
            >
              <Image
                src={src}
                alt='Activity Image'
                fill
                className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
              />
              {index === 3 && subImages.length > 3 && (
                <div className='flex'>
                  <span className='font-size-24 absolute inset-0 flex items-center justify-center bg-black/50 font-bold text-white hover:bg-black/60'>
                    <Plus className='h-20 w-20' /> {subImages.length - 3}
                  </span>
                </div>
              )}
            </div>
          ))}
        {isOpen && (
          <ImageModal
            images={images}
            initialIndex={currentIndex}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }
}
