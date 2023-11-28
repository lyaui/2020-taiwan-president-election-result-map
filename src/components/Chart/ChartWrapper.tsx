import { type ReactNode } from 'react';

interface ChartWrapper {
  children: ReactNode;
}

function ChartWrapper({ children }: ChartWrapper) {
  return (
    <div className='border-[1px] border-line px-4 py-6 rounded-xl'>
      <div className='h-[270px] 2xl:h-[300px]'>{children}</div>
    </div>
  );
}

export default ChartWrapper;
