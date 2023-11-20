import { type ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

function Button(props: ButtonProps) {
  const {
    children,
    size = 'medium',
    color = 'primary',
    className = '',
    ...others
  } = props;

  const sizeClasses = {
    small: 'px-3 py-1',
    medium: 'px-4 py-2',
    large: 'px-6 py-4',
  }[size];

  const colorClasses = {
    primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary',
    secondary:
      'bg-background text-text-primary hover:bg-hover active:bg-background',
  }[color];

  const classes = `flex-center body-small rounded-[6px] c-transition ${sizeClasses} ${colorClasses} ${className}`;

  return (
    <button className={classes} {...others}>
      {children}
    </button>
  );
}

export default Button;
