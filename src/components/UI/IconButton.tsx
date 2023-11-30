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

  // TODO variantClasses
  const colorClasses = {
    primary: {
      button: `${variant === 'outlined' ? 'bg-white' : 'bg-primary'} ${
        variant === 'outlined' && 'border border-primary'
      } ${
        variant === 'outlined'
          ? 'hover:border-primary-light'
          : 'hover:bg-primary-light active:bg-primary'
      }`,
      icon: `${variant === 'outlined' ? 'text-primary' : 'text-white'}`,
    },
    secondary: {
      button:
        'bg-background text-text-primary hover:bg-hover active:bg-background',
      icon: 'text-text-primary',
    },
  }[color];

  const classes = `flex-center body-small rounded-full c-transition ${sizeClasses} ${colorClasses.button} ${className}`;

  const Icon = HeroIcon[iconName];

  return (
    <button className={classes} {...others}>
      <Icon className={`h-[18px] w-[18px] ${colorClasses.icon}`} />
    </button>
  );
}

export default IconButton;
