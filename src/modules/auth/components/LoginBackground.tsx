import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

interface LoginBackgroundProps {
  onLoad?: () => void;
}

const LoginBackground: React.FC<LoginBackgroundProps> = ({ onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#0a0a0f] transition-colors duration-1000">
      <style>{`
        a[href*="spline.design"] { display: none !important; }
      `}</style>
      <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        <Spline
          scene="https://prod.spline.design/CPFheZlqeAQf8NFX/scene.splinecode"
          className="w-full h-full"
          onLoad={() => {
            setIsLoaded(true);
            if (onLoad) onLoad();
          }}
        />
      </div>

      {/* Subtle Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />

      {/* Abstract static light spots for extra flair (removed animation) */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

export default LoginBackground;
