'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';

import { ROUTER, QUERY } from '@/routers';
import taiwanCities from 'public/json/taiwancities.json';
import useWindowSize from '@/hooks/useWindowSize';
import Selector from '@/components/UI/Selector';

interface City {
  name: string;
  districts: {
    zip: string;
    name: string;
  }[];
}

interface CityOption {
  label: string;
  value: string;
}

function CitySelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { windowSize } = useWindowSize();

  const city = searchParams.get(QUERY.CITY) || '';
  const handleCityChange = (value: string) => {
    const queryString = querystring.stringify(
      {
        ...querystring.parse(searchParams.toString()),
        [QUERY.CITY]: value,
        [QUERY.DIST]: '',
      },
      { skipEmptyString: true }
    );
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  const cityOptions: CityOption[] = [
    { label: '全部縣市', value: '' },
    ...taiwanCities.map((_city: City) => ({
      label: _city.name,
      value: _city.name,
    })),
  ];

  return (
    <Selector
      value={city}
      onChange={handleCityChange}
      options={cityOptions}
      // FIXME 時間不夠，之後把醜三元修掉
      width={
        windowSize.width >= 1024 ? 190 : windowSize.width >= 480 ? 120 : 110
      }
    />
  );
}

export default CitySelector;
