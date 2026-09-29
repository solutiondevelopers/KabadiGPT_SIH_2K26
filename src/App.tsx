/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ChatMessage as ChatMessageType,
  Language,
  UserRole,
  SupportedRole,
  KycStatus,
  UserProfile,
  ActiveComponentType,
  CentralUIState,
  AppView,
} from './types';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { RightContextPanel } from './components/RightContextPanel';
import { ChatInput } from './components/ChatInput';
import { LandingScreen } from './components/LandingScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { PhoneLoginScreen } from './components/PhoneLoginScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { PickupMapModal } from './components/PickupMapModal';
import { ChatHomeView } from './components/views/ChatHomeView';
import { SellScrapView } from './components/views/SellScrapView';
import { PickupTrackingView } from './components/views/PickupTrackingView';
import { DigitalWeighingView } from './components/views/DigitalWeighingView';
import { DigitalBillsView } from './components/views/DigitalBillsView';
import { WasteJourneyView } from './components/views/WasteJourneyView';
import { EPointsView } from './components/views/EPointsView';
import { WasteToBestView } from './components/views/WasteToBestView';
import { StoreView } from './components/views/StoreView';
import { CollectorOpsView } from './components/views/CollectorOpsView';
import { MoverOpsView } from './components/views/MoverOpsView';
import { WarehouseOpsView } from './components/views/WarehouseOpsView';
import { RecyclerOpsView } from './components/views/RecyclerOpsView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { NotificationsDrawer } from './components/views/NotificationsDrawer';
import { parseUserIntent, routeUserIntent } from './utils/aiIntentParser';
import { detectUserRoleFromText } from './utils/roleDetector';
import { speakText, stopSpeaking } from './utils/speech';
import { auth } from './lib/firebase';
import {
  saveUserProfile,
  getUserProfile,
  seedInitialDataIfEmpty,
  subscribeAuthState,
  acceptPickup,
  getNearbyRequests,
} from './services/firebaseService';

export default function App() {
  // App Phase: 'loading' | 'landing' | 'login' | 'onboarding' | 'main'
  const [appPhase, setAppPhase] = useState<'loading' | 'landing' | 'login' | 'onboarding' | 'main'>('loading');

  // Active View & Persona
  const [currentView, setCurrentView] = useState<AppView>('chat_home');
  const [currentRole, setCurrentRole] = useState<UserRole>('household');
  const [currentLang, setCurrentLang] = useState<Language>('mr');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // Drawer / Context Panels
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [rightPanel, setRightPanel] = useState<{
    isOpen: boolean;
    type: 'collector' | 'batch' | 'impact' | 'receipt' | null;
    data?: any;
  }>({
    isOpen: true,
    type: 'collector',
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    phone: '+91 98220 14829',
    name: 'Anand Deshmukh',
    role: 'HOUSEHOLD',
    kycStatus: 'IDENTITY_VERIFIED',
    onboarded: true,
  });

  // Central UI state
  const [centralUIState, setCentralUIState] = useState<CentralUIState>({
    activeComponent: 'SELL_SCRAP',
    componentData: null,
  });

  // Welcome message
  const getInitialWelcome = (role: UserRole, lang: Language): ChatMessageType => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (role === 'ngo') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार एनजीओ भागीदार! गोदामांमधून साहित्याचे वाटप, इको स्टोअरमधील अपसायकल वस्तू आणि महिला पुनर्वसन अहवाल तपासण्यासाठी खालील पर्याय वापरा:',
        hi: 'नमस्ते एनजीओ साथी! वेयरहाउस से सामग्री आवंटन, इको स्टोर में अपसाइक्ड वस्तुएं व महिला पुनर्वास रिपोर्ट देखने के लिए नीचे देखें:',
        en: 'Welcome NGO & Social Partner! Review upcycled goods in the Eco Store and material allocations for community rehabilitation:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
        workflow: { type: 'STORE' },
      };
    } else if (role === 'household') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार! मी KabadiwalaGPT — तुमचा AI भंगार व पुनर्वापर सहाय्यक. घरातील जुनी वर्तमानपत्रे, प्लास्टिक, लोखंड, तांबे किंवा जुने इलेक्ट्रॉनिक्स हमीभावात विकण्यासाठी खालील साहित्याची निवड करा किंवा थेट बोला:',
        hi: 'नमस्ते! मैं KabadiwalaGPT हूँ — आपका AI कबाड़ व रिसाइक्लिंग सहायक। घर बैठे पुराना अखबार, प्लास्टिक, धातु या ई-कचरा उचित मूल्य पर बेचने हेतु सामग्री चुनें या बोलें:',
        en: 'Welcome! I am KabadiwalaGPT — your circular waste assistant. Sell your household paper, plastics, metals, or electronics at verified spot rates:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
        workflow: { type: 'SELL_SCRAP' },
      };
    } else if (role === 'kabadiwala') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार कबाडीवाला मित्र! आजच्या नवीन पिकअप विनंत्या, डिजिटल वजन काटा किंवा आजची एकूण कमाई तपासण्यासाठी खालील पर्याय वापरा:',
        hi: 'नमस्ते कबाड़ीवाला साथी! आज के पिकअप्स, डिजिटल कांटा व आज की कुल कमाई देखने के लिए नीचे दिए विकल्पों का उपयोग करें:',
        en: 'Hello Collector! Review today’s assigned pickups, live weighing scale tare, or check daily earnings:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
        workflow: { type: 'REQUEST_COUNT', data: { total: 7 } },
      };
    } else if (role === 'mover') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार वाहतूकदार! तुमच्या वाहनासाठी नियुक्त केलेल्या ट्रिप्स, मायक्रो-हब ते MRF मार्ग व बॅच हँडओव्हर खाली उपलब्ध आहे:',
        hi: 'नमस्ते मूवर! आपके वाहन के लिए निर्धारित ट्रिप्स, माइक्रो-हब से MRF रूट व बैच हैंडओवर नीचे उपलब्ध है:',
        en: 'Logistics Fleet Active. Review Leg 1 & Leg 2 transit routes, payload capacity, and handover verification:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
      };
    } else if (role === 'warehouse') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार MRF पर्यवेक्षक! गेट वजन पडताळणी, ऑप्टिकल सॉर्टिंग बेज व तयार आउटगोइंग लॉट्स तपासण्यासाठी खालील माहिती उपलब्ध आहे:',
        hi: 'नमस्कार MRF सुपरवाइजर! गेट वजन मिलान, सॉर्टिंग व तैयार आउटगोइंग लॉट्स देखने के लिए नीचे देखें:',
        en: 'MRF Facility Active. Inspect intake gate reconciliation, multi-stream segregation, and outgoing lots:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
      };
    } else if (role === 'recycler') {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार अधिकृत रिसायकलर! प्रमाणित बल्क स्क्रॅप बॅचेस, ५-टप्प्यांची प्रक्रिया पाईपलाईन व EPR क्रेडिट्स खाली उपलब्ध आहेत:',
        hi: 'नमस्ते अधिकृत रिसाइकलर! प्रमाणित बल्क स्क्रैप बैचेस, 5-चरणीय प्रोसेसिंग व EPR क्रेडिट्स नीचे उपलब्ध हैं:',
        en: 'Authorized Recycler Active. Review processing pipeline, recovered raw materials, and EPR compliance manifests:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
        workflow: { type: 'RECYCLER_MATCHING' },
      };
    } else {
      const texts: Record<Language, string> = {
        mr: 'नमस्कार प्रशासक / नियामक अधिकारी! महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) लँडफिल डायव्हर्जन व ईपीआर फॉरेन्सिक ऑडिट अहवाल खाली दिला आहे:',
        hi: 'नमस्कार प्रशासक / नियामक अधिकारी! CPCB/MPCB लैंडफिल डायवर्जन व ईपीआर ऑडिट रिपोर्ट नीचे उपलब्ध है:',
        en: 'State Regulatory Portal. Statewide waste flows, immutable chain-of-custody audits, and anti-fraud alerts:',
      };
      return {
        id: 'msg-init-1',
        sender: 'ai',
        text: texts[lang],
        timestamp: timeNow,
        workflow: { type: 'REGULATORY_ANALYTICS' },
      };
    }
  };

  const [messages, setMessages] = useState<ChatMessageType[]>(() => [
    getInitialWelcome('household', 'mr'),
  ]);

  // Initialize Firestore
  useEffect(() => {
    seedInitialDataIfEmpty();

    const unsubscribe = subscribeAuthState(async (fbUser) => {
      if (fbUser) {
        setUserProfile((prev) => ({ ...prev, id: fbUser.uid }));
        const existingProfile = await getUserProfile(fbUser.uid);
        if (existingProfile) {
          setUserProfile({
            id: existingProfile.id,
            name: existingProfile.name,
            phone: existingProfile.phone,
            role: existingProfile.role,
            verificationStatus: existingProfile.verificationStatus,
            kycStatus: existingProfile.verificationStatus,
            language: existingProfile.language,
            location: existingProfile.location,
            kycDetails: existingProfile.kycDetails,
            onboarded: true,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Role change
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    const welcome = getInitialWelcome(newRole, currentLang);
    if (welcome.workflow) {
      setCentralUIState({
        activeComponent: welcome.workflow.type,
        componentData: welcome.workflow.data || null,
      });
    }

    if (newRole === 'kabadiwala') setCurrentView('collector_dashboard');
    else if (newRole === 'mover') setCurrentView('mover_dashboard');
    else if (newRole === 'warehouse') setCurrentView('warehouse_dashboard');
    else if (newRole === 'recycler') setCurrentView('recycler_dashboard');
    else if (newRole === 'ngo') setCurrentView('store');
    else if (newRole === 'regulator') setCurrentView('admin_dashboard');
    else setCurrentView('chat_home');

    setMessages((prev) => [
      ...prev,
      {
        id: `role-shift-${Date.now()}`,
        sender: 'ai',
        text:
          currentLang === 'mr'
            ? `भूमिका बदलली: ${newRole.toUpperCase()}. संबंधित कार्यप्रणाली सक्रिय केली आहे.`
            : currentLang === 'hi'
            ? `भूमिका बदली: ${newRole.toUpperCase()}. संबंधित कार्यप्रणाली सक्रिय की गई है।`
            : `Perspective switched to ${newRole.toUpperCase()}. Relevant operations loaded.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        workflow: welcome.workflow,
      },
    ]);
  };

  const handleLangChange = (newLang: Language) => {
    setCurrentLang(newLang);
  };

  const handleToggleSound = () => {
    if (soundEnabled) {
      stopSpeaking();
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      speakText('Voice output enabled', currentLang);
    }
  };

  const handleResetChat = () => {
    stopSpeaking();
    const init = getInitialWelcome(currentRole, currentLang);
    setMessages([init]);
    setCurrentView('chat_home');
  };

  const handleSendMessage = (
    text: string,
    imageSrc?: string,
    isVoice?: boolean
  ) => {
    const timeNow = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Check if user spoke or clicked "Accept" / "रूट मैप देखें" / "मैप"
    const lower = text.toLowerCase();
    if (lower.includes('accept') || lower.includes('स्वीकार') || lower.includes('रूट मैप') || lower.includes('मैप')) {
      setIsMapModalOpen(true);
    }

    const userMsg: ChatMessageType = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text || (imageSrc ? 'Uploaded scrap photo for AI inspection' : ''),
      timestamp: timeNow,
      imageAttachment: imageSrc,
      isVoice: !!isVoice,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    (async () => {
      try {
        const parsed = await routeUserIntent(
          text,
          currentRole,
          currentLang,
          !!imageSrc,
          imageSrc
        );

        if (parsed.workflow) {
          setCentralUIState({
            activeComponent: parsed.workflow.type,
            componentData: parsed.workflow.data || null,
          });
        }

        const aiMsg: ChatMessageType = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: parsed.replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          workflow: parsed.workflow,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsProcessing(false);

        if (soundEnabled || isVoice) {
          if (isVoice && !soundEnabled) setSoundEnabled(true);
          speakText(parsed.replyText, currentLang);
        }
      } catch (err) {
        console.error('Intent routing notice:', err);
        const fallback = parseUserIntent(text, currentRole, currentLang, !!imageSrc, imageSrc);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: fallback.replyText,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            workflow: fallback.workflow,
          },
        ]);
        setIsProcessing(false);
      }
    })();
  };

  const handleComponentChange = (
    component: ActiveComponentType | string,
    data?: any
  ) => {
    setCentralUIState({
      activeComponent: component,
      componentData: data || null,
    });
  };

  const handleQuickAction = (actionText: string) => {
    handleSendMessage(actionText);
  };

  const handleCompleteOnboarding = (role: SupportedRole, kycStatus: KycStatus, details: Record<string, any>) => {
    setUserProfile((prev) => ({
      ...prev,
      role,
      kycStatus,
      onboarded: true,
      kycDetails: details,
    }));
    setAppPhase('main');
    if (role === 'KABADIWALA') {
      setCurrentRole('kabadiwala');
      setCurrentView('collector_dashboard');
    } else if (role === 'MOVER') {
      setCurrentRole('mover');
      setCurrentView('mover_dashboard');
    } else if (role === 'WAREHOUSE') {
      setCurrentRole('warehouse');
      setCurrentView('warehouse_dashboard');
    } else if (role === 'RECYCLER') {
      setCurrentRole('recycler');
      setCurrentView('recycler_dashboard');
    } else if (role === 'NGO') {
      setCurrentRole('ngo');
      setCurrentView('store');
    } else if (role === 'GOVERNMENT') {
      setCurrentRole('regulator');
      setCurrentView('admin_dashboard');
    } else {
      setCurrentRole('household');
      setCurrentView('chat_home');
    }
  };

  // If appPhase is 'loading', render LoadingScreen
  if (appPhase === 'loading') {
    return (
      <LoadingScreen
        minDurationMs={1600}
        onFinish={() => {
          setAppPhase('onboarding');
        }}
      />
    );
  }

  // If appPhase is 'onboarding', render OnboardingFlow
  if (appPhase === 'onboarding') {
    return (
      <OnboardingFlow
        lang={currentLang}
        onSelectLanguage={handleLangChange}
        onComplete={(prof) => {
          setUserProfile(prof);
          setAppPhase('main');
          const mappedRole = prof.role === 'KABADIWALA' ? 'kabadiwala' : prof.role === 'MOVER' ? 'mover' : prof.role === 'WAREHOUSE' ? 'warehouse' : prof.role === 'RECYCLER' ? 'recycler' : prof.role === 'NGO' ? 'ngo' : prof.role === 'GOVERNMENT' ? 'regulator' : 'household';
          setCurrentRole(mappedRole);
          if (mappedRole === 'ngo') setCurrentView('store');
          else if (mappedRole !== 'household') setCurrentView(`${mappedRole}_dashboard` as AppView);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-purple-mesh text-slate-900 font-sans flex flex-col antialiased selection:bg-purple-200 selection:text-purple-950">
      {/* 1. Left Responsive Sidebar (Fixed on Desktop, Drawer on Mobile) */}
      <Sidebar
        currentView={currentView}
        currentRole={currentRole}
        currentLang={currentLang}
        soundEnabled={soundEnabled}
        kycStatus={userProfile.kycStatus}
        userPhone={userProfile.phone}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        onNavigate={(view) => {
          setCurrentView(view);
          setIsSidebarOpenMobile(false);
        }}
        onNewChat={handleResetChat}
        onRoleChange={handleRoleChange}
        onLangChange={handleLangChange}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Layout Wrapper (Leaves 288px on desktop for Sidebar) */}
      <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300 min-h-screen">
        {/* 2. Top Header Bar */}
        <TopBar
          currentView={currentView}
          currentRole={currentRole}
          currentLang={currentLang}
          soundEnabled={soundEnabled}
          kycStatus={userProfile.kycStatus}
          userPhone={userProfile.phone}
          onOpenSidebar={() => setIsSidebarOpenMobile(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onRoleChange={handleRoleChange}
          onLangChange={handleLangChange}
          onToggleSound={handleToggleSound}
          onResetChat={handleResetChat}
        />

        {/* 3. Middle Dynamic Viewports Container */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-6">
            {/* View 1: ChatGPT-Inspired Home / AI Assistant View */}
            {currentView === 'chat_home' && (
              <ChatHomeView
                messages={messages}
                currentRole={currentRole}
                currentLang={currentLang}
                isProcessing={isProcessing}
                onSendMessage={handleSendMessage}
                onComponentChange={handleComponentChange}
                onCompleteOnboarding={handleCompleteOnboarding}
                onQuickAction={handleQuickAction}
              />
            )}

            {/* View 2: Sell & Dispose Scrap Wizard */}
            {currentView === 'sell_scrap' && (
              <SellScrapView
                lang={currentLang}
                onNavigateToTracking={() => setCurrentView('track_pickup')}
              />
            )}

            {/* View 3: Live Doorstep Pickup Tracking */}
            {currentView === 'track_pickup' && (
              <PickupTrackingView
                lang={currentLang}
                onStartWeighing={() => setCurrentView('transactions')}
              />
            )}

            {/* View 4: Digital Weighing & Spot Price Verification */}
            {currentView === 'transactions' && (
              <DigitalWeighingView
                lang={currentLang}
                onNavigateToBill={() => setCurrentView('digital_bills')}
              />
            )}

            {/* View 5: Digital Bills & Tax Invoices */}
            {currentView === 'digital_bills' && (
              <DigitalBillsView
                lang={currentLang}
                onNavigateToJourney={() => setCurrentView('waste_journey')}
              />
            )}

            {/* View 6: Waste Journey & Traceability */}
            {currentView === 'waste_journey' && (
              <WasteJourneyView lang={currentLang} />
            )}

            {/* View 7: E-Points & Rewards */}
            {currentView === 'e_points' && (
              <EPointsView lang={currentLang} />
            )}

            {/* View 8: Waste-to-Best Upcycling */}
            {currentView === 'waste_to_best' && (
              <WasteToBestView lang={currentLang} />
            )}

            {/* View 9: Eco Circular Store */}
            {currentView === 'store' && (
              <StoreView lang={currentLang} />
            )}

            {/* Role Dashboards */}
            {currentView === 'collector_dashboard' && (
              <CollectorOpsView lang={currentLang} />
            )}

            {currentView === 'mover_dashboard' && (
              <MoverOpsView lang={currentLang} />
            )}

            {currentView === 'warehouse_dashboard' && (
              <WarehouseOpsView lang={currentLang} />
            )}

            {currentView === 'recycler_dashboard' && (
              <RecyclerOpsView lang={currentLang} />
            )}

            {currentView === 'admin_dashboard' && (
              <AdminDashboardView lang={currentLang} />
            )}
          </main>

          {/* 4. Optional Right Context Panel (Desktop) */}
          <RightContextPanel
            isOpen={rightPanel.isOpen && (currentView === 'chat_home' || currentView === 'track_pickup')}
            onClose={() => setRightPanel((prev) => ({ ...prev, isOpen: false }))}
            lang={currentLang}
            contextType={currentView === 'track_pickup' ? 'collector' : 'collector'}
          />
        </div>

        {/* 5. Floating Ergonomic Chat Input (Always accessible in Chat Home) */}
        {currentView === 'chat_home' && (
          <ChatInput
            lang={currentLang}
            role={currentRole}
            isProcessing={isProcessing}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>

      {/* 6. Notifications Slide-Over Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        lang={currentLang}
      />

      {/* 7. Live Map & Route Navigation Modal */}
      <PickupMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        lang={currentLang}
      />
    </div>
  );
}
