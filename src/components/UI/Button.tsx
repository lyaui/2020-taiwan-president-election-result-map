import { type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'flex-center body-small rounded-[6px] c-transition',
  {
    variants: {
      color: {
        primary: [
          'bg-primary',
          '!text-white',
          'hover:bg-primary-light',
          'active:bg-primary',
        ],
        secondary: [
          'bg-background',
          'text-text-primary',
          'hover:bg-hover',
          'active:bg-background',
        ],
      },
      size: {
        small: ['px-3', 'py-1'],
        medium: ['px-4', 'py-2'],
        large: ['px-6', 'py-4'],
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  children: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

function Button({
  children,
  size = 'medium',
  color = 'primary',
  className = '',
  ...others
}: ButtonProps) {
  return (
    <button className={buttonVariants({ color, size, className })} {...others}>
      {children}
    </button>
  );
}

export default Button;
