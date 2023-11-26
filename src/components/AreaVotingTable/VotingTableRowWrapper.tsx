'use client';
import { type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';
import TEST from 'public/json/2020/連江縣.json';

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

  const data = Array.isArray(JSON.parse(JSON.stringify(TEST)))
    ? JSON.parse(JSON.stringify(TEST))?.slice(5)
    : [];

  const handleNextLevelClick = () => {
    const test = (city, data) => {
      const title = `第15任總統副總統選舉候選人在${city}各村(里)得票數一覽表`;
      let name = '';

      return data.reduce(
        (_acc, _cur) => {
          const isDist = _cur.Column2 ? false : true;
          if (isDist) {
            name = _cur[title].trim();
            _acc.dist.push({
              name: name,
              level: 'dist',
              affiliation: city,
              candidates: {
                cand_2020_01: _cur.Column3,
                cand_2020_02: _cur.Column4,
                cand_2020_03: _cur.Column5,
              },
              votes: {
                valid_votes: _cur.Column6,
                invalid_votes: _cur.Column7,
                total_votes: _cur.Column8,
              },
              voter_turnout: _cur.Column13,
            });
          } else {
            _acc.village.push({
              name: _cur.Column2,
              level: 'village',
              affiliation: name,
              candidates: {
                cand_2020_01: _cur.Column3,
                cand_2020_02: _cur.Column4,
                cand_2020_03: _cur.Column5,
              },
              votes: {
                valid_votes: _cur.Column6,
                invalid_votes: _cur.Column7,
                total_votes: _cur.Column8,
              },
              voter_turnout: _cur.Column13,
            });
          }
          return _acc;
        },
        { city: [], dist: [], village: [] },
      );
    };

    console.log(test('連江縣', data));

    // const levelArr = Object.values(levels);
    // const levelIdx = levelArr.indexOf(placeLevel);
    // if (levelIdx === levelArr.length - 1) return;

    // const queryString = querystring.stringify(
    //   {
    //     ...querystring.parse(searchParams.toString()),
    //     [placeLevel]: placeName,
    //   },
    //   { skipEmptyString: true },
    // );
    // router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
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
