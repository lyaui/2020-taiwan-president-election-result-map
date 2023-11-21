'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'querystring';

import { ROUTER, QUERY } from '@/routers';
import { years } from '@/constants/index';
import Selector from '@/components/UI/Selector';

function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const year = searchParams.get(QUERY.YEAR);
  const currentYear = year ? parseInt(year) : (years.at(-1) as number);

  const handleYearChange = (value: number) => {
    const queryString = querystring.stringify({
      [QUERY.YEAR]: value,
    });
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  const yearOptions = years.map((_year) => ({
    label: `${_year}`,
    value: _year,
  }));

  return (
    <Selector
      label='選擇年份'
      value={currentYear}
      onChange={handleYearChange}
      options={yearOptions}
    />
  );
}

export default YearSelector;
