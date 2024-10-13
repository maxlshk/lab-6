import React, { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  labelClassName = '',
  containerClassName = '',
  id,
  pattern,
  required,
  min,
  max,
  minLength,
  type = 'text',
  ...rest
}) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputBaseStyles =
    'block w-full p-2.5 pr-10 text-sm rounded-lg focus:outline-none';

  const normalStyles =
    'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-gray-700 focus:border-gray-900';

  const errorStyles =
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500';

  const labelNormalStyles = 'block mb-2 text-sm font-medium text-gray-900';
  const labelErrorStyles = 'block mb-2 text-sm font-medium text-red-700';

  const inputClassNames = classNames(
    inputBaseStyles,
    error || localError ? errorStyles : normalStyles,
    className
  );

  const labelClassNames = classNames(
    error || localError ? labelErrorStyles : labelNormalStyles,
    labelClassName
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let errorMessage: string | undefined;

    if (required && !value) {
      errorMessage = 'This field is required';
    } else if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorMessage = 'Please match the requested format';
      }
    } else if (
      min !== undefined &&
      parseFloat(value) < parseFloat(min as string)
    ) {
      errorMessage = `Value must be at least ${min}`;
    } else if (
      max !== undefined &&
      parseFloat(value) > parseFloat(max as string)
    ) {
      errorMessage = `Value must be at most ${max}`;
    } else if (minLength !== undefined && value.length < minLength) {
      errorMessage = `Value must be at least ${minLength} characters`;
    } else {
      errorMessage = undefined;
    }

    setLocalError(errorMessage);

    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setLocalError(undefined);

    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={labelClassNames}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={inputClassNames}
          required={required}
          pattern={pattern}
          min={min}
          max={max}
          type={inputType}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...rest}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {(error || localError) && (
        <p className="mt-2 text-sm text-red-600">{error || localError}</p>
      )}
    </div>
  );
};

export default Input;
