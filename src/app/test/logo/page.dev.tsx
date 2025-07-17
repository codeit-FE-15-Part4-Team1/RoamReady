'use client';

import Logo3 from '@/app/assets/logos/logo';
import LogoSymbol from '@/app/assets/logos/logo-symbol';
import Logo1 from '@/app/assets/logos/logo-text-oneline';
import Logo2 from '@/app/assets/logos/logo-text-twoline';

const logoVariants = [
  { label: '기본 색상', className: 'h-80 w-80' },
  { label: 'brand-2 색상', className: 'text-brand-2 h-80 w-80' },
  { label: 'red 색상', className: 'text-red h-80 w-80' },
];

export default function LogoTestPage() {
  return (
    <main className='min-h-screen bg-white p-10'>
      <h1 className='mb-10 text-center text-3xl font-bold text-gray-800'>
        Logo 테스트 페이지
      </h1>

      <div className='space-y-16'>
        {/* Logo 1 */}
        <LogoSection title='Logo1' Component={Logo1} />

        {/* Logo 2 */}
        <LogoSection title='Logo2' Component={Logo2} />

        {/* Logo 3 */}
        <LogoSection title='Logo3' Component={Logo3} />

        {/* Logo Symbol */}
        <LogoSection title='LogoSymbol' Component={LogoSymbol} />
      </div>
    </main>
  );
}

function LogoSection({
  title,
  Component,
}: {
  title: string;
  Component: React.FC<{ className?: string }>;
}) {
  return (
    <section className='flex items-center justify-center space-y-6'>
      <h2 className='text-2xl font-semibold text-gray-700'>{title}</h2>
      <div className='flex flex-wrap gap-12'>
        {logoVariants.map((variant, idx) => (
          <div key={idx} className='flex flex-col items-center space-y-2'>
            <Component className={variant.className} />
            <span className='font-size-13 text-gray-500'>{variant.label}</span>
            <code className='font-size-13 rounded px-2 py-1 text-gray-600'>
              &lt;{title} className=&quot;{variant.className}&quot; /&gt;
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}
