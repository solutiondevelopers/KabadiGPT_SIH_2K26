import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  Package,
  MapPin,
  Network,
  Award,
  ShoppingBag,
  ArrowRight,
  Recycle,
  Layers,
  Scale,
  FileText,
  ShieldCheck,
  TrendingUp,
  Building2,
  Activity,
  Globe,
  Truck,
} from 'lucide-react';
import {
  ChatMessage as ChatMessageType,
  Language,
  UserRole,
  ActiveComponentType,
  SupportedRole,
} from '../../types';
import { ChatMessage } from '../ChatMessage';
import { SuggestedPrompts } from '../SuggestedPrompts';

interface ChatHomeViewProps {
  messages: ChatMessageType[];
  currentRole: UserRole;
  currentLang: Language;
  isProcessing: boolean;
  onSendMessage: (text: string, imageSrc?: string, isVoice?: boolean) => void;
  onComponentChange: (component: ActiveComponentType | string, data?: any) => void;
  onCompleteOnboarding: (role: SupportedRole, kycStatus: any, details: any) => void;
  onQuickAction: (actionType: string) => void;
}

export const ChatHomeView: React.FC<ChatHomeViewProps> = ({
  messages,
  currentRole,
  currentLang,
  isProcessing,
  onSendMessage,
  onComponentChange,
  onCompleteOnboarding,
  onQuickAction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const getGreeting = () => {
    if (currentLang === 'mr') {
      return {
        title: 'आज तुमचा पुनर्वापर अजेंडा काय आहे?',
        subtitle: 'घरातील जुने भंगार विकणे, पिकअप ट्रॅकिंग, वेस्ट-टू-बेस्ट किंवा थेट प्रश्न विचारा:',
      };
    }
    if (currentLang === 'hi') {
      return {
        title: 'आज आपका रिसाइक्लिंग एजेंडा क्या है?',
        subtitle: 'घर बैठे कबाड़ बेचना, लाइव पिकअप ट्रैकिंग, अपसाइक्लिंग या कोई भी सवाल पूछें:',
      };
    }
    return {
      title: "What's on your recycling agenda today?",
      subtitle:
        'Connect households, verified collectors, warehouses & authorized recyclers with AI-powered circular traceability.',
    };
  };

  const { title, subtitle } = getGreeting();

  // Role-adaptive quick action cards
  const getQuickActionCards = () => {
    switch (currentRole) {
      case 'household':
        return [
          {
            id: 'sell_scrap',
            icon: Package,
            titleEn: 'Sell Scrap & AI Estimate',
            titleMr: 'भंगार विका व AI अंदाज',
            titleHi: 'कबाड़ बेचें व AI अनुमान',
            descEn: 'Identify paper, plastic, metals with spot rates',
            descMr: 'कागद, प्लास्टिक, लोखंड हमीभावात विका',
            descHi: 'कागज, प्लास्टिक, लोहा उचित मूल्य पर बेचें',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'मी घरातून कबाड विकू इच्छितो',
          },
          {
            id: 'track_pickup',
            icon: MapPin,
            titleEn: 'Track Doorstep Pickup',
            titleMr: 'पिकअप ट्रॅकिंग (Live)',
            titleHi: 'पिकअप ट्रैकिंग (Live)',
            descEn: 'Live vehicle ETA, scale tare & collector ID',
            descMr: 'कलेक्टरचे स्थान, वाहनाचा मार्ग व ईटीए',
            descHi: 'कलेक्टर का लाइव स्थान व गाड़ी का विवरण',
            color: 'hover:border-purple-400 group',
            iconColor: 'text-purple-600 bg-purple-50',
            action: 'माझ्या पिकअपची सद्यस्थिती दाखवा',
          },
          {
            id: 'waste_journey',
            icon: Network,
            titleEn: 'Track Waste Journey',
            titleMr: 'कचरा प्रवास ट्रेसेबिलिटी',
            titleHi: 'कचरा यात्रा ट्रेसेबिलिटी',
            descEn: 'End-to-end custody from home to recycler',
            descMr: 'कबाडीवाला ते रिसायकलर संपूर्ण प्रवास',
            descHi: 'कबाड़ीवाला से रीसाइक्लर तक पूरी यात्रा',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'माझ्या भंगाराचा ट्रेसेबिलिटी प्रवास दाखवा',
          },
          {
            id: 'waste_to_best',
            icon: Sparkles,
            titleEn: 'Waste-to-Best Upcycling',
            titleMr: 'वेस्ट-टू-बेस्ट अपसायकल',
            titleHi: 'वेस्ट-टू-बेस्ट अपसाइक्लिंग',
            descEn: 'Turn old tyres into chairs, e-waste into decor',
            descMr: 'जुन्या टायरपासून खुर्ची किंवा टेबल बनवा',
            descHi: 'पुराने टायर से कुर्सी व सजावटी सामान बनाएं',
            color: 'hover:border-purple-400 group',
            iconColor: 'text-purple-600 bg-purple-50',
            action: 'जुन्या टायरपासून खुर्ची कशी बनवायची?',
          },
        ];

      case 'kabadiwala':
        return [
          {
            id: 'collector_dashboard',
            icon: Truck,
            titleEn: 'Today’s Field Pickups',
            titleMr: 'आजचे पिकअप्स',
            titleHi: 'आज के पिकअप्स',
            descEn: 'Review 7 assigned doorstep requests in Aundh',
            descMr: 'औंध भागातील ७ नवीन विनंत्या तपासा',
            descHi: 'औंध क्षेत्र के 7 नए अनुरोध देखें',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'आज किती pickup requests आहेत?',
          },
          {
            id: 'transactions',
            icon: Scale,
            titleEn: 'IoT Scale Weighing Tool',
            titleMr: 'डिजिटल वजन काटा टूल',
            titleHi: 'डिजिटल कांटा टूल',
            descEn: 'Calibrate tare & calculate instant customer bill',
            descMr: 'कॅलिब्रेटेड वजन व त्वरित ग्राहक बिल',
            descHi: 'कैलिब्रेटेड वजन व तुरंत ग्राहक बिल',
            color: 'hover:border-purple-400 group',
            iconColor: 'text-purple-600 bg-purple-50',
            action: 'Digital receipt तयार करू?',
          },
        ];

      case 'mover':
        return [
          {
            id: 'mover_dashboard',
            icon: TrendingUp,
            titleEn: 'Transit Trips (Leg 1 & 2)',
            titleMr: 'वाहतूक ट्रिप्स व मार्ग',
            titleHi: 'ट्रांसपोर्ट ट्रिप्स व रूट',
            descEn: 'Tata Ace EV payload & MRF Hub routing',
            descMr: 'मायक्रो-हब ते MRF सॉर्टिंग केंद्र',
            descHi: 'माइक्रो-हब से MRF सॉर्टिंग हब',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'आजच्या वाहतूक ट्रिप्स दाखवा',
          },
          {
            id: 'waste_journey',
            icon: Network,
            titleEn: 'Batch Handover OTP',
            titleMr: 'बॅच हँडओव्हर ओटीपी',
            titleHi: 'बैच हैंडओवर ओटीपी',
            descEn: 'Verify custody transfer at MRF Gate',
            descMr: 'MRF गेटवर डिजिटल स्वाक्षरी पडताळणी',
            descHi: 'MRF गेट पर डिजिटल सत्यापन',
            color: 'hover:border-purple-400 group',
            iconColor: 'text-purple-600 bg-purple-50',
            action: 'या batch ची पूर्ण traceability दाखव',
          },
        ];

      case 'warehouse':
        return [
          {
            id: 'warehouse_dashboard',
            icon: Layers,
            titleEn: 'Gate Tare Reconciliation',
            titleMr: 'गेट वजन पडताळणी',
            titleHi: 'गेट वजन मिलान',
            descEn: 'Optical sorting bays & 19.2 Ton inventory',
            descMr: 'ऑप्टिकल सॉर्टिंग बेज व साठा',
            descHi: 'ऑप्टिकल सॉर्टिंग बेज व स्टॉक',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'गोदाम साठा आणि सॉर्टिंग दाखवा',
          },
        ];

      case 'recycler':
        return [
          {
            id: 'recycler_dashboard',
            icon: Building2,
            titleEn: '5-Stage Extrusion Line',
            titleMr: '५-टप्प्यांची प्रक्रिया लाईन',
            titleHi: '5-चरणीय प्रोसेसिंग लाइन',
            descEn: 'Food-grade rPET granules & CPCB EPR certificates',
            descMr: 'rPET ग्रॅन्युल्स व EPR सर्टिफिकेट जारी',
            descHi: 'rPET दाने व EPR सर्टिफिकेट जारी',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'माझे incoming batches दाखव',
          },
        ];

      case 'ngo':
        return [
          {
            id: 'store',
            icon: ShoppingBag,
            titleEn: 'Eco Store & Upcycled Goods',
            titleMr: 'इको स्टोअर व अपसायकल वस्तू',
            titleHi: 'इको स्टोर व अपसाइक्ड वस्तुएं',
            descEn: 'Support artisan livelihood and community craft',
            descMr: 'कारागीर व महिला पुनर्वसन वस्तू पाहा',
            descHi: 'कारीगर व महिला पुनर्वास वस्तुएं देखें',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'इको स्टोअर मधील अपसायकल वस्तू दाखवा',
          },
        ];

      case 'regulator':
        return [
          {
            id: 'admin_dashboard',
            icon: Activity,
            titleEn: 'Statewide Forensic Registry',
            titleMr: 'महाराष्ट्र नियामक डॅशबोर्ड',
            titleHi: 'राज्य नियामक डैशबोर्ड',
            descEn: 'Immutable chain of custody & anti-fraud watchlist',
            descMr: 'अपरिवर्तनीय ऑडिट व गैरप्रकार नियंत्रण',
            descHi: 'अपरिवर्तनीय ऑडिट व धोखाधड़ी निगरानी',
            color: 'hover:border-violet-400 group',
            iconColor: 'text-violet-600 bg-violet-50',
            action: 'EPR compliance summary',
          },
        ];
    }
  };

  const quickActionCards = getQuickActionCards();

  const getCardTitle = (c: any) => {
    if (currentLang === 'mr') return c.titleMr;
    if (currentLang === 'hi') return c.titleHi;
    return c.titleEn;
  };

  const getCardDesc = (c: any) => {
    if (currentLang === 'mr') return c.descMr;
    if (currentLang === 'hi') return c.descHi;
    return c.descEn;
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Centered Hero Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 text-purple-900 border border-purple-200 text-xs font-semibold shadow-2xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>KabadiwalaGPT Circular OS • Light Purple Edition</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-purple-900/70 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Suggested Quick Action Cards Grid */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-300">
          {quickActionCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => {
                  onSendMessage(card.action);
                  onQuickAction(card.id);
                }}
                className={`p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200/80 text-left shadow-sm shadow-purple-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px] hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/10 group`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-xl text-purple-600 bg-purple-50 border border-purple-100`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-300 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {getCardTitle(card)}
                  </h3>
                  <p className="text-[11px] text-purple-600/70 mt-0.5">{getCardDesc(card)}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Suggested Prompts Pills */}
      <SuggestedPrompts
        role={currentRole}
        lang={currentLang}
        isOnboarding={false}
        onSelectPrompt={(p) => onSendMessage(p)}
      />

      {/* Active Conversational Message Thread */}
      <div className="space-y-4 pt-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            lang={currentLang}
            role={currentRole}
            onTriggerAction={(actionText) => onSendMessage(actionText)}
            onComponentChange={onComponentChange}
            onCompleteOnboarding={onCompleteOnboarding}
          />
        ))}

        {/* AI Thinking animation */}
        {isProcessing && (
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
              AI
            </div>
            <div className="bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl rounded-bl-xs px-4 py-2.5 text-xs text-purple-800 shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>
                {currentLang === 'mr'
                  ? 'KabadiwalaGPT विचार करत आहे...'
                  : currentLang === 'hi'
                  ? 'KabadiwalaGPT सोच रहा है...'
                  : 'KabadiwalaGPT is understanding intent...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
