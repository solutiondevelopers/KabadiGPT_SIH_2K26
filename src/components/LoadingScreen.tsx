import React, { useEffect, useState } from 'react';
import { Recycle, Sparkles, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinish,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(12);
  const [statusText, setStatusText] = useState('सर्व्हर व डेटाबेस जोडत आहे...');

  useEffect(() => {
    const statusMessages = [
      'सर्व्हर व डेटाबेस जोडत आहे...',
      'रिसायकलिंग दर व स्पॉट रेट्स लोड होत आहेत...',
      'डिजिटल ट्रेसिबिलिटी लेजर तयार करत आहे...',
      'KabadiwalaGPT सुरू होत आहे...',
    ];

    let currentStep = 0;
    const intervalTime = minDurationMs / 4;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < statusMessages.length) {
        setStatusText(statusMessages[currentStep]);
        setProgress(Math.min(95, (currentStep + 1) * 24));
      }
    }, intervalTime);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 250);
    }, minDurationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDurationMs, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-purple-mesh select-none px-4">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Center Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Brand Logo */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30 border border-purple-300/40 animate-pulse">
            <Recycle className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white shadow-md">
            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* App Title */}
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 bg-clip-text text-transparent tracking-tight">
            KabadiwalaGPT
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-purple-700">
            Smart Circular Waste & Traceability System
          </p>
          <p className="text-[11px] text-slate-500">
            स्वच्छ भारत • डिजिटल स्क्रॅप • हमीभाव
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs bg-purple-100/90 rounded-full h-2 overflow-hidden p-0.5 border border-purple-200/70 shadow-inner mb-3">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Loading Status */}
        <p className="text-xs font-medium text-purple-800/80 min-h-[20px] transition-all">
          {statusText}
        </p>

        {/* Footer Badge */}
        <div className="mt-12 flex items-center gap-1.5 text-[11px] font-bold text-purple-900/60 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-200/80 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>MPCB & CPCB Compliant Circular Platform</span>
        </div>
      </div>
    </div>
  );
};
