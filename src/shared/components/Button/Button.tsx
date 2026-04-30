import React, { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes use our design tokens mapped via Tailwind arbitrary values
  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium
    transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Variant classes define specific token usages
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-surface)] hover:opacity-90',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[.08]',
    danger: 'bg-[var(--color-error)] text-[var(--color-surface)] hover:opacity-90',
    ghost: 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-border)]',
  };

  // Size classes map to spacing and typography tokens
  const sizeClasses = {
    sm: 'px-[var(--space-2)] py-[var(--space-1)] text-[var(--text-sm)]',
    md: 'px-[var(--space-4)] py-[var(--space-2)] text-[var(--text-base)]',
    lg: 'px-[var(--space-6)] py-[var(--space-3)] text-[var(--text-lg)]',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
