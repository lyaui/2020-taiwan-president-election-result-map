'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

import IconButton from '@/components/UI/IconButton';
import Footer from '@/components/layout/Footer';

interface StatisticsLayoutProps {
  children: ReactNode;
}

function StatisticsLayout({ children }: StatisticsLayoutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const handleScrollTop = () => {
    if (!sectionRef.current) return;
    sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScrollTop();
  }, [queryString]);

  return (
    <article
      ref={sectionRef}
      className='h-[calc(100vh-65px)] w-full flex flex-col gap-6 px-4 md:px-12 pt-8 overflow-auto '
    >
      {children}
      <IconButton
        onClick={handleScrollTop}
        iconName='ArrowUpIcon'
        variant='outlined'
        color='primary'
        size='large'
        className='fixed right-[24px] bottom-[24px] c-shadow'
      />
      <Footer />
    </article>
  );
}

export default StatisticsLayout;
