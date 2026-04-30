import React, { useState } from 'react';
import type { LoginCredentials } from '../types';
import Input from '@shared/components/Input';
import { Button } from '@shared/components/Button/Button';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSubmit({ email, password });
    }
  };

  const handleAutofillDemo = () => {
    setEmail('doctor@clinic.com');
    setPassword('password123');
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-[var(--color-error)] px-3 py-2 text-sm pt-sans-bold animate-shake flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] pt-sans-bold text-[var(--color-text-muted)] uppercase tracking-widest" htmlFor="email">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/[0.08] transition-colors placeholder:text-white/20 pt-sans-regular"
            placeholder="name@company.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] pt-sans-bold text-white/20 uppercase tracking-widest" htmlFor="password">
              Password
            </label>
          </div>
          <div className="relative group">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg pl-3 pr-10 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white/[0.08] transition-colors placeholder:text-white/20 pt-sans-regular"
              placeholder="••••••••"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-[var(--color-secondary)] hover:text-white transition-colors cursor-pointer p-0 h-auto"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--color-primary)] text-[var(--color-surface)] pt-sans-bold py-2.5 mt-6 rounded-[10px] border border-white/15 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </>
          ) : (
            'Sign in to workspace'
          )}
        </Button>
      </form>

      <div className="pt-6 mt-8 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-[10px] pt-sans-bold text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-surface)]/10 backdrop-blur-sm rounded-md">
            Try Demo
          </span>
        </div>
      </div>

      <div className="mt-6 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] pt-sans-bold text-[var(--color-primary)]/80 uppercase tracking-wider">Demo Credentials</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAutofillDemo}
            className="text-[11px] text-[var(--color-primary)] pt-sans-bold hover:underline"
          >
            Autofill
          </Button>
        </div>
        <div className="text-xs space-y-2 font-mono text-[var(--color-text)]/90">
          <div className="flex justify-between items-center">
            <span className="font-sans text-[var(--color-text-muted)]">Email</span>
            <span>doctor@clinic.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-sans text-[var(--color-text-muted)]">Password</span>
            <span>password123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
