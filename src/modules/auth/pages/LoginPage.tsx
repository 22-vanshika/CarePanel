import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import LoginBackground from '../components/LoginBackground';

const LoginPage: React.FC = () => {
  const { user, isLoading, error, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div data-theme="dark" className="h-screen flex flex-col py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent pt-sans-regular text-[var(--color-text)]">
      <LoginBackground />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
        <h2 className="mt-2 text-center text-5xl kaushan-script-regular tracking-wide">
          Care<span className="italic text-[var(--color-primary)]">Panel</span>
        </h2>
        <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] pt-sans-bold">
          Clinical team platform
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
        <div className="w-full py-6 px-4 sm:px-10 flex flex-col bg-white/[0.06] backdrop-blur-[20px] rounded-[16px] border border-white/[0.12]">
          <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
