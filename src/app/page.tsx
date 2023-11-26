import Image from 'next/image';

import vampireImg from 'public/assets/images/candidate_vampire.png';
import superVillainImg from 'public/assets/images/candidate_supervillain.png';
import trollImg from 'public/assets/images/candidate_troll.png';
import mageImg from 'public/assets/images/candidate_mage.png';
import elfImg from 'public/assets/images/candidate_elf.png';
import zombieImg from 'public/assets/images/candidate_zombie.png';
import logoImage from 'public/assets/logo/logo.svg';
import titleImage from 'public/assets/logo/title_text.svg';
import YearSelectChips from '@/components/YearSelectChips';

export default function Home() {
  const candidatesImgs = [
    vampireImg,
    superVillainImg,
    trollImg,
    mageImg,
    elfImg,
    zombieImg,
  ];
  return (
    <main className='relative flex flex-col 2xl:justify-center items-center w-full h-screen bg-gray-100 overflow-hidden'>
      <div className='py-[96px] col-center gap-10 px-10'>
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
        <h4 className='heading-4 !text-primary'>查詢選擇年份</h4>
        <YearSelectChips />
      </div>
      <div className='absolute flex-center sm:gap-12 bottom-0'>
        {candidatesImgs.map((_img, index) => (
          <div
            key={index}
            className='relative w-[100px] sm:w-[200px] md:w-[256px] h-[100px] sm:h-[200px] md:h-[256px]'
          >
            <Image
              src={_img}
              alt='candidate'
              fill
              draggable={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
