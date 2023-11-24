import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import logoNavImg from 'public/assets/logo/logo_nav.svg';
import fbIcon from 'public/assets/icons/facebook.svg';
import igIcon from 'public/assets/icons/instagram.svg';
import ytIcon from 'public/assets/icons/youtube.svg';
import YearSelector from '@/components/layout/Navbar/YearSelector';
import CitySelector from '@/components/layout/Navbar/CitySelector';
import DistSelector from '@/components/layout/Navbar/DistSelector';

function Navbar() {
  const medias = [
    { platform: 'facebook', icon: fbIcon },
    { platform: 'instagram', icon: igIcon },
    { platform: 'youtube', icon: ytIcon },
  ];
  return (
    <nav className='fixed top-0 z-50 bg-white w-full flex items-center gap-6 h-[65px] border-b-[1px] border-line py-3 px-6'>
      <Image src={logoNavImg} alt='台灣歷年總統 都幾' />
      <div className='flex gap-4'>
        <YearSelector />
        <div className='relative flex-center bg-background rounded-[500px] pl-6'>
          <MagnifyingGlassIcon className='absolute z-10 left-3 w-[18px] text-text-primary' />
          <CitySelector />
          <DistSelector />
        </div>
      </div>
      <div className='flex gap-4 ml-auto'>
        <p className='text-text-primary'>分享</p>
        {medias.map((_media) => (
          <Image
            key={_media.platform}
            src={_media.icon}
            alt={`share to ${_media.platform}`}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
