import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import LoginBackground from '../components/LoginBackground';

const LoginPage: React.FC = () => {
  const { user, isLoading: isAuthLoading, error, login } = useAuth();
  const navigate = useNavigate();

  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [showLoaderDOM, setShowLoaderDOM] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing workspace...");

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const texts = [
      "Initializing workspace...",
      "Loading clinical data...",
      "Preparing your dashboard..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Fallback timeout in case Spline never fires onLoad
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplineLoaded(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSplineLoaded) {
      const timer = setTimeout(() => {
        setShowLoaderDOM(false);
      }, 800); // Wait for transition to end
      return () => clearTimeout(timer);
    }
  }, [isSplineLoaded]);

  return (
    <div data-theme="dark" className="h-screen flex flex-col py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent pt-sans-regular text-[var(--color-text)]">
      <LoginBackground onLoad={() => setIsSplineLoaded(true)} />

      {/* LOADING OVERLAY */}
      {showLoaderDOM && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen z-[9999] bg-[#0b0b0d] flex flex-col justify-center items-center transition-opacity duration-[800ms] ease-out ${isSplineLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          role="status"
        >
          <div className="flex flex-col items-center bg-[#0b0b0d]">
            <h2 className="brand-title text-center">
              <span className="font-light text-white">Care</span><span className="font-semibold text-[var(--color-primary)]">Panel</span>
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-sans font-semibold opacity-70">
              Clinical Team Platform
            </p>

            <div className="mt-12 mb-8 relative flex justify-center items-center w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-[rgba(74,158,255,0.5)] animate-pulse-ring" />
            </div>

            <p className="text-[12px] text-[rgba(255,255,255,0.3)] tracking-[1px] font-mono" aria-live="polite">
              {loadingText}
            </p>
          </div>
        </div>
      )}

      {/* MAIN LOGIN CARD */}
      <div
        className={`transition-opacity duration-[600ms] ease-in ${isSplineLoaded ? 'opacity-100' : 'opacity-0'} relative z-10 w-full flex flex-col items-center`}
        aria-hidden={!isSplineLoaded}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <h2 className="brand-title text-center">
            <span className="font-light text-white">Care</span><span className="font-semibold text-[var(--color-primary)]">Panel</span>
          </h2>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-sans font-semibold opacity-70">
            Clinical team platform
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md w-full flex flex-col items-center">
          <div className="w-full py-6 px-4 sm:px-10 flex flex-col bg-white/[0.06] backdrop-blur-[20px] rounded-[16px] border border-white/[0.12]">
            <LoginForm onSubmit={login} isLoading={isAuthLoading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
