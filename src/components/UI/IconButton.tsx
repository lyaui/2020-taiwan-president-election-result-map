import { type ComponentPropsWithoutRef } from 'react';
import * as HeroIcon from '@heroicons/react/24/solid';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  iconName: keyof typeof HeroIcon;
  variant?: 'solid' | 'outlined';
  size?: 'medium' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

function IconButton(props: ButtonProps) {
  const {
    iconName,
    variant = 'solid',
    size = 'medium',
    color = 'primary',
    className = '',
    ...others
  } = props;

  const sizeClasses = {
    medium: 'w-[36px] h-[36px] p-2',
    large: 'w-[44px] h-[44px] p-3',
  }[size];

  const colorClasses = {
    primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary',
    secondary:
      'bg-background text-text-primary hover:bg-hover active:bg-background',
  }[color];

  const classes = `flex-center body-small rounded-full c-transition ${sizeClasses} ${colorClasses} ${className}`;

  const Icon = HeroIcon[iconName];

  return (
    <button className={classes} {...others}>
      <Icon className='w-[18px] h-[18px]' />
    </button>
  );
}

export default IconButton;
