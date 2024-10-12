import React, { ReactNode, ElementType } from 'react';
import classNames from 'classnames';

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'paragraph'
    | 'small'
    | 'span';
  color?: 'blue-gray' | 'gray' | 'blue' | 'red' | 'green';
  className?: string;
  children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'paragraph',
  color = 'gray',
  className = '',
  children,
}) => {
  const baseStyles = 'text-gray-800';

  const variantClasses: Record<string, string> = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    paragraph: 'text-base',
    small: 'text-sm',
    span: 'text-sm',
  };

  const colorClasses: Record<string, string> = {
    'blue-gray': 'text-blue-gray-500',
    gray: 'text-gray-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500',
  };

  const Component: ElementType =
    variant === 'paragraph' ? 'p' : variant === 'span' ? 'span' : variant;

  return (
    <Component
      className={classNames(
        baseStyles,
        variantClasses[variant],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
