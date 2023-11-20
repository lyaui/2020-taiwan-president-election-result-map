import { type ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

function Chip({ children, onClick, className }: ChipProps) {
  return (
    <div
      onClick={onClick}
      className={`heading-6 text-center p-3 rounded-[500px] bg-background hover:bg-primary hover:text-white cursor-pointer c-transition ${className}`}
    >
      {children}
    </div>
  );
}

export default Chip;
