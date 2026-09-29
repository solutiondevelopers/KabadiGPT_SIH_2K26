import { Language, UserRole, AppView } from '../types';

export interface TranslationDict {
  [key: string]: {
    mr: string;
    hi: string;
    en: string;
  };
}

export const UI_TRANSLATIONS: TranslationDict = {
  // Navigation & Core App
  appTitle: {
    mr: 'KabadiwalaGPT',
    hi: 'KabadiwalaGPT',
    en: 'KabadiwalaGPT',
  },
  appSubtitle: {
    mr: 'स्मार्ट कचरा व्यवस्थापन व चक्रीय प्रणाली',
    hi: 'स्मार्ट अपशिष्ट प्रबंधन और चक्रीय प्रणाली',
    en: 'Smart Circular Waste OS',
  },
  newChat: {
    mr: 'नवीन चॅट / विनंती',
    hi: 'नया चैट / अनुरोध',
    en: 'New Chat / Request',
  },
  searchPlaceholder: {
    mr: 'शोधा (विनंती, बॅच, पावत्या, साहित्य)...',
    hi: 'खोजें (अनुरोध, बैच, रसीद, सामग्री)...',
    en: 'Search requests, batches, receipts...',
  },
  activeRoleLabel: {
    mr: 'सक्रिय लॉगिन भूमिका (६ पैकी १)',
    hi: 'सक्रिय लॉगिन भूमिका (6 में से 1)',
    en: 'Active Logged-In Role (1 of 6)',
  },
  switchRoleLabel: {
    mr: 'लॉगिन भूमिका बदला:',
    hi: 'लॉगिन भूमिका बदलें:',
    en: 'Switch Login Perspective:',
  },
  today: {
    mr: 'आज',
    hi: 'आज',
    en: 'Today',
  },
  yesterday: {
    mr: 'काल',
    hi: 'कल',
    en: 'Yesterday',
  },
  previousDays: {
    mr: 'मागील ७ दिवस',
    hi: 'पिछले 7 दिन',
    en: 'Previous 7 Days',
  },
  verifiedGovtBadge: {
    mr: 'शासकीय प्रमाणित',
    hi: 'सरकारी सत्यापित',
    en: 'Govt Verified',
  },
  reset: {
    mr: 'रीसेट',
    hi: 'रीसेट',
    en: 'Reset',
  },
  speak: {
    mr: 'ऐका',
    hi: 'सुनें',
    en: 'Speak',
  },
  voiceNote: {
    mr: 'आवाज नोंद',
    hi: 'वॉयस नोट',
    en: 'Voice Note',
  },
  thinking: {
    mr: 'KabadiwalaGPT विचार करत आहे...',
    hi: 'KabadiwalaGPT सोच रहा है...',
    en: 'KabadiwalaGPT is processing...',
  },
  suggestedActions: {
    mr: 'सुचवलेले प्रश्न व क्रिया:',
    hi: 'सुझाए गए प्रश्न व क्रियाएं:',
    en: 'Suggested Actions:',
  },
  // Chat input
  inputPlaceholder: {
    mr: 'KabadiwalaGPT ला काहीही विचारा किंवा बोला (उदा. "माझा जुना टीव्ही विकायचा आहे")...',
    hi: 'KabadiwalaGPT से कुछ भी पूछें या बोलें (उदा. "पुराना टीवी व 5kg अखबार बेचना है")...',
    en: 'Ask KabadiwalaGPT anything (e.g. "Sell my old TV", "Where is my pickup?")...',
  },
  cameraScan: {
    mr: 'कॅमेरा एआय स्कॅन',
    hi: 'कैमरा एआई स्कैन',
    en: 'Camera AI Scan',
  },
  selectScrap: {
    mr: 'भंगार निवडा',
    hi: 'कबाड़ चुनें',
    en: 'Select Scrap',
  },
  sendGpsPin: {
    mr: 'जीपीएस पिन पाठवा',
    hi: 'जीपीएस पिन भेजें',
    en: 'Send GPS Pin',
  },
  listening: {
    mr: 'KabadiwalaGPT ऐकत आहे... बोला',
    hi: 'KabadiwalaGPT सुन रहा है... बोलिए',
    en: 'KabadiwalaGPT is listening... Speak your request',
  },
  cancel: {
    mr: 'रद्द करा',
    hi: 'रद्द करें',
    en: 'Cancel',
  },
  // Common Actions
  back: {
    mr: 'मागे जा',
    hi: 'पीछे जाएं',
    en: 'Back',
  },
  next: {
    mr: 'पुढे जा',
    hi: 'आगे बढ़ें',
    en: 'Next',
  },
  confirm: {
    mr: 'निश्चित करा',
    hi: 'पुष्टि करें',
    en: 'Confirm',
  },
  save: {
    mr: 'जतन करा',
    hi: 'सहेजें',
    en: 'Save',
  },
  downloadPdf: {
    mr: 'पीडीएफ पावती डाउनलोड करा',
    hi: 'पीडीएफ रसीद डाउनलोड करें',
    en: 'Download PDF Invoice',
  },
  shareWhatsapp: {
    mr: 'व्हॉट्सअ‍ॅपवर शेअर करा',
    hi: 'व्हाट्सएप पर शेयर करें',
    en: 'Share on WhatsApp',
  },
  viewTraceability: {
    mr: 'कचरा प्रवास ट्रेसेबिलिटी पाहा',
    hi: 'कचरा यात्रा ट्रेसेबिलिटी देखें',
    en: 'View Waste Journey',
  },
  callCollector: {
    mr: 'कलेक्टरला कॉल करा',
    hi: 'कलेक्टर को कॉल करें',
    en: 'Call Collector',
  },
  startWeighing: {
    mr: 'डिजिटल वजन सुरू करा',
    hi: 'डिजिटल वजन शुरू करें',
    en: 'Start IoT Weighing',
  },
  trackOnMap: {
    mr: 'नकाशावर थेट ट्रॅक करा',
    hi: 'मानचित्र पर लाइव ट्रैक करें',
    en: 'Track Collector on Map',
  },
  bookAnother: {
    mr: 'दुसरा पिकअप बुक करा',
    hi: 'दूसरा पिकअप बुक करें',
    en: 'Book Another Pickup',
  },
  notifications: {
    mr: 'सूचना केंद्र',
    hi: 'अधिसूचना केंद्र',
    en: 'Notifications & Alerts',
  },
  markAllRead: {
    mr: 'सर्व वाचल्याचे चिन्हांकित करा',
    hi: 'सभी को पढ़ा हुआ चिह्नित करें',
    en: 'Mark all as read',
  },
  liveSystemUpdates: {
    mr: 'थेट चक्रीय सिस्टीम अपडेट्स',
    hi: 'लाइव चक्रीय सिस्टम अपडेट',
    en: 'Live circular system updates',
  },

  // Role Names
  roleHousehold: {
    mr: 'नागरिक / घरगुती वापरकर्ता',
    hi: 'नागरिक / घरेलू उपयोगकर्ता',
    en: 'Household / Citizen',
  },
  roleKabadiwala: {
    mr: 'अधिकृत कबाडीवाला (संग्राहक)',
    hi: 'अधिकृत कबाड़ीवाला (संग्राहक)',
    en: 'Collector (Kabadiwala)',
  },
  roleMover: {
    mr: 'वाहतूकदार / मूव्हर ऑपरेटर',
    hi: 'मूवर / ट्रांसपोर्ट फ्लीट',
    en: 'Mover / Logistics Fleet',
  },
  roleWarehouse: {
    mr: 'गोदाम / MRF सॉर्टिंग केंद्र',
    hi: 'वेयरहाउस / MRF सॉर्टिंग हब',
    en: 'Warehouse / MRF Hub',
  },
  roleRecycler: {
    mr: 'अधिकृत रिसायकलिंग प्लांट',
    hi: 'अधिकृत रीसाइक्लिंग प्लांट',
    en: 'Authorized Recycler',
  },
  roleRegulator: {
    mr: 'प्रशासक व नियामक अधिकारी',
    hi: 'प्रशासक व नियामक अधिकारी',
    en: 'Admin / Government (Regulator)',
  },
};

export function t(key: string, lang: Language): string {
  if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][lang]) {
    return UI_TRANSLATIONS[key][lang];
  }
  return UI_TRANSLATIONS[key]?.en || key;
}

export function getLocalizedMaterialName(name: string, nameMr?: string, nameHi?: string, lang: Language = 'en'): string {
  if (lang === 'mr' && nameMr) return nameMr;
  if (lang === 'hi' && nameHi) return nameHi;
  return name;
}
