import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'slide' | 'text' | 'merge' | 'done'>('logo')

  useEffect(() => {
    const timers: (number | NodeJS.Timeout)[] = [];

    // Phase 1: Logo appears (0 - 1200ms)
    timers.push(setTimeout(() => setPhase('slide'), 1200));

    // Phase 2: Slide animation (1200 - 2400ms)
    timers.push(setTimeout(() => setPhase('text'), 2400));

    // Phase 3: AADRIIA text appears (2400 - 3600ms)
    timers.push(setTimeout(() => setPhase('merge'), 3600));

    // Phase 4: Merge to navbar and reveal page (3600 - 4800ms)
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
        className={`relative flex items-center gap-3 transition-all duration-1000 ease-out ${
          phase === 'merge'
            ? 'scale-75 -translate-y-[45vh] -translate-x-[35vw]'
            : 'scale-100 translate-y-0 translate-x-0'
        }`}
      >
        {/* Logo */}
        <div
          className={`transition-all duration-1000 ease-out ${
            phase === 'logo'
              ? 'scale-0 rotate-180 opacity-0'
              : 'scale-100 rotate-0 opacity-100'
          } ${phase === 'merge' ? 'w-8 h-8' : 'w-16 h-16 md:w-20 md:h-20'}`}
        >
          <img src="/logo.png" alt="AADRILA Logo" className="w-full h-full object-contain" />
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
            <span className="text-[28px] font-medium tracking-[0.15em] font-raleway text-black ">AADRILA</span>
            <span className="text-[11px] font-semibold tracking-[0.46em] font-raleway text-black">TECHNOLOGIES</span>
          </span>
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;
