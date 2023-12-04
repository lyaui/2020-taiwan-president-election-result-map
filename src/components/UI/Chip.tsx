import { type ReactNode } from 'react';

import { cn } from '@/utils';

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function Chip({ children, onClick, className }: ChipProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'heading-6 c-transition cursor-pointer rounded-[500px] bg-background p-3 text-center hover:bg-primary hover:text-white',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Chip;
