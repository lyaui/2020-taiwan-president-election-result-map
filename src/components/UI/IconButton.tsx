import { type ComponentPropsWithoutRef } from 'react';
import * as HeroIcon from '@heroicons/react/24/solid';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('flex-center body-small rounded-full c-transition', {
  variants: {
    variant: {
      solid: ['bg-current', 'hover:bg-current-light active:bg-current'],
      outlined: [
        'bg-white',
        'border border-current',
        'hover:border-current-light',
      ],
    },
    color: {
      primary: [
        'bg-primary',
        '[&>svg]:text-white',
        'hover:bg-primary-light',
        'active:bg-primary',
      ],
      secondary: [
        'bg-background',
        '[&>svg]:text-text-primary',
        'hover:bg-hover',
        'active:bg-background',
      ],
    },
    size: {
      medium: ['w-[36px]', 'h-[36px]', 'p-2'],
      large: ['w-[44px]', 'h-[44px]', 'p-3'],
    },
  },

  compoundVariants: [
    // 綁定在一起
    {
      variant: 'outlined',
      color: 'primary',
      className: [
        'border-primary',
        '[&>svg]:!text-primary',
        'hover:bg-gray-100',
        'active:bg-white',
      ],
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});

interface IconButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  iconName: keyof typeof HeroIcon;
  variant?: 'solid' | 'outlined';
  size?: 'medium' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

function IconButton({
  iconName,
  variant = 'solid',
  size = 'medium',
  color = 'primary',
  className = '',
  ...others
}: IconButtonProps) {
  const Icon = HeroIcon[iconName];

  return (
    <button
      className={buttonVariants({ variant, color, size, className })}
      {...others}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}

export default IconButton;
