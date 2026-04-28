import React, { type ChangeEvent } from 'react';

interface InputProps {
  id: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * Reusable styled form input primitive.
 * Applies the design system's .input-field styles.
 */
const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = '',
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`input-field ${className} disabled:opacity-50 disabled:cursor-not-allowed`.trim()}
    />
  );
};

export default Input;
