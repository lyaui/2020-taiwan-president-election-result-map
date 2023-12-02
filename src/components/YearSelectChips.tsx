'use client';

import querystring from 'query-string';
import { useRouter } from 'next/navigation';

import { ROUTER, QUERY } from '@/routers/index';
import { years } from '@/constants/index';
import Chip from '@/components/UI/Chip';

function YearSelectChips() {
  const router = useRouter();

  const handleGoMapPage = (year: string) => () => {
    const queryString = querystring.stringify({
      [QUERY.YEAR]: year,
    });
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  return (
    <div className="z-10 flex flex-col flex-wrap gap-4 sm:flex-row">
      {[...years].reverse().map((_year) => (
        <Chip
          key={_year}
          onClick={handleGoMapPage(_year)}
          className="w-[170px]"
        >
          {_year}
        </Chip>
      ))}
    </div>
  );
}

export default YearSelectChips;
