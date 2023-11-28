import { type ReactNode } from 'react';

interface ChartWrapper {
  title: string;
  children: ReactNode;
}

function ChartWrapper({ title, children }: ChartWrapper) {
  return (
    <div className='border-[1px] border-line px-4 py-6 rounded-xl'>
      {/* <h4 className='heading-5 mb-1'>{title}</h4> */}
      <div className='h-[270px] 2xl:h-[300px]'>{children}</div>
    </div>
  );
}

export default ChartWrapper;
