import Image from 'next/image';
import YearSelectChips from '@/components/YearSelectChips';
import logoImage from 'public/assets/logo/logo.svg';
import titleImage from 'public/assets/logo/title_text.svg';

export default function Home() {
  const handleYearClick = () => {};
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='max-w-[924px] py-[96px] col-center gap-6'>
        <>
          <Image
            src={logoImage}
            alt='logo'
            width={137}
            height={85}
            draggable={false}
          />
          <Image
            src={titleImage}
            alt='台灣歷年總統 都幾?'
            width={525}
            height={85}
            draggable={false}
          />
        </>
        <h4 className='heading-4 text-primary'>查詢選擇年份</h4>
        <YearSelectChips />
      </div>
    </main>
  );
}
