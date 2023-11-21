'use client';

import { Fragment } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'querystring';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { ROUTER, QUERY } from '@/routers';
import { years } from '@/constants/index';

function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const year = searchParams.get(QUERY.YEAR);
  const currentYear = year || years.at(-1);

  const handleYearChange = (value: number) => {
    const queryString = querystring.stringify({
      [QUERY.YEAR]: value,
    });
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  return (
    <div className='flex flex-col'>
      <Listbox value={currentYear} onChange={handleYearChange}>
        {({ open }) => (
          <div className='relative'>
            <Listbox.Button className='w-[120px] flex-center text-text-primary gap-8 rounded-[500px] bg-background px-4 py-[8.5px]'>
              {currentYear}
              <ChevronDownIcon
                className={`w-[16px] ${open && '-rotate-180 c-transition'}`}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute w-[185px] top-10 bg-white border-[1px] border-line rounded-lg py-2 text-text-primary'>
                {years.map((_year) => (
                  <Listbox.Option
                    key={_year}
                    value={_year}
                    className='px-4 py-2 cursor-pointer hover:bg-hover c-transition'
                  >
                    {_year}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
}

export default YearSelector;
