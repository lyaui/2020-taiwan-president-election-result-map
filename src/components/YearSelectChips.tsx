'use client';

import querystring from 'querystring';
import { useRouter } from 'next/navigation';

import { ROUTER, QUERY } from '@/routers/index';
import { years } from '@/constants/index';
import Chip from '@/components/UI/Chip';

function YearSelectChips() {
  const router = useRouter();

  const handleGoMapPage = (year: number) => () => {
    const queryString = querystring.stringify({
      [QUERY.YEAR]: year,
    });
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  return (
    <div className='flex flex-wrap gap-4'>
      {years.map((_year) => (
        <Chip
          key={_year}
          onClick={handleGoMapPage(_year)}
          className='w-[170px]'
        >
          {_year}
        </Chip>
      ))}
    </div>
  );
}

export default YearSelectChips;
