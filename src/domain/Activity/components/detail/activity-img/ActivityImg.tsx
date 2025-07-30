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

// 이미지에 공통적으로 적용되는 tw 스타일
const COMMON_IMAGE_CLASS =
  'rounded-xl object-cover cursor-pointer transition duration-300 ease-in-out hover:scale-105';

/**
 * @component ActivityImg
 *
 * 활동 상세 페이지에서 배너 이미지 및 서브 이미지를 조건에 따라 다양한 레이아웃으로 보여주는 컴포넌트입니다.
 * 이미지를 클릭하면 전체 화면 모달(`ImageModal`)로 확대되어 표시됩니다.
 *
 * 이미지 수에 따라 다음과 같이 렌더링됩니다:
 * - 1개: 하나의 큰 이미지
 * - 2개: 배너 포함 3개 이미지 수평 정렬
 * - 3개: 배너 + 2개 이미지 수직 정렬
 * - 4개 이상: 2x2 그리드, 마지막 칸에 나머지 개수 오버레이
 *
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.bannerImage - 메인 배너 이미지 URL
 * @param {SubImage[]} props.subImages - 서브 이미지 객체 배열
 *
 * @example
 * <ActivityImg
 *   bannerImage="/banner.jpg"
 *   subImages={[{ id: 1, imageUrl: '/sub1.jpg' }, { id: 2, imageUrl: '/sub2.jpg' }]}
 * />
 */
export default function ActivityImg({
  bannerImage,
  subImages,
}: ActivityImgProps) {
  const images = [bannerImage, ...subImages.map((img) => img.imageUrl)];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * 이미지 클릭 시 모달을 열고 현재 인덱스를 설정
   * @param {number} index - 클릭된 이미지의 인덱스
   */
  const handleClick = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

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
          className={COMMON_IMAGE_CLASS}
          priority
          role='button'
          aria-label='이미지 확대 보기'
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

  // 이미지가 2장일 경우: 나란히 두 개 렌더링
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
              role='button'
              aria-label={`이미지 ${index + 1} 확대 보기`}
            >
              <Image
                src={src}
                alt='Activity Image'
                fill
                className={COMMON_IMAGE_CLASS}
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

  // 이미지가 3장일 경우: 1개는 왼쪽 세로, 2개는 오른쪽 세로로 나열
  if (subImages.length === 3) {
    return (
      <div className='flex gap-4'>
        {/* 첫 번째 이미지는 큰 영역 차지 */}
        <div
          className='tablet:h-400 relative h-220 w-full overflow-hidden rounded-xl'
          onClick={() => handleClick(0)}
          role='button'
          aria-label='배너 이미지 확대 보기'
        >
          <Image
            src={bannerImage}
            alt='Activity Image'
            fill
            className={COMMON_IMAGE_CLASS}
          />
        </div>

        {/* 두 번째, 세 번째 이미지는 위아래로 배치 */}
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
                className={COMMON_IMAGE_CLASS}
                role='button'
                aria-label={`서브 이미지 ${idx + 1} 확대 보기`}
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

  // 이미지가 4장이상일 경우: 2행 2열의 그리드로 배치, 마지막 이미지에 나머지 수 표시
  if (subImages.length >= 4) {
    return (
      <div
        className='tablet:h-410 grid h-220 w-full grid-cols-2 grid-rows-2 gap-4'
        role='list'
        aria-label='이미지 미리보기 목록'
      >
        {[bannerImage, ...subImages.map((img) => img.imageUrl)]
          .slice(0, 4)
          .map((src, index) => (
            <div
              key={index}
              className='relative h-full w-full cursor-pointer overflow-hidden rounded-xl'
              onClick={() => handleClick(index)}
              role='button'
              aria-label={`이미지 ${index + 1} 확대 보기`}
            >
              <Image
                src={src}
                alt='Activity Image'
                fill
                className={COMMON_IMAGE_CLASS}
              />
              {index === 3 && subImages.length > 3 && (
                <div className='flex'>
                  <span
                    role='button'
                    aria-label={`추가 이미지 ${subImages.length - 3}장 더 보기`}
                    className='font-size-24 absolute inset-0 flex items-center justify-center bg-black/50 font-bold text-white hover:bg-black/60'
                  >
                    <Plus className='h-20 w-20' aria-hidden='true' />{' '}
                    {subImages.length - 3}
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
