import React, { useState } from 'react';
import {
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Recycle,
  MapPin,
  FileText,
  Upload,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Language, UserRole, SupportedRole, KycStatus, UserProfile } from '../types';

interface OnboardingFlowProps {
  lang: Language;
  onComplete: (profile: UserProfile) => void;
  onSelectLanguage: (lang: Language) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  lang,
  onComplete,
  onSelectLanguage,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedRole, setSelectedRole] = useState<UserRole>('household');
  const [phone, setPhone] = useState('9822014829');
  const [otpCode, setOtpCode] = useState('123456');
  const [resendTimer, setResendTimer] = useState(30);
  const [fullName, setFullName] = useState('Anand Deshmukh');
  const [address, setAddress] = useState('B-402, Rohan Nilay, DP Road, Aundh, Pune - 411007');
  const [kycDocType, setKycDocType] = useState<'aadhaar' | 'pan' | 'gst'>('aadhaar');
  const [kycNumber, setKycNumber] = useState('4821 9920 4410');
  const [isUploading, setIsUploading] = useState(false);
  const [docUploaded, setDocUploaded] = useState(true);

  const content = {
    mr: {
      step1Title: 'तुमची भूमिका (Role) निवडा',
      step1Sub: 'KabadiwalaGPT मध्ये तुमच्या प्रवेशाची भूमिका निवडा',
      step2Title: 'मोबाईल नंबर व ओटीपी पडताळणी',
      step2Sub: '+91 भारतीय नंबरवर आलेला ६-अंकी OTP टाका',
      otpLabel: 'मोबाईलवर आलेला ६-अंकी OTP टाका:',
      step3Title: 'केवायसी (KYC) व प्रोफाइल सेटअप',
      step3Sub: 'जलद ओळखीसाठी पूर्ण नाव, पत्ता व ओळखपत्र अपलोड करा',
      next: 'पुढे जा',
      back: 'मागे जा',
      getOtp: 'ओटीपी पाठवा',
      verifyOtp: 'ओटीपी सत्यापित करा',
      completeOnboarding: 'डॅशबोर्ड सुरू करा',
      resendIn: 'सेकंदात पुन्हा पाठवा',
      resendOtp: 'पुन्हा पाठवा',
      nameLabel: 'पूर्ण नाव / संस्था नाव:',
      addressLabel: 'पत्ता व GPS पिन:',
      docTypeLabel: 'ओळखपत्र प्रकार:',
      docNumberLabel: 'ओळखपत्र क्रमांक (Aadhaar / PAN):',
      uploadDoc: 'केवायसी कागदपत्र अपलोड (Aadhaar/ID):',
      uploadedSuccess: 'कागदपत्र यशस्वीरित्या सत्यापित झाले ✓',
    },
    hi: {
      step1Title: 'अपनी भूमिका (Role) चुनें',
      step1Sub: 'KabadiwalaGPT में अपनी लॉगिन भूमिका का चयन करें',
      step2Title: 'मोबाइल नंबर व ओटीपी सत्यापन',
      step2Sub: '+91 भारतीय नंबर पर प्राप्त 6-अंकी OTP दर्ज करें',
      otpLabel: 'मोबाइल पर प्राप्त 6-अंकी OTP दर्ज करें:',
      step3Title: 'केवायसी (KYC) व प्रोफाइल सेटअप',
      step3Sub: 'त्वरित सत्यापन के लिए पूरा नाम, पता व आईडी प्रूफ दर्ज करें',
      next: 'आगे बढ़ें',
      back: 'पीछे जाएं',
      getOtp: 'ओटीपी भेजें',
      verifyOtp: 'ओटीपी सत्यापित करें',
      completeOnboarding: 'डैशबोर्ड शुरू करें',
      resendIn: 'सेकंड में पुनः भेजें',
      resendOtp: 'पुनः भेजें',
      nameLabel: 'पूरा नाम / संस्था का नाम:',
      addressLabel: 'पता व GPS पिन:',
      docTypeLabel: 'आईडी प्रमाण प्रकार:',
      docNumberLabel: 'दस्तावेज़ संख्या (Aadhaar / PAN):',
      uploadDoc: 'केवायसी दस्तावेज़ अपलोड (Aadhaar/ID):',
      uploadedSuccess: 'दस्तावेज़ सफलतापूर्वक सत्यापित ✓',
    },
    en: {
      step1Title: 'Select Your Circular Role',
      step1Sub: 'Choose your operational perspective in the KabadiwalaGPT platform',
      step2Title: 'Mobile OTP Verification',
      step2Sub: 'Enter the 6-digit verification code sent to your +91 mobile',
      otpLabel: 'Enter 6-digit OTP code:',
      step3Title: 'Quick KYC & Profile Setup',
      step3Sub: 'Full name, address pinning, and ID document verification for trusted ledger txns',
      next: 'Continue',
      back: 'Back',
      getOtp: 'Get Verification OTP',
      verifyOtp: 'Verify OTP & Continue',
      completeOnboarding: 'Launch My Dashboard',
      resendIn: 'Resend OTP in',
      resendOtp: 'Resend OTP',
      nameLabel: 'Full Name / Organization Name:',
      addressLabel: 'Address & GPS Pin:',
      docTypeLabel: 'ID Document Type:',
      docNumberLabel: 'Document Number (Aadhaar / PAN):',
      uploadDoc: 'KYC Document Verification (Aadhaar/ID):',
      uploadedSuccess: 'Document Verified Successfully ✓',
    },
  }[lang];

  const rolesConfig: Array<{
    id: UserRole;
    supportedRole: SupportedRole;
    name: string;
    nameMr: string;
    nameHi: string;
    icon: string;
    badge: string;
    desc: string;
    taglineMr: string;
    taglineHi: string;
    color: string;
    borderColor: string;
  }> = [
    {
      id: 'household',
      supportedRole: 'HOUSEHOLD',
      name: 'Customer / Household',
      nameMr: 'घरगुती नागरिक (Citizen)',
      nameHi: 'घरेलू नागरिक (Citizen)',
      icon: '🏠',
      badge: 'Citizen',
      desc: 'Sell scrap, book doorstep pickups & earn E-Points',
      taglineMr: 'घरातील जुने कागद, प्लास्टिक, धातू व ई-कचरा थेट हमीभावात विका',
      taglineHi: 'घर बैठे पुराना अखबार, प्लास्टिक, धातु व ई-कचरा उचित मूल्य पर बेचें',
      color: 'from-emerald-500/15 to-emerald-500/5',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'kabadiwala',
      supportedRole: 'KABADIWALA',
      name: 'Collector (Kabadiwala)',
      nameMr: 'अधिकृत कबाडीवाला (Collector)',
      nameHi: 'अधिकृत कबाड़ीवाला (Collector)',
      icon: '🛵',
      badge: 'Field Agent',
      desc: 'Pickup requests, IoT weighing & batch creation',
      taglineMr: 'स्मार्ट ब्लूटूथ वजन काटा, घरोघरी पिकअप्स व रोजची एकूण कमाई',
      taglineHi: 'स्मार्ट ब्लूटूथ कांटा, डोरस्टेप पिकअप्स व दैनिक सीधी कमाई',
      color: 'from-purple-500/15 to-purple-500/5',
      borderColor: 'border-purple-200',
    },
    {
      id: 'mover',
      supportedRole: 'MOVER',
      name: 'Mover / Logistics Fleet',
      nameMr: 'वाहतूकदार फ्लीट (Logistics Mover)',
      nameHi: 'ट्रांसपोर्ट फ्लीट (Logistics Mover)',
      icon: '🚛',
      badge: 'Logistics',
      desc: 'Hub-to-MRF & Recycler transit routes with OTP handover',
      taglineMr: 'मायक्रो-हब ते MRF गोदाम ट्रान्झिट मार्ग, वाहन क्षमता व डिजिटल पोचपावती',
      taglineHi: 'माइक्रो-हब से MRF वेयरहाउस ट्रांजिट रूट, वाहन क्षमता व डिजिटल रिसीट',
      color: 'from-blue-500/15 to-blue-500/5',
      borderColor: 'border-blue-200',
    },
    {
      id: 'warehouse',
      supportedRole: 'WAREHOUSE',
      name: 'Warehouse / MRF Hub',
      nameMr: 'गोदाम / MRF सॉर्टिंग केंद्र (Facility)',
      nameHi: 'वेयरहाउस / MRF सॉर्टिंग हब (Facility)',
      icon: '🏭',
      badge: 'Sorting Hub',
      desc: 'Gate weighbridge scanner, 5-stream sorting & lot dispatch',
      taglineMr: 'वेब्रिज गेट वजन तपासणी, ५-प्रवाह सॉर्टिंग व आउटगोइंग बॅच डिस्पॅच',
      taglineHi: 'वेब्रिज गेट वजन जांच, 5-स्ट्रीम छंटाई व आउटगोइंग लॉट डिस्पैच',
      color: 'from-violet-500/15 to-violet-500/5',
      borderColor: 'border-violet-200',
    },
    {
      id: 'recycler',
      supportedRole: 'RECYCLER',
      name: 'Authorized Recycler',
      nameMr: 'अधिकृत रिसायकलर (Recycling Plant)',
      nameHi: 'अधिकृत रीसाइक्लर (Recycling Plant)',
      icon: '🔄',
      badge: 'Industrial',
      desc: '5-stage processing pipeline & CPCB EPR certificate minting',
      taglineMr: '५-टप्प्यांची औद्योगिक प्रक्रिया पाईपलाईन व EPR क्रेडिट्स निर्मिती',
      taglineHi: '5-चरणीय औद्योगिक प्रोसेसिंग पाइपलाइन व EPR क्रेडिट्स जनरेशन',
      color: 'from-teal-500/15 to-teal-500/5',
      borderColor: 'border-teal-200',
    },
    {
      id: 'ngo',
      supportedRole: 'NGO',
      name: 'NGO / Social Organization',
      nameMr: 'एनजीओ व सामाजिक संस्था (NGO Partner)',
      nameHi: 'NGO व सामाजिक संगठन (NGO Partner)',
      icon: '🤝',
      badge: 'Partner',
      desc: 'Upcycled goods in Eco Store & material allocations for rehabilitation',
      taglineMr: 'अपसायकल वस्तूंचे इको स्टोअर, महिला पुनर्वसन व सामग्री वाटप',
      taglineHi: 'अपसाइक्ल्ड प्रोडक्ट्स का इको स्टोर, महिला पुनर्वास व सामग्री आवंटन',
      color: 'from-purple-500/15 to-purple-500/5',
      borderColor: 'border-purple-200',
    },
    {
      id: 'regulator',
      supportedRole: 'GOVERNMENT',
      name: 'Admin / Government (Regulator)',
      nameMr: 'शासकीय नियामक व प्रशासन (Regulator)',
      nameHi: 'सरकारी नियामक व प्रशासन (Regulator)',
      icon: '🏛️',
      badge: 'Govt Audit',
      desc: 'Statewide circular metrics, forensic custody & fraud watch',
      taglineMr: 'राज्यव्यापी लँडफिल डायव्हर्जन, ईपीआर फॉरेन्सिक ऑडिट व फसवणूक नियंत्रण',
      taglineHi: 'राज्यव्यापी लैंडफिल डायवर्जन, ईपीआर ऑडिट व फ्रॉड रोकथाम डैशबोर्ड',
      color: 'from-rose-500/15 to-rose-500/5',
      borderColor: 'border-rose-200',
    },
  ];

  const handleFinish = () => {
    const matched = rolesConfig.find((r) => r.id === selectedRole) || rolesConfig[0];
    const profile: UserProfile = {
      phone: `+91 ${phone}`,
      name: fullName,
      role: matched.supportedRole,
      kycStatus: 'IDENTITY_VERIFIED',
      location: address,
      onboarded: true,
      language: lang,
    };
    onComplete(profile);
  };

  const selectedRoleMeta = rolesConfig.find((r) => r.id === selectedRole) || rolesConfig[0];

  return (
    <div className="min-h-screen bg-purple-mesh flex flex-col justify-between items-center px-3 sm:px-6 py-4 sm:py-8 selection:bg-purple-200 selection:text-purple-950 font-sans">
      {/* 1. Header Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-3 mb-3 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-purple-500/20">
            <Recycle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight">
              Kabadiwala<span className="text-purple-600">GPT</span>
            </span>
            <span className="text-[10px] text-purple-700 font-semibold hidden xs:block">
              MPCB & CPCB Compliant Circular Network
            </span>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center bg-white/95 p-1 rounded-2xl border border-purple-200/90 text-xs font-bold shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-purple-600 ml-1.5 mr-1 hidden sm:block" />
          <button
            onClick={() => onSelectLanguage('mr')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              lang === 'mr' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => onSelectLanguage('hi')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              lang === 'hi' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => onSelectLanguage('en')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              lang === 'en' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            English
          </button>
        </div>
      </header>

      {/* 2. Main Center Onboarding Card */}
      <main className="w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-purple-200/90 rounded-3xl p-4 sm:p-7 md:p-8 shadow-2xl shadow-purple-500/10 space-y-5 my-auto">
        {/* Step Progress Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-100 pb-4 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900">
                {step === 1 ? content.step1Title : step === 2 ? content.step2Title : content.step3Title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-purple-700/80 mt-1 font-medium">
              {step === 1 ? content.step1Sub : step === 2 ? content.step2Sub : content.step3Sub}
            </p>
          </div>

          {/* Step Pill Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-center">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === 1
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-100/70 text-purple-900'
              }`}
            >
              <span>1</span>
              <span className="hidden md:inline">
                {lang === 'mr' ? 'भूमिका' : lang === 'hi' ? 'भूमिका' : 'Role'}
              </span>
            </div>
            <span className="text-purple-300">→</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === 2
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-100/70 text-purple-900'
              }`}
            >
              <span>2</span>
              <span className="hidden md:inline">
                {lang === 'mr' ? 'ओटीपी' : lang === 'hi' ? 'ओटीपी' : 'OTP'}
              </span>
            </div>
            <span className="text-purple-300">→</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === 3
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-100/70 text-purple-900'
              }`}
            >
              <span>3</span>
              <span className="hidden md:inline">
                {lang === 'mr' ? 'केवायसी' : lang === 'hi' ? 'केवाईसी' : 'KYC'}
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: Role Selection Grid */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* 6 Primary Circular Roles in 3x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              {rolesConfig.slice(0, 6).map((r) => {
                const isSelected = selectedRole === r.id;
                const rName = lang === 'mr' ? r.nameMr : lang === 'hi' ? r.nameHi : r.name;
                const rTagline = lang === 'mr' ? r.taglineMr : lang === 'hi' ? r.taglineHi : r.desc;

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-50 via-white to-purple-50/80 border-purple-600 ring-2 ring-purple-500/25 shadow-md shadow-purple-500/10'
                        : 'bg-white hover:bg-purple-50/30 border-purple-200/80 hover:border-purple-300 shadow-2xs'
                    }`}
                  >
                    {/* Top Row: Icon + Badge + Check */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-105 border ${
                          isSelected
                            ? 'bg-white border-purple-300 shadow-xs'
                            : 'bg-purple-50 border-purple-200/60'
                        }`}
                      >
                        <span>{r.icon}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {r.badge}
                        </span>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-purple-600 border-purple-600 text-white'
                              : 'border-purple-300 bg-white group-hover:border-purple-400'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                        {rName}
                      </h3>
                      <p className="text-xs text-purple-900/80 font-medium leading-relaxed line-clamp-2">
                        {rTagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 7th Role: State Regulator & Audit (Full-Width Highlight Banner) */}
            {rolesConfig.slice(6, 7).map((r) => {
              const isSelected = selectedRole === r.id;
              const rName = lang === 'mr' ? r.nameMr : lang === 'hi' ? r.nameHi : r.name;
              const rTagline = lang === 'mr' ? r.taglineMr : lang === 'hi' ? r.taglineHi : r.desc;

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-50 via-white to-purple-50/80 border-purple-600 ring-2 ring-purple-500/25 shadow-md shadow-purple-500/10'
                      : 'bg-white hover:bg-purple-50/30 border-purple-200/80 hover:border-purple-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-105 border ${
                        isSelected
                          ? 'bg-white border-purple-300 shadow-xs'
                          : 'bg-purple-50 border-purple-200/60'
                      }`}
                    >
                      <span>{r.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {rName}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-xs text-purple-900/80 font-medium leading-relaxed line-clamp-1">
                        {rTagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'border-purple-300 bg-white group-hover:border-purple-400'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Selected Role Summary Bar & Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 sm:pt-4 border-t border-purple-100 gap-3">
              <div className="w-full sm:w-auto flex items-center gap-2 text-xs text-purple-900 font-semibold bg-purple-50/80 px-3.5 py-2.5 rounded-xl border border-purple-200/70 truncate">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="truncate">
                  {lang === 'mr' ? 'निवडलेली भूमिका:' : lang === 'hi' ? 'चयनित भूमिका:' : 'Active Selection:'}{' '}
                  <strong className="text-purple-950 font-bold">
                    {lang === 'mr' ? selectedRoleMeta.nameMr : lang === 'hi' ? selectedRoleMeta.nameHi : selectedRoleMeta.name}
                  </strong>
                </span>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{content.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Mobile OTP Login */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200 max-w-md mx-auto">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === 'mr' ? 'मोबाईल नंबर (+91)' : lang === 'hi' ? 'मोबाइल नंबर (+91)' : 'Mobile Number (+91)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-3 py-2.5 text-xs font-mono font-bold bg-purple-50/50 focus:bg-white border border-purple-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {content.otpLabel}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-mono font-bold tracking-widest text-center bg-purple-50/50 focus:bg-white border border-purple-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-[11px] text-purple-700/80 text-right">
                Dev OTP: <span className="font-mono font-bold">123456</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {content.back}
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{content.verifyOtp}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Quick KYC & Profile Setup */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200 max-w-md mx-auto">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {content.nameLabel}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-purple-50/50 border border-purple-200 rounded-xl text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {content.addressLabel}
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-purple-50/50 border border-purple-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {content.uploadDoc}
              </label>
              <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Aadhaar_Verified_Card.pdf</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">{content.uploadedSuccess}</p>
                  </div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {content.back}
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{content.completeOnboarding}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
