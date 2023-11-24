'use client';
import { type ReactNode } from 'react';

interface VotingTableRowWrapperProps {
  children: ReactNode;
  placeName: string;
}

function VotingTableRowWrapper({
  children,
  placeName,
}: VotingTableRowWrapperProps) {
  const handleNextLevelClick = () => {
    console.log(placeName);
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
