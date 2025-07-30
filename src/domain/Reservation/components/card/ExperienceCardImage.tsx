import Image from 'next/image';

interface ExperienceCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * ExperienceCard의 이미지 컴포넌트
 */
export default function ExperienceCardImage({
  src,
  alt,
  className = '',
}: ExperienceCardImageProps) {
  return (
    <div className={`desktop:w-181 relative aspect-square w-136 ${className}`}>
      <Image src={src} alt={alt} fill className='rounded-3xl object-cover' />
    </div>
  );
}
