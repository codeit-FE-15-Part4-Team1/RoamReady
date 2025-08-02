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

/**
 * ImageModal
 *
 * 전체 화면을 덮는 이미지 모달 컴포넌트입니다. 사용자가 선택한 이미지를 크게 보여주며,
 * 다음과 같은 상호작용을 제공합니다:
 *
 * - 마우스 휠로 이미지 확대/축소 (`scale` 1~3 사이)
 * - 더블 클릭으로 1배/2배 확대 토글
 * - 좌우 화살표 버튼 또는 키보드 방향키로 이미지 슬라이드
 * - ESC 키 또는 상단 닫기 버튼으로 모달 종료
 *
 * @param images 이미지 URL 배열
 * @param initialIndex 초기 표시할 이미지 인덱스
 * @param onClose 모달 닫기 핸들러
 *
 * @example
 * <ImageModal
 *   images={['/image1.jpg', '/image2.jpg']}
 *   initialIndex={0}
 *   onClose={() => setOpen(false)}
 * />
 */
export default function ImageModal({
  images,
  initialIndex,
  onClose,
}: ImageModalProps) {
  useScrollLock(true); // 모달 오픈 시 스크롤 잠금

  const [index, setIndex] = useState(initialIndex);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  /**
   * 마우스 휠로 이미지 확대/축소 처리
   * @param e WheelEvent
   */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.min(Math.max(prev + e.deltaY * -0.001, 1), 3));
  };

  /**
   * 더블 클릭 시 확대/축소 토글
   */
  const handleClickZoom = () => {
    setScale((prev) => (prev === 1 ? 2 : 1));
    setOffset({ x: 0, y: 0 });
  };

  /**
   * 키보드 이벤트 처리: ESC, →, ←
   */
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
    <div
      className='flex-center fixed inset-0 z-50 bg-black/80'
      role='dialog'
      aria-modal='true'
      aria-label='이미지 상세 보기 모달'
    >
      {/* 닫기 버튼 */}
      <button
        className='absolute top-6 right-6 z-10 cursor-pointer text-white hover:text-gray-200'
        onClick={onClose}
        aria-label='모달 닫기'
      >
        <X />
      </button>

      {/* 이전 이미지 버튼 */}
      <button
        className='absolute left-4 z-10 cursor-pointer text-5xl text-white'
        onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
        aria-label='이전 이미지 보기'
      >
        &#8592;
      </button>

      {/* 이미지 표시 영역 */}
      <div
        onWheel={handleWheel}
        onDoubleClick={handleClickZoom}
        className='tablet:h-[80vh] tablet:w-[90vw] relative h-[70vh] w-[80vw] max-w-3xl cursor-pointer'
        role='img'
        aria-label={`이미지 ${index + 1} / ${images.length}`}
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

      {/* 다음 이미지 버튼 */}
      <button
        className='absolute right-4 z-10 cursor-pointer text-5xl text-white'
        onClick={() => setIndex((i) => (i + 1) % images.length)}
        aria-label='다음 이미지 보기'
      >
        &#8594;
      </button>
    </div>
  );
}
