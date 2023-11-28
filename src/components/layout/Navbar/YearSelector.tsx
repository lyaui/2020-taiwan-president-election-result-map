'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';

import { ROUTER, QUERY } from '@/routers';
import { years } from '@/constants/index';
import useWindowSize from '@/hooks/useWindowSize';
import Selector from '@/components/UI/Selector';

function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { windowSize } = useWindowSize();

  const year = searchParams.get(QUERY.YEAR);
  const currentYear = year || (years.at(0) as string);

  const handleYearChange = (value: string) => {
    const queryString = querystring.stringify(
      {
        ...querystring.parse(searchParams.toString()),
        [QUERY.YEAR]: value,
      },
      { skipEmptyString: true },
    );
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  const yearOptions = years.map((_year) => ({
    label: _year,
    value: _year,
  }));

  const label = windowSize.width >= 1024 ? '選擇年份' : '';

  return (
    <Selector
      label={label}
      value={currentYear}
      onChange={handleYearChange}
      options={yearOptions}
      width={120}
    />
  );
}

export default YearSelector;
