import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'gray' | 'black' | 'red' | 'green';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'text';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'blue',
  size = 'md',
  variant = 'filled',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg shadow-md focus:outline-none';

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-500',
    gray: 'text-gray-500',
    black: 'text-black',
    red: 'text-red-500',
    green: 'text-green-500',
  };

  const filledClasses: Record<string, string> = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    black: 'bg-gray-900 text-white hover:bg-gray-800',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  };

  const outlinedClasses: Record<string, string> = {
    blue: 'border border-blue-500 text-blue-500 hover:bg-blue-100',
    gray: 'border border-gray-500 text-gray-500 hover:bg-gray-100',
    black: 'border border-black text-black hover:bg-gray-900',
    red: 'border border-red-500 text-red-500 hover:bg-red-100',
    green: 'border border-green-500 text-green-500 hover:bg-green-100',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const variantClass =
    variant === 'outlined'
      ? outlinedClasses[color]
      : variant === 'text'
      ? colorClasses[color]
      : filledClasses[color];

  return (
    <button
      type={type}
      className={classNames(
        baseStyles,
        variantClass,
        sizeClasses[size],
        widthClass,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
