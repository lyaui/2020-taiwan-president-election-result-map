'use client';

import { useRef, type ReactNode } from 'react';

import IconButton from '@/components/UI/IconButton';
import Footer from '@/components/layout/Footer';

interface StatisticsLayoutProps {
  children: ReactNode;
}

function StatisticsLayout({ children }: StatisticsLayoutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollTopClick = () => {
    if (!sectionRef.current) return;
    sectionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      ref={sectionRef}
      className='h-[calc(100vh-65px)] w-full flex flex-col gap-6 px-12 pt-8 overflow-auto '
    >
      {children}
      <IconButton
        onClick={handleScrollTopClick}
        iconName='ArrowUpIcon'
        variant='outlined'
        color='primary'
        size='large'
        className='fixed right-[24px] bottom-[24px] shadow-[0_4px_10px_0_rgba(0,0,0,0.12)]'
      />
      <Footer />
    </article>
  );
}

export default StatisticsLayout;
