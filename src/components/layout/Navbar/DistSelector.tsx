'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';

import { ROUTER, QUERY } from '@/routers';
import taiwanCities from 'public/json/taiwancities.json';
import Selector from '@/components/UI/Selector';

interface City {
  name: string;
  districts: {
    zip: string;
    name: string;
  }[];
}

interface DistOption {
  label: string;
  value: string;
}

function DistSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get(QUERY.CITY) || '';
  const dist = searchParams.get(QUERY.DIST) || '選擇區域';
  const handleDistChange = (value: string) => {
    const queryString = querystring.stringify(
      {
        ...querystring.parse(searchParams.toString()),
        [QUERY.DIST]: value,
      },
      { skipEmptyString: true },
    );
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  const foundCity: City = taiwanCities.find(
    (_city: City) => _city.name === city,
  );

  const distOptions: DistOption[] = foundCity
    ? [
        { label: '全部區域', value: '' },
        ...foundCity.districts.map((_dist) => ({
          label: _dist.name,
          value: _dist.name,
        })),
      ]
    : [];

  const value = city && dist ? dist : '選擇區域';

  return (
    <Selector
      value={value}
      onChange={handleDistChange}
      options={distOptions}
      width={190}
      disabled={!city}
    />
  );
}

export default DistSelector;
