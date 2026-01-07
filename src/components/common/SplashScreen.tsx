import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'slide' | 'text' | 'merge' | 'done'>('logo')

  useEffect(() => {
    const timers: (number | NodeJS.Timeout)[] = [];

    timers.push(setTimeout(() => setPhase('slide'), 1200));

    timers.push(setTimeout(() => setPhase('text'), 2400));

    timers.push(setTimeout(() => setPhase('merge'), 3600));

    timers.push(setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4800));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-1000 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >

      {/* Logo and Text Container */}
      <div
        className={`relative flex items-center gap-2 transition-all duration-1000 ease-out ${
          phase === 'merge'
            ? '-translate-y-[43vh] -translate-x-[38vw]'
            : 'scale-100 translate-y-0 translate-x-0'
        }`}
      >
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ease-out ${
            phase === 'logo'
              ? 'scale-100 rotate-180 opacity-0'
              : 'scale-100 rotate-0 opacity-100'
          } ${phase === 'merge' ? 'h-8 w-auto sm:h-10 md:h-12 lg:h-[3em]' : 'h-8 w-auto sm:h-10 md:h-12 lg:h-[3.5em]'}`}
        >
          <img src="/logo.png" alt="AADRILA Logo" className="h-full w-full object-contain" />
        </div>

        {/* AADRIIA Text */}
        <div
          className={`overflow-hidden transition-all duration-1000 ease-out ${
            phase === 'text' || phase === 'merge'
              ? 'max-w-[200px] opacity-100'
              : 'max-w-0 opacity-0'
          }`}
        >
          <span className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium tracking-[0.15em] font-raleway text-black">AADRILA</span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-semibold tracking-[0.46em] font-raleway text-black">TECHNOLOGIES</span>
          </span>
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;
