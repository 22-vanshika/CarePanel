import React, { type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  elevation = 'sm',
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-secondary)]/20';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-[var(--space-4)]',
    md: 'p-[var(--space-6)]',
    lg: 'p-[var(--space-8)]',
  };

  const elevationClasses = {
    none: 'shadow-none',
    sm: 'shadow-[var(--shadow-sm)]',
    md: 'shadow-[var(--shadow-md)]',
    lg: 'shadow-[var(--shadow-lg)]',
  };

  const classes = `${baseClasses} ${paddingClasses[padding]} ${elevationClasses[elevation]} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
