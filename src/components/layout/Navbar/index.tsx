'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { ROUTER } from '@/routers';
import logoNavImg from 'public/assets/logo/logo_nav.svg';
import fbIcon from 'public/assets/icons/facebook.svg';
import igIcon from 'public/assets/icons/instagram.svg';
import ytIcon from 'public/assets/icons/youtube.svg';
import YearSelector from '@/components/layout/Navbar/YearSelector';
import CitySelector from '@/components/layout/Navbar/CitySelector';
import DistSelector from '@/components/layout/Navbar/DistSelector';

const logoStyle = {
  backgroundImage: `url(${logoNavImg.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  width: '100%',
  height: '100%',
  display: 'block',
  textIndent: '101%',
  overflow: 'hidden',
  'white-space': 'nowrap',
};

function Navbar() {
  const [mounted, setMounted] = useState(false);

  const medias = [
    { platform: 'facebook', icon: fbIcon },
    { platform: 'instagram', icon: igIcon },
    { platform: 'youtube', icon: ytIcon },
  ];

  const selectors = (
    <div className="relative flex items-center  rounded-[500px] bg-background pl-6">
      <MagnifyingGlassIcon className="absolute left-3 z-10 w-[18px] text-text-primary" />
      <CitySelector />
      <DistSelector />
    </div>
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <nav className="fixed top-0 z-50 flex h-[65px] w-full items-center border-b-[1px] border-line bg-white px-3 xs:px-6">
      <div className="hidden w-full md:block">
        <div className="flex items-center justify-between gap-6">
          <h1 className="h-[40px] w-[310px]">
            <Link href={ROUTER.HOME} style={logoStyle}>
              台灣歷年總統 都幾
            </Link>
          </h1>
          <div className="flex gap-4">
            <YearSelector />
            {selectors}
          </div>
          <div className="ml-auto hidden gap-4 xl:flex">
            <p className="text-text-primary">分享</p>
            {medias.map((_media) => (
              <Image
                key={_media.platform}
                src={_media.icon}
                alt={`share to ${_media.platform}`}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-center justify-between gap-2 md:hidden">
        <YearSelector />
        {selectors}
      </div>
    </nav>
  );
}

export default Navbar;
