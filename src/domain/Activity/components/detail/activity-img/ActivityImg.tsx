'use client';

import Image from 'next/image';
import React from 'react';

interface SubImage {
  id: number;
  imageUrl: string;
}

interface ActivityImgProps {
  subImages: SubImage[];
}

export default function ActivityImg({ subImages }: ActivityImgProps) {
  if (!subImages || subImages.length === 0) return null;

  if (subImages.length === 1) {
    return (
      <div className='relative h-400 w-660 overflow-hidden rounded-xl'>
        <Image
          src={subImages[0].imageUrl}
          alt='Activity Image'
          fill
          className='h-auto w-full rounded-xl object-cover'
          priority
        />
      </div>
    );
  }

  if (subImages.length === 2) {
    return (
      <div className='flex gap-4'>
        {subImages.map((img) => (
          <div
            key={img.id}
            className='relative h-400 w-full overflow-hidden rounded-xl'
          >
            <Image
              src={img.imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover'
            />
          </div>
        ))}
      </div>
    );
  }

  if (subImages.length === 3) {
    return (
      <div className='flex gap-4'>
        <div className='relative h-400 w-full overflow-hidden rounded-xl'>
          <Image
            src={subImages[0].imageUrl}
            alt='Activity Image'
            fill
            className='rounded-xl object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='relative h-200 w-full overflow-hidden rounded-xl'>
            <Image
              src={subImages[1].imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover'
            />
          </div>
          <div className='relative h-200 w-330 overflow-hidden rounded-xl'>
            <Image
              src={subImages[2].imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover'
            />
          </div>
        </div>
      </div>
    );
  }

  if (subImages.length === 4) {
    return (
      <div className='grid h-410 w-670 grid-cols-2 grid-rows-2 gap-4'>
        {subImages.map((img) => (
          <div
            key={img.id}
            className='relative h-200 w-330 overflow-hidden rounded-xl'
          >
            <Image
              src={img.imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover'
            />
          </div>
        ))}
      </div>
    );
  }

  // 5개 이상: 첫 3개만 보여주는 레이아웃
  return (
    <div className='flex gap-2'>
      <div className='overflow-hidden rounded-xl'>
        <Image
          src={subImages[0].imageUrl}
          alt='Activity Image'
          width={800}
          height={300}
          className='h-auto w-full rounded-xl object-cover'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='overflow-hidden rounded-xl'>
          <Image
            src={subImages[1].imageUrl}
            alt='Activity Image'
            width={400}
            height={145}
            className='h-auto w-full rounded-xl object-cover'
          />
        </div>
        <div className='overflow-hidden rounded-xl'>
          <Image
            src={subImages[2].imageUrl}
            alt='Activity Image'
            width={400}
            height={145}
            className='h-auto w-full rounded-xl object-cover'
          />
        </div>
      </div>
    </div>
  );
}
