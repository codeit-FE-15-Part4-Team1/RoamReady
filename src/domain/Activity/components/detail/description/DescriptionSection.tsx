/**
 * DescriptionSection
 * 체험 상세 페이지에서 체험 설명을 보여주는 컴포넌트
 *
 * @param description - 체험에 대한 상세 설명 문자열
 * @returns 제목과 설명 내용을 포함한 section 요소
 *
 * @example
 * <DescriptionSection description="도심 속 자연을 느낄 수 있는 힐링 체험입니다." />
 */
export default function DescriptionSection({
  description,
}: {
  description: string;
}) {
  return (
    <section className='flex w-full flex-col gap-8 border-b border-gray-100 pb-40'>
      <h2 className='font-size-18 font-bold'>체험 설명</h2>
      <p className='font-size-16 font-medium break-words whitespace-pre-line'>
        {description}
      </p>
    </section>
  );
}
