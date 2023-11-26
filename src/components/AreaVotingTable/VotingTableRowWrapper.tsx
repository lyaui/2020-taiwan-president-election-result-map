'use client';
import { type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';

import { type Level } from '@/types';
import { levels } from '@/constants';
import { ROUTER } from '@/routers';

interface VotingTableRowWrapperProps {
  children: ReactNode;
  placeName: string;
  placeLevel: Level;
}

function VotingTableRowWrapper({
  children,
  placeName,
  placeLevel,
}: VotingTableRowWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNextLevelClick = () => {
    const levelArr = Object.values(levels);
    const levelIdx = levelArr.indexOf(placeLevel);
    if (levelIdx === levelArr.length - 1) return;

    const queryString = querystring.stringify(
      {
        ...querystring.parse(searchParams.toString()),
        [placeLevel]: placeName,
      },
      { skipEmptyString: true },
    );
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };
  return (
    <tr
      onClick={handleNextLevelClick}
      className='cursor-pointer text-text-primary hover:bg-hover border-b-[1px] border-line'
    >
      {children}
    </tr>
  );
}

export default VotingTableRowWrapper;
