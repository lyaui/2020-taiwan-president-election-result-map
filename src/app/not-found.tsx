import Image from 'next/image';

import logoImage from 'public/assets/logo/logo.svg';
import Navbar from '@/components/layout/Navbar';

function NotFound() {
  return (
    <main className="mt-[65px] 2xl:flex">
      <Navbar />
      <article className="h-[150px] w-full shrink-0 overflow-auto bg-gray-400 2xl:h-[calc(100vh-65px)] 2xl:w-[500px]"></article>

      <div className="mt-[100px] flex w-full flex-col items-center justify-start">
        <Image
          src={logoImage}
          alt="logo"
          width={137}
          height={85}
          draggable={false}
        />
        <p className="heading-5 mb-2 mt-1 !text-text-secondary">暫無資料</p>
        <p className="text-gray-600">請更換年份或地區重新搜尋</p>
      </div>
    </main>
  );
}

export default NotFound;
