export default function DescriptionSection({
  description,
}: {
  description: string;
}) {
  return (
    <section className='flex flex-col gap-8'>
      <h2 className='font-size-18 font-bold'>체험 설명</h2>
      <p className='font-size-16 font-medium'>{description}</p>
    </section>
  );
}
