import React, { useState } from 'react';
import {
  Recycle,
  Plus,
  Search,
  MessageSquare,
  Package,
  Truck,
  MapPin,
  Receipt,
  Network,
  Award,
  ShoppingBag,
  Sparkles,
  Bell,
  User,
  ShieldCheck,
  Globe,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  TrendingUp,
  Building2,
  Layers,
  FileText,
  Activity,
  CheckCircle2,
  Wifi,
  WifiOff,
  Scale,
  Key,
  AlertTriangle,
  LogOut,
  ChevronDown,
  Trash2,
  MoreHorizontal,
  FolderPlus,
  PanelLeftClose,
  Pin,
} from 'lucide-react';
import { AppView, UserRole, Language, SupportedRole, KycStatus } from '../types';
import { MOCK_RECENT_CHATS } from '../data/mockData';

interface SidebarProps {
  currentView: AppView;
  currentRole: UserRole;
  currentLang: Language;
  soundEnabled: boolean;
  kycStatus?: KycStatus;
  userPhone?: string;
  isOnline?: boolean;
  unreadCount?: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigate: (view: AppView) => void;
  onNewChat: () => void;
  onRoleChange: (role: UserRole) => void;
  onLangChange: (lang: Language) => void;
  onToggleSound: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  currentRole,
  currentLang,
  soundEnabled,
  kycStatus = 'IDENTITY_VERIFIED',
  userPhone = '+91 98220 14829',
  isOnline = true,
  unreadCount = 2,
  isOpenMobile,
  onCloseMobile,
  onNavigate,
  onNewChat,
  onRoleChange,
  onLangChange,
  onToggleSound,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 6 Defined Roles with rich metadata
  const rolesList: {
    id: UserRole;
    name: string;
    nameMr: string;
    nameHi: string;
    icon: string;
    badge: string;
    description: string;
    defaultView: AppView;
  }[] = [
    {
      id: 'household',
      name: 'Household / Citizen',
      nameMr: 'नागरिक / घरगुती वापरकर्ता',
      nameHi: 'नागरिक / घरेलू उपयोगकर्ता',
      icon: '🏠',
      badge: 'Customer',
      description: 'Sell scrap, book doorstep pickups & earn E-Points',
      defaultView: 'chat_home',
    },
    {
      id: 'kabadiwala',
      name: 'Collector (Kabadiwala)',
      nameMr: 'अधिकृत कबाडीवाला (संग्राहक)',
      nameHi: 'अधिकृत कबाड़ीवाला (संग्राहक)',
      icon: '🛵',
      badge: 'Field Agent',
      description: 'Pickup requests, IoT weighing & batch creation',
      defaultView: 'collector_dashboard',
    },
    {
      id: 'mover',
      name: 'Mover / Logistics Fleet',
      nameMr: 'वाहतूकदार / मूव्हर ऑपरेटर',
      nameHi: 'मूवर / ट्रांसपोर्ट फ्लीट',
      icon: '🚛',
      badge: 'Logistics',
      description: 'Hub-to-MRF & Recycler transit routes with OTP handover',
      defaultView: 'mover_dashboard',
    },
    {
      id: 'warehouse',
      name: 'Warehouse / MRF Hub',
      nameMr: 'गोदाम / MRF सॉर्टिंग केंद्र',
      nameHi: 'वेयरहाउस / MRF सॉर्टिंग हब',
      icon: '🏭',
      badge: 'Sorting Hub',
      description: 'Gate weighbridge scanner, 5-stream sorting & lot dispatch',
      defaultView: 'warehouse_dashboard',
    },
    {
      id: 'recycler',
      name: 'Authorized Recycler',
      nameMr: 'अधिकृत रिसायकलिंग प्लांट',
      nameHi: 'अधिकृत रीसाइक्लिंग प्लांट',
      icon: '🔄',
      badge: 'Industrial',
      description: '5-stage processing pipeline & CPCB EPR certificate minting',
      defaultView: 'recycler_dashboard',
    },
    {
      id: 'ngo',
      name: 'NGO / Social Organization',
      nameMr: 'एनजीओ / सामाजिक संस्था',
      nameHi: 'NGO / सामाजिक संगठन',
      icon: '🤝',
      badge: 'Partner',
      description: 'Upcycled goods in Eco Store & material allocations for rehabilitation',
      defaultView: 'store',
    },
    {
      id: 'regulator',
      name: 'Admin / Government (Regulator)',
      nameMr: 'प्रशासक व नियामक अधिकारी',
      nameHi: 'प्रशासक व नियामक अधिकारी',
      icon: '🏛️',
      badge: 'Govt Audit',
      description: 'Statewide circular metrics, forensic custody & fraud watch',
      defaultView: 'admin_dashboard',
    },
  ];

  const currentRoleMeta = rolesList.find((r) => r.id === currentRole) || rolesList[0];

  // Role-Specific Navigation Menus
  const getRoleNavItems = () => {
    switch (currentRole) {
      case 'household':
        return [
          { id: 'chat_home' as AppView, labelEn: 'AI Assistant', labelMr: 'AI सहाय्यक (Chat)', labelHi: 'AI सहायक', icon: MessageSquare },
          { id: 'sell_scrap' as AppView, labelEn: 'Sell / Dispose Scrap', labelMr: 'भंगार विका (Sell)', labelHi: 'कबाड़ बेचें', icon: Package, badge: 'Spot Rates' },
          { id: 'track_pickup' as AppView, labelEn: 'Track Doorstep Pickup', labelMr: 'पिकअप ट्रॅकिंग (Live)', labelHi: 'पिकअप ट्रैकिंग', icon: MapPin, badge: 'Live' },
          { id: 'transactions' as AppView, labelEn: 'Digital Tare & Price', labelMr: 'डिजिटल वजन व हमीभाव', labelHi: 'डिजिटल वजन व मूल्य', icon: Receipt },
          { id: 'digital_bills' as AppView, labelEn: 'Digital Bills & Receipts', labelMr: 'डिजिटल पावत्या (Bills)', labelHi: 'डिजिटल रसीदें', icon: FileText },
          { id: 'waste_journey' as AppView, labelEn: 'Waste Journey & Traceability', labelMr: 'कचरा प्रवास व ट्रेसेबिलिटी', labelHi: 'कचरा यात्रा ट्रेसेबिलिटी', icon: Network, badge: 'EPR' },
          { id: 'e_points' as AppView, labelEn: 'E-Points & Green Impact', labelMr: 'ई-पॉइंट्स व बक्षिसे', labelHi: 'ई-पॉइंट्स व इनाम', icon: Award, badge: '840 pts' },
          { id: 'waste_to_best' as AppView, labelEn: 'Waste-to-Best Upcycling', labelMr: 'वेस्ट-टू-बेस्ट (अपसायकल)', labelHi: 'वेस्ट-टू-बेस्ट', icon: Sparkles, badge: 'New' },
          { id: 'store' as AppView, labelEn: 'Eco Circular Store', labelMr: 'इको स्टोअर (मार्केट)', labelHi: 'इको स्टोर', icon: ShoppingBag },
        ];

      case 'kabadiwala':
        return [
          { id: 'chat_home' as AppView, labelEn: 'Collector Assistant', labelMr: 'कलेक्टर AI सहाय्यक', labelHi: 'कलेक्टर AI सहायक', icon: MessageSquare },
          { id: 'collector_dashboard' as AppView, labelEn: 'Field Operations Hub', labelMr: 'कबाडीवाला ऑपरेशन्स डॅशबोर्ड', labelHi: 'कबाड़ीवाला ऑपरेशन्स', icon: Truck, badge: '4 New' },
          { id: 'track_pickup' as AppView, labelEn: 'Active Route & Navigation', labelMr: 'सक्रिय मार्ग व जीपीएस', labelHi: 'सक्रिय रूट व नेविगेशन', icon: MapPin },
          { id: 'transactions' as AppView, labelEn: 'IoT Scale Weighing Tool', labelMr: 'डिजिटल वजन काटा टूल', labelHi: 'डिजिटल कांटा टूल', icon: Scale, badge: 'BT-992' },
          { id: 'digital_bills' as AppView, labelEn: 'Customer Digital Invoices', labelMr: 'ग्राहक डिजिटल पावत्या', labelHi: 'ग्राहक डिजिटल रसीदें', icon: FileText },
          { id: 'waste_journey' as AppView, labelEn: 'Batch Custody Manifest', labelMr: 'बॅच मॅनिफेस्ट ट्रॅकर', labelHi: 'बैच मैनिफेस्ट ट्रैकर', icon: Network },
        ];

      case 'mover':
        return [
          { id: 'chat_home' as AppView, labelEn: 'Logistics Assistant', labelMr: 'लॉजिस्टिक्स AI सहाय्यक', labelHi: 'लॉजिस्टिक्स सहायक', icon: MessageSquare },
          { id: 'mover_dashboard' as AppView, labelEn: 'Transit Fleet Portal', labelMr: 'वाहतूकदार डॅशबोर्ड', labelHi: 'मूवर डैशबोर्ड', icon: TrendingUp, badge: '2 Trips' },
          { id: 'waste_journey' as AppView, labelEn: 'Chain of Custody GPS', labelMr: 'कस्टडी जीपीएस ट्रॅकर', labelHi: 'कस्टडी जीपीएस ट्रैकर', icon: Network, badge: 'Live' },
          { id: 'digital_bills' as AppView, labelEn: 'Waybills & Gate Passes', labelMr: 'वेबिल्स व गेट पास', labelHi: 'वेबिल्स व गेट पास', icon: FileText },
        ];

      case 'warehouse':
        return [
          { id: 'chat_home' as AppView, labelEn: 'Warehouse Assistant', labelMr: 'गोदाम AI सहाय्यक', labelHi: 'वेयरहाउस सहायक', icon: MessageSquare },
          { id: 'warehouse_dashboard' as AppView, labelEn: 'MRF Sorting & Inventory', labelMr: 'MRF सॉर्टिंग व साठा', labelHi: 'MRF सॉर्टिंग व स्टॉक', icon: Layers, badge: '19.2T' },
          { id: 'waste_journey' as AppView, labelEn: 'Intake & Lot Traceability', labelMr: 'लॉट ट्रेसेबिलिटी लेजर', labelHi: 'लॉट ट्रेसेबिलिटी लेजर', icon: Network, badge: 'EPR' },
          { id: 'digital_bills' as AppView, labelEn: 'B2B Auction Invoices', labelMr: 'B2B खरेदी पावत्या', labelHi: 'B2B खरीद रसीदें', icon: FileText },
        ];

      case 'recycler':
        return [
          { id: 'chat_home' as AppView, labelEn: 'Processor Assistant', labelMr: 'रिसायकलर AI सहाय्यक', labelHi: 'रीसाइक्लर सहायक', icon: MessageSquare },
          { id: 'recycler_dashboard' as AppView, labelEn: 'Processing Plant Portal', labelMr: 'रिसायकलिंग प्लांट डॅशबोर्ड', labelHi: 'प्लांट डैशबोर्ड', icon: Building2, badge: 'CPCB' },
          { id: 'waste_journey' as AppView, labelEn: 'EPR Audit & Custody Chain', labelMr: 'EPR ऑडिट लेजर', labelHi: 'EPR ऑडिट लेजर', icon: Network },
          { id: 'digital_bills' as AppView, labelEn: 'EPR Credit Certificates', labelMr: 'EPR डिजिटल सर्टिफिकेट्स', labelHi: 'EPR डिजिटल सर्टिफिकेट्स', icon: FileText },
        ];

      case 'ngo':
        return [
          { id: 'chat_home' as AppView, labelEn: 'NGO Assistant', labelMr: 'एनजीओ AI सहाय्यक', labelHi: 'NGO सहायक', icon: MessageSquare },
          { id: 'store' as AppView, labelEn: 'Eco Store & Upcycled Goods', labelMr: 'इको स्टोअर व अपसायकल वस्तू', labelHi: 'इको स्टोर व अपसाइक्ड वस्तुएं', icon: ShoppingBag, badge: 'Partner' },
          { id: 'waste_journey' as AppView, labelEn: 'Material Allocation Tracking', labelMr: 'साहित्य वाटप ट्रॅकर', labelHi: 'सामग्री आवंटन ट्रैकर', icon: Network },
          { id: 'e_points' as AppView, labelEn: 'Impact & Social Credits', labelMr: 'सामाजिक प्रभाव क्रेडिट्स', labelHi: 'सामाजिक प्रभाव क्रेडिट्स', icon: Award },
        ];

      case 'regulator':
        return [
          { id: 'chat_home' as AppView, labelEn: 'Regulator Assistant', labelMr: 'नियामक AI सहाय्यक', labelHi: 'नियामक सहायक', icon: MessageSquare },
          { id: 'admin_dashboard' as AppView, labelEn: 'State Regulatory Dashboard', labelMr: 'महाराष्ट्र नियामक डॅशबोर्ड', labelHi: 'राज्य नियामक डैशबोर्ड', icon: Activity, badge: 'Auditor' },
          { id: 'waste_journey' as AppView, labelEn: 'Forensic Custody Ledger', labelMr: 'फॉरेन्सिक ऑडिट लेजर', labelHi: 'फोरेंसिक ऑडिट लेजर', icon: Network, badge: 'Secure' },
          { id: 'digital_bills' as AppView, labelEn: 'Statewide Manifest Archive', labelMr: 'मॅनिफेस्ट व पावत्या संग्रह', labelHi: 'मैनिफेस्ट अभिलेखागार', icon: FileText },
        ];
    }
  };

  const navItems = getRoleNavItems();

  const getLocalizedLabel = (item: { labelEn: string; labelMr: string; labelHi: string }) => {
    if (currentLang === 'mr') return item.labelMr;
    if (currentLang === 'hi') return item.labelHi;
    return item.labelEn;
  };

  const filteredChats = MOCK_RECENT_CHATS.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayChats = filteredChats.filter((c) => c.time === 'Today');
  const yesterdayChats = filteredChats.filter((c) => c.time === 'Yesterday');
  const pastChats = filteredChats.filter((c) => c.time.includes('Previous'));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar (Light Purple / Lavender Theme) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-purple-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-lg shadow-purple-500/5 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* TOP SECTION: Brand Header & New Chat Button */}
        <div className="p-3.5 border-b border-purple-100 flex flex-col gap-3 bg-gradient-to-b from-purple-50/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900">
                    Kabadiwala<span className="text-[#168A45]">GPT</span>
                  </span>
                  <span className="text-[10px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-[#168A45] text-white shadow-2xs">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-[#168A45]/90 font-medium truncate max-w-[155px]">
                  Smart Circular Waste OS
                </p>
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-purple-900 hover:bg-purple-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Request / New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (isOpenMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-xs shadow-sm hover:shadow-md hover:shadow-purple-500/20 transition-all duration-150 cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>
                {currentLang === 'mr'
                  ? 'नवीन चॅट / विनंती'
                  : currentLang === 'hi'
                  ? 'नया चैट / अनुरोध'
                  : 'New Chat / Request'}
              </span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-purple-900/40 rounded text-purple-100 font-mono border border-purple-400/30">
              Ctrl+K
            </kbd>
          </button>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder={
                currentLang === 'mr'
                  ? 'शोधा (विनंती, बॅच, पावत्या)...'
                  : currentLang === 'hi'
                  ? 'खोजें (अनुरोध, बैच, रसीद)...'
                  : 'Search requests, batches, chats...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-purple-50/50 hover:bg-purple-50 focus:bg-white border border-purple-200/90 rounded-xl text-slate-800 placeholder-purple-400/80 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {/* MIDDLE SECTION: Role-Specific Nav + Chat History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {/* Dedicated Role Feature Nav */}
          <div>
            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-900/60 flex items-center justify-between">
              <span>
                {currentLang === 'mr'
                  ? `${currentRoleMeta.nameMr.split(' ')[0]} ऑपरेशन्स`
                  : currentLang === 'hi'
                  ? `${currentRoleMeta.nameHi.split(' ')[0]} ऑपरेशन्स`
                  : `${currentRoleMeta.badge} Features`}
              </span>
              <span className="text-[10px] text-purple-400 font-mono">
                {navItems.length} {currentLang === 'mr' ? 'पर्याय' : currentLang === 'hi' ? 'विकल्प' : 'items'}
              </span>
            </div>

            <nav className="space-y-0.5 mt-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      if (isOpenMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-purple-100/80 text-purple-950 font-bold border border-purple-200/90 shadow-2xs'
                        : 'text-slate-600 hover:text-purple-950 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-purple-600' : 'text-purple-400'
                        }`}
                      />
                      <span className="truncate">{getLocalizedLabel(item)}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tight shrink-0 ${
                          item.badge === 'Live'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : item.badge === 'Spot Rates'
                            ? 'bg-purple-100 text-purple-800'
                            : item.badge === 'EPR'
                            ? 'bg-teal-100 text-teal-800'
                            : item.badge === 'New'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ChatGPT-Style Recent Conversations Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {todayChats.length > 0 && (
              <div>
                <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {currentLang === 'mr' ? 'आज' : currentLang === 'hi' ? 'आज' : 'Today'}
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {todayChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        onNavigate('chat_home');
                        if (isOpenMobile) onCloseMobile();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-left group"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </span>
                      <MoreHorizontal className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {yesterdayChats.length > 0 && (
              <div>
                <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {currentLang === 'mr' ? 'काल' : currentLang === 'hi' ? 'कल' : 'Yesterday'}
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {yesterdayChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        onNavigate('chat_home');
                        if (isOpenMobile) onCloseMobile();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-left group"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {pastChats.length > 0 && (
              <div>
                <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {currentLang === 'mr'
                    ? 'मागील ७ दिवस'
                    : currentLang === 'hi'
                    ? 'पिछले 7 दिन'
                    : 'Previous 7 Days'}
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {pastChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        onNavigate('chat_home');
                        if (isOpenMobile) onCloseMobile();
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-left group"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: Prominent Language Selector + User Profile */}
        <div className="p-3 border-t border-purple-100 bg-purple-50/50 space-y-2.5">
          {/* PROMINENT LANGUAGE SELECTOR BUTTONS */}
          <div className="bg-white border border-purple-200 rounded-2xl p-1.5 shadow-2xs">
            <div className="flex items-center justify-between px-1 mb-1 text-[10px] font-bold uppercase tracking-wider text-purple-900/70">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-purple-600" />
                Language / भाषा
              </span>
              <span className="text-purple-700 font-bold">
                {currentLang === 'mr' ? 'मराठी' : currentLang === 'hi' ? 'हिंदी' : 'English'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs font-bold">
              <button
                onClick={() => onLangChange('mr')}
                className={`py-1.5 px-2 rounded-xl transition-all text-center cursor-pointer ${
                  currentLang === 'mr'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-purple-50/50 hover:bg-purple-100/70 text-slate-700 border border-purple-100'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onLangChange('hi')}
                className={`py-1.5 px-2 rounded-xl transition-all text-center cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-purple-50/50 hover:bg-purple-100/70 text-slate-700 border border-purple-100'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => onLangChange('en')}
                className={`py-1.5 px-2 rounded-xl transition-all text-center cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-purple-50/50 hover:bg-purple-100/70 text-slate-700 border border-purple-100'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {userPhone}
                </p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 truncate">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified {currentRoleMeta.badge}
                </p>
              </div>
            </div>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Voice Sound Active' : 'Voice Sound Muted'}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-purple-100/80 border-purple-300 text-purple-700'
                  : 'bg-white border-purple-200 text-slate-400 hover:text-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
