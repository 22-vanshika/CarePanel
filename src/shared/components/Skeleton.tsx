import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Reusable loading skeleton primitive for asynchronous states.
 * Provides a pulsed background effect following the design system.
 */
const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-[var(--color-secondary)]/20 rounded ${className}`.trim()} 
      aria-hidden="true"
    />
  );
};

export default Skeleton;
