'use client';

import Image from 'next/image';

import logoImage from 'public/assets/logo/logo.svg';
import Navbar from '@/components/layout/Navbar';

function NotFound() {
  return (
    <main className='2xl:flex mt-[65px]'>
      <Navbar />
      <article className='w-full 2xl:w-[500px] h-[150px] 2xl:h-[calc(100vh-65px)] bg-gray-400 overflow-auto shrink-0'></article>

      <div className='w-full flex flex-col items-center justify-start mt-[100px]'>
        <Image
          src={logoImage}
          alt='logo'
          width={137}
          height={85}
          draggable={false}
        />
        <p className='heading-5 !text-text-secondary mt-1 mb-2'>暫無資料</p>
        <p className='text-gray-600'>請更換年份或地區重新搜尋</p>
      </div>
    </main>
  );
}

export default NotFound;
