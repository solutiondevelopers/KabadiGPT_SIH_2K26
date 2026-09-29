import React from 'react';
import {
  Menu,
  Recycle,
  Volume2,
  VolumeX,
  Bell,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Globe,
  ChevronRight,
  User,
  SlidersHorizontal,
} from 'lucide-react';
import { AppView, UserRole, Language, KycStatus } from '../types';

interface TopBarProps {
  currentView: AppView;
  currentRole: UserRole;
  currentLang: Language;
  soundEnabled: boolean;
  kycStatus?: KycStatus;
  userPhone?: string;
  unreadNotificationsCount?: number;
  onOpenSidebar: () => void;
  onOpenNotifications: () => void;
  onRoleChange: (role: UserRole) => void;
  onLangChange: (lang: Language) => void;
  onToggleSound: () => void;
  onResetChat: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  currentRole,
  currentLang,
  soundEnabled,
  kycStatus = 'IDENTITY_VERIFIED',
  userPhone = '+91 98220 14829',
  unreadNotificationsCount = 2,
  onOpenSidebar,
  onOpenNotifications,
  onRoleChange,
  onLangChange,
  onToggleSound,
  onResetChat,
}) => {
  const getViewTitle = (): { title: string; subtitle?: string } => {
    const titles: Partial<Record<AppView, Record<Language, { title: string; subtitle: string }>>> = {
      chat_home: {
        mr: {
          title: 'KabadiwalaGPT सहाय्यक',
          subtitle: 'संभाषण-आधारित कचरा व्यवस्थापन व चक्रीय प्रणाली',
        },
        hi: {
          title: 'KabadiwalaGPT सहायक',
          subtitle: 'संवाद-आधारित अपशिष्ट प्रबंधन और चक्रीय प्रणाली',
        },
        en: {
          title: 'KabadiwalaGPT Assistant',
          subtitle: 'Conversational Waste & Traceability OS',
        },
      },
      sell_scrap: {
        mr: {
          title: 'भंगार विका व विल्हेवाट लावा',
          subtitle: 'एआय फोटो तपासणी व हमीभावात डोअरस्टेप पिकअप',
        },
        hi: {
          title: 'कबाड़ बेचें व निपटान करें',
          subtitle: 'एआई फोटो जांच व उचित मूल्य पर डोरस्टेप पिकअप',
        },
        en: {
          title: 'Sell & Dispose Scrap',
          subtitle: 'AI Photo Inspection & Doorstep Pickup',
        },
      },
      track_pickup: {
        mr: {
          title: 'डोअरस्टेप पिकअप ट्रॅकिंग',
          subtitle: 'थेट कलेक्टर जीपीएस स्थान व ईटीए वेळ',
        },
        hi: {
          title: 'डोरस्टेप पिकअप ट्रैकिंग',
          subtitle: 'लाइव कलेक्टर जीपीएस लोकेशन व ईटीए',
        },
        en: {
          title: 'Doorstep Pickup Tracking',
          subtitle: 'Live Collector Telematics & GPS ETA',
        },
      },
      transactions: {
        mr: {
          title: 'डिजिटल वजन व हमीभाव पडताळणी',
          subtitle: 'प्रमाणित IoT वजन काटा व तात्काळ बिल गणना',
        },
        hi: {
          title: 'डिजिटल वजन व मूल्य सत्यापन',
          subtitle: 'प्रमाणित IoT डिजिटल कांटा व तुरंत बिल गणना',
        },
        en: {
          title: 'Digital Weighing & Price Verification',
          subtitle: 'Verified IoT Scale & Spot Price Calculation',
        },
      },
      digital_bills: {
        mr: {
          title: 'डिजिटल पावत्या व टॅक्स इनव्हॉइस',
          subtitle: 'क्यूआर कोड व सुरक्षित हॅशसह अधिकृत पावत्या',
        },
        hi: {
          title: 'डिजिटल रसीदें व टैक्स इनवॉइस',
          subtitle: 'क्यूआर कोड व सुरक्षित डिजिटल रसीदें',
        },
        en: {
          title: 'Digital Bills & Invoices',
          subtitle: 'Tamper-Proof Audit Receipts with QR Hash',
        },
      },
      waste_journey: {
        mr: {
          title: 'कचरा प्रवास व ईपीआर ट्रेसेबिलिटी',
          subtitle: 'घरापासून रिसायकलरपर्यंत अखंड कस्टडी लेजर',
        },
        hi: {
          title: 'कचरा यात्रा व ईपीआर ट्रेसेबिलिटी',
          subtitle: 'घर से रीसाइक्लर तक पूरी डिजिटल कस्टडी',
        },
        en: {
          title: 'Waste Journey & EPR Traceability',
          subtitle: 'End-to-End Circular Custody Ledger',
        },
      },
      e_points: {
        mr: {
          title: 'ई-पॉइंट्स व हरित बक्षिसे',
          subtitle: 'कार्बन बचत क्रेडिट्स व पर्यावरण कुपन्स',
        },
        hi: {
          title: 'ई-पॉइंट्स व ग्रीन रिवार्ड्स',
          subtitle: 'कार्बन बचत क्रेडिट्स व इको कूपन',
        },
        en: {
          title: 'E-Points & Green Impact Rewards',
          subtitle: 'Carbon Abatement & Eco Coupons',
        },
      },
      waste_to_best: {
        mr: {
          title: 'वेस्ट-टू-बेस्ट अपसायकलिंग',
          subtitle: 'टाकाऊ वस्तूंपासून टिकाऊ आकर्षक वस्तू बनवा',
        },
        hi: {
          title: 'वेस्ट-टू-बेस्ट अपसाइक्लिंग',
          subtitle: 'बेकार कबाड़ से सुंदर उपयोगी सामान बनाएं',
        },
        en: {
          title: 'Waste-to-Best Upcycling',
          subtitle: 'Turn Discarded Goods into Value Products',
        },
      },
      store: {
        mr: {
          title: 'इको चक्रीय बाजारपेठ (Store)',
          subtitle: 'प्रमाणित अपसायकल व रिसायकल उत्पादने',
        },
        hi: {
          title: 'इको चक्रीय मार्केट (Store)',
          subtitle: 'प्रमाणित अपसाइकल व रीसाइकल उत्पाद',
        },
        en: {
          title: 'Eco Circular Marketplace',
          subtitle: 'Certified Upcycled & Recycled Goods',
        },
      },
      collector_dashboard: {
        mr: {
          title: 'कबाडीवाला फील्ड ऑपरेशन्स',
          subtitle: 'आजचे पिकअप्स, डिजिटल काटा व बॅच पॅकिंग',
        },
        hi: {
          title: 'कबाड़ीवाला फील्ड ऑपरेशन्स',
          subtitle: 'आज के पिकअप्स, डिजिटल कांटा व बैच पैकिंग',
        },
        en: {
          title: 'Collector Field Operations',
          subtitle: 'Today’s Pickups, Scale Weighing & Batch Packing',
        },
      },
      mover_dashboard: {
        mr: {
          title: 'वाहतूकदार फ्लीट व लॉजिस्टिक्स पोर्टल',
          subtitle: 'हब ते MRF मार्ग, वजन क्षमता व ओटीपी हँडओव्हर',
        },
        hi: {
          title: 'मूवर फ्लीट व लॉजिस्टिक्स पोर्टल',
          subtitle: 'हब से MRF रूट, क्षमता व ओटीपी हैंडओवर',
        },
        en: {
          title: 'Mover Fleet & Logistics Portal',
          subtitle: 'Leg 1 & Leg 2 Transit Telematics & Handover',
        },
      },
      warehouse_dashboard: {
        mr: {
          title: 'गोदाम व MRF सॉर्टिंग केंद्र',
          subtitle: 'वेब्रिज इन्टेक गेट स्कॅनर, ५-स्ट्रीम सॉर्टिंग व साठा',
        },
        hi: {
          title: 'वेयरहाउस व MRF सॉर्टिंग केंद्र',
          subtitle: 'इनटेक गेट वजन मिलान, 5-स्ट्रीम सॉर्टिंग व स्टॉक',
        },
        en: {
          title: 'Warehouse & MRF Sorting Facility',
          subtitle: 'Intake Reconciliation, Multi-Stream Sorting & Lots',
        },
      },
      recycler_dashboard: {
        mr: {
          title: 'अधिकृत रिसायकलिंग प्रक्रिया प्लांट',
          subtitle: 'मटेरियल रिकव्हरी लेजर व CPCB ईपीआर कंप्लायन्स',
        },
        hi: {
          title: 'अधिकृत रीसाइक्लिंग प्रोसेसिंग प्लांट',
          subtitle: 'मटेरियल रिकवरी लेजर व CPCB ईपीआर अनुपालन',
        },
        en: {
          title: 'Authorized Recycler Processing Plant',
          subtitle: 'Material Recovery Ledger & CPCB EPR Compliance',
        },
      },
      admin_dashboard: {
        mr: {
          title: 'शासकीय नियामक व प्रशासकीय डॅशबोर्ड',
          subtitle: 'महाराष्ट्र लँडफिल डायव्हर्जन, फॉरेन्सिक ऑडिट व फ्रॉड वॉच',
        },
        hi: {
          title: 'सरकारी नियामक व प्रशासनिक डैशबोर्ड',
          subtitle: 'राज्यव्यापी लैंडफिल डायवर्जन व फोरेंसिक ऑडिट',
        },
        en: {
          title: 'Government & Administrative Oversight',
          subtitle: 'Statewide Waste Flow, Forensic Audits & Fraud Alerting',
        },
      },
    };

    const item = titles[currentView]?.[currentLang] || titles[currentView]?.en;
    if (item) return item;
    return {
      title: 'KabadiwalaGPT',
      subtitle: currentLang === 'mr' ? 'स्मार्ट कचरा व्यवस्थापन सिस्टीम' : currentLang === 'hi' ? 'स्मार्ट अपशिष्ट प्रबंधन प्रणाली' : 'Smart Circular Economy System',
    };
  };

  const { title, subtitle } = getViewTitle();

  const rolePills: Record<UserRole, { label: string; icon: string; color: string }> = {
    household: {
      label: currentLang === 'mr' ? 'नागरिक / घरगुती' : currentLang === 'hi' ? 'नागरिक / घरेलू' : 'Citizen / Household',
      icon: '🏠',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    kabadiwala: {
      label: currentLang === 'mr' ? 'कबाडीवाला (संग्राहक)' : currentLang === 'hi' ? 'कबाड़ीवाला (संग्राहक)' : 'Field Collector',
      icon: '🛵',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    mover: {
      label: currentLang === 'mr' ? 'वाहतूकदार फ्लीट' : currentLang === 'hi' ? 'ट्रांसपोर्ट फ्लीट' : 'Logistics Fleet',
      icon: '🚛',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    warehouse: {
      label: currentLang === 'mr' ? 'MRF सॉर्टिंग केंद्र' : currentLang === 'hi' ? 'MRF सॉर्टिंग हब' : 'MRF Facility',
      icon: '🏭',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    recycler: {
      label: currentLang === 'mr' ? 'अधिकृत रिसायकलर' : currentLang === 'hi' ? 'अधिकृत रीसाइक्लर' : 'Authorized Recycler',
      icon: '🔄',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    ngo: {
      label: currentLang === 'mr' ? 'एनजीओ / सामाजिक संस्था' : currentLang === 'hi' ? 'NGO / सामाजिक संगठन' : 'NGO / Partner',
      icon: '🤝',
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    regulator: {
      label: currentLang === 'mr' ? 'शासकीय नियामक' : currentLang === 'hi' ? 'सरकारी नियामक' : 'State Regulator',
      icon: '🏛️',
      color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  };

  const resetLabel = currentLang === 'mr' ? 'रीसेट' : currentLang === 'hi' ? 'रीसेट' : 'Reset';
  const resetTitle = currentLang === 'mr' ? 'चॅट सत्र रीसेट करा' : currentLang === 'hi' ? 'चैट सत्र रीसेट करें' : 'Reset Chat Session';
  const voiceTitle = soundEnabled
    ? (currentLang === 'mr' ? 'AI आवाज बंद करा' : currentLang === 'hi' ? 'AI आवाज म्यूट करें' : 'Mute AI Voice')
    : (currentLang === 'mr' ? 'AI आवाज सुरू करा' : currentLang === 'hi' ? 'AI आवाज चालू करें' : 'Enable AI Voice');
  const notifTitle = currentLang === 'mr' ? 'सूचना व इशारे' : currentLang === 'hi' ? 'अधिसूचना व अलर्ट' : 'Notifications & Alerts';

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-purple-200/80 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs shadow-purple-500/5">
      {/* Left: Sidebar toggle + View title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onOpenSidebar}
          aria-label="Open Sidebar"
          className="p-2 rounded-xl text-slate-600 hover:text-purple-900 hover:bg-purple-100/70 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
              {title}
            </h1>
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${rolePills[currentRole]?.color}`}
            >
              <span>{rolePills[currentRole]?.icon}</span>
              <span>{rolePills[currentRole]?.label}</span>
            </span>
          </div>
          <p className="text-[11px] text-purple-700/80 font-medium truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: PROMINENT LANGUAGE BUTTONS + Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* PROMINENT LANGUAGE SWITCHER (Purple) */}
        <div className="flex items-center bg-purple-50/80 border border-purple-200/90 rounded-xl p-0.5 text-xs font-bold shadow-2xs">
          <div className="hidden md:flex items-center gap-1 px-1.5 text-purple-400">
            <Globe className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <button
            onClick={() => onLangChange('mr')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentLang === 'mr'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100/60'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => onLangChange('hi')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentLang === 'hi'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100/60'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => onLangChange('en')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentLang === 'en'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100/60'
            }`}
          >
            EN
          </button>
        </div>

        {/* Reset Chat */}
        {currentView === 'chat_home' && (
          <button
            onClick={onResetChat}
            title={resetTitle}
            className="p-2 rounded-xl text-slate-600 hover:text-purple-900 hover:bg-purple-100/60 transition-colors cursor-pointer hidden md:flex items-center gap-1 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{resetLabel}</span>
          </button>
        )}

        {/* Voice Speech Toggle */}
        <button
          onClick={onToggleSound}
          title={voiceTitle}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-purple-100/80 border-purple-300 text-purple-800 shadow-2xs'
              : 'bg-white border-purple-200 text-slate-400 hover:text-slate-700'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          title={notifTitle}
          className="relative p-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 transition-colors cursor-pointer shadow-2xs"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white" />
          )}
        </button>

        {/* User Profile Avatar Icon */}
        <div
          title={userPhone || 'User Profile'}
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-purple-500/20"
        >
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
};
