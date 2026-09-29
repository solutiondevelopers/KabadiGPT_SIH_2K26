import React from 'react';
import {
  Recycle,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Home,
  Globe,
} from 'lucide-react';
import { Language, UserRole, KycStatus } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  currentLang: Language;
  soundEnabled: boolean;
  kycStatus?: KycStatus;
  userPhone?: string;
  onRoleChange: (role: UserRole) => void;
  onLangChange: (lang: Language) => void;
  onToggleSound: () => void;
  onResetChat: () => void;
  onGoToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentLang,
  soundEnabled,
  kycStatus,
  userPhone,
  onRoleChange,
  onLangChange,
  onToggleSound,
  onResetChat,
  onGoToLanding,
}) => {
  const roles: { id: UserRole; labelEn: string; labelMr: string; labelHi: string }[] = [
    { id: 'household', labelEn: 'Household / Citizen', labelMr: 'घरगुती नागरिक', labelHi: 'नागरिक / घरेलू' },
    { id: 'kabadiwala', labelEn: 'Field Collector', labelMr: 'कबाडीवाला', labelHi: 'कबाड़ीवाला' },
    { id: 'mover', labelEn: 'Mover Logistics', labelMr: 'वाहतूकदार (Mover)', labelHi: 'मूवर फ्लीट' },
    { id: 'warehouse', labelEn: 'MRF Warehouse', labelMr: 'गोदाम (MRF)', labelHi: 'वेयरहाउस MRF' },
    { id: 'recycler', labelEn: 'Recycler Plant', labelMr: 'रिसायकलिंग प्लांट', labelHi: 'रीसाइक्लिंग प्लांट' },
    { id: 'regulator', labelEn: 'State Regulator', labelMr: 'शासकीय नियामक', labelHi: 'शासकीय नियामक' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        {/* Zone 1: Wordmark & Home button */}
        <div className="flex items-center gap-2">
          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              title="Landing Screen"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
              <Recycle className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 hidden sm:inline">
              Kabadiwala<span className="text-violet-600">GPT</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Role Switcher & KYC Badge & Language Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Persona selector dropdown */}
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="text-xs font-bold py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="Select Target User Role"
            >
              {roles.map((r) => {
                const label =
                  currentLang === 'mr'
                    ? r.labelMr
                    : currentLang === 'hi'
                    ? r.labelHi
                    : r.labelEn;
                return (
                  <option key={r.id} value={r.id}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5 text-xs font-bold">
            <button
              onClick={() => onLangChange('mr')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                currentLang === 'mr' ? 'bg-violet-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLangChange('hi')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                currentLang === 'hi' ? 'bg-violet-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                currentLang === 'en' ? 'bg-violet-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-violet-50 border-violet-200 text-violet-700'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
