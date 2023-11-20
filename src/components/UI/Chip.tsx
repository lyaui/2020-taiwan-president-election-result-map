interface ChipProps {
  children: string;
  onClick: () => void;
  className?: string;
}

function Chip({ children, onClick, className }: ChipProps) {
  return (
    <div
      onClick={onClick}
      className={`heading-6 p-3 rounded-[500px] bg-background hover:bg-primary hover:text-white cursor-pointer c-transition ${className}`}
    >
      {children}
    </div>
  );
}

export default Chip;
