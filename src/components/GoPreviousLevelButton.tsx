'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'query-string';

import { levels } from '@/constants';
import { ROUTER } from '@/routers';
import IconButton from '@/components/UI/IconButton';

interface GoPreviousLevelButton {
  city?: string;
  dist?: string;
}

function GoPreviousLevelButton({ city, dist }: GoPreviousLevelButton) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGoPrevLevelClick = () => {
    let queries = dist
      ? {
          ...querystring.parse(searchParams.toString()),
          [levels.dist]: '',
        }
      : {
          ...querystring.parse(searchParams.toString()),
          [levels.city]: '',
          [levels.dist]: '',
        };

    const queryString = querystring.stringify(queries, {
      skipEmptyString: true,
    });
    router.push(`${ROUTER.ELECTION_DATA}?${queryString}`);
  };

  if (!city) return null;
  return (
    <IconButton
      onClick={handleGoPrevLevelClick}
      iconName="ArrowLeftIcon"
      color="secondary"
    />
  );
}

export default GoPreviousLevelButton;
