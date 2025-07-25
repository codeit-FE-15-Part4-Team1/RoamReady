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

/**
 * ActivityImg
 * 체험(액티비티)의 서브 이미지들을 개수에 따라 다양한 레이아웃으로 보여주는 컴포넌트
 *
 * @param subImages - 렌더링할 서브 이미지 배열 (id와 imageUrl을 포함)
 * @returns 이미지 개수에 따라 조건부 레이아웃이 적용된 이미지 컴포넌트 반환
 *
 * @example
 * <ActivityImg
 *   subImages={[
 *     { id: 1, imageUrl: '/img1.jpg' },
 *     { id: 2, imageUrl: '/img2.jpg' },
 *     { id: 3, imageUrl: '/img3.jpg' },
 *   ]}
 * />
 */
export default function ActivityImg({ subImages }: ActivityImgProps) {
  // 이미지가 없을 경우 렌더링하지 않음
  if (!subImages || subImages.length === 0) return null;

  // 이미지가 1장일 경우: 전체 너비 이미지 하나만 렌더링
  if (subImages.length === 1) {
    return (
      <div className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'>
        <Image
          src={subImages[0].imageUrl}
          alt='Activity Image'
          fill
          className='h-auto w-full rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          priority
        />
      </div>
    );
  }

  // 이미지가 2장일 경우: 나란히 두 개 렌더링
  if (subImages.length === 2) {
    return (
      <div className='flex gap-4'>
        {subImages.map((img) => (
          <div
            key={img.id}
            className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'
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
    );
  }

  // 이미지가 3장일 경우: 1개는 왼쪽 세로, 2개는 오른쪽 세로로 나열
  if (subImages.length === 3) {
    return (
      <div className='flex gap-4'>
        {/* 첫 번째 이미지는 큰 영역 차지 */}
        <div className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'>
          <Image
            src={subImages[0].imageUrl}
            alt='Activity Image'
            fill
            className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          />
        </div>

        {/* 두 번째, 세 번째 이미지는 위아래로 배치 */}
        <div className='flex flex-col gap-2'>
          <div className='tablet:w-330 tablet:h-200 relative h-110 w-150 overflow-hidden rounded-xl'>
            <Image
              src={subImages[1].imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
            />
          </div>
          <div className='tablet:w-330 tablet:h-200 relative h-110 w-150 overflow-hidden rounded-xl'>
            <Image
              src={subImages[2].imageUrl}
              alt='Activity Image'
              fill
              className='rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
            />
          </div>
        </div>
      </div>
    );
  }

  // 이미지가 4장일 경우: 2행 2열의 그리드로 배치
  if (subImages.length === 4) {
    return (
      <div className='tablet:h-410 grid h-220 w-full grid-cols-2 grid-rows-2 gap-4'>
        {subImages.map((img) => (
          <div
            key={img.id}
            className='relative h-full w-full overflow-hidden rounded-xl'
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
    );
  }

  // 5개 이상: 첫 3개만 보여주는 레이아웃
  return (
    <div className='flex gap-2'>
      {/* 첫 번째 이미지는 왼쪽 큰 이미지 */}
      <div className='overflow-hidden rounded-xl'>
        <Image
          src={subImages[0].imageUrl}
          alt='Activity Image'
          width={800}
          height={300}
          className='h-auto w-full rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
        />
      </div>

      {/* 두 번째, 세 번째 이미지는 오른쪽 위아래로 나열 */}
      <div className='flex flex-col gap-2'>
        <div className='overflow-hidden rounded-xl'>
          <Image
            src={subImages[1].imageUrl}
            alt='Activity Image'
            width={400}
            height={145}
            className='h-auto w-full rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          />
        </div>
        <div className='overflow-hidden rounded-xl'>
          <Image
            src={subImages[2].imageUrl}
            alt='Activity Image'
            width={400}
            height={145}
            className='h-auto w-full rounded-xl object-cover transition duration-300 ease-in-out hover:scale-105'
          />
        </div>
      </div>
    </div>
  );
}
