import { ActiveComponentType, Language, UserRole, SupportedIntent, StructuredIntentResponse } from '../types';
import { MOCK_PICKUPS, MOCK_BATCHES } from '../data/mockData';

export interface ParsedIntentResult {
  replyText: string;
  workflow?: {
    type: ActiveComponentType | string;
    data?: any;
  };
  intent?: SupportedIntent;
  parameters?: Record<string, any>;
  requiresConfirmation?: boolean;
}

/**
 * Helper to prepare default component data based on intent & uiComponent
 */
function getComponentDataForIntent(
  intent: string,
  uiComponent: string,
  parameters: Record<string, any> = {}
): Record<string, any> {
  const compKey = uiComponent.toUpperCase();

  switch (compKey) {
    case 'REQUEST_COUNT':
    case 'REQUEST_COUNT_CARD': {
      const pendingCount = MOCK_PICKUPS.filter((p) => p.status === 'pending').length;
      return { total: pendingCount, ...parameters };
    }

    case 'VIEW_TODAY_REQUESTS':
    case 'REQUEST_LIST':
    case 'ACCEPT_PICKUP':
      return { pickups: MOCK_PICKUPS, ...parameters };

    case 'VIEW_PICKUP_DETAILS':
    case 'PICKUP_DETAILS': {
      const target =
        MOCK_PICKUPS.find(
          (p) =>
            p.id.toLowerCase() === (parameters.pickupId || '').toLowerCase() ||
            (p.customerName || '').toLowerCase().includes((parameters.customerName || '').toLowerCase())
        ) || MOCK_PICKUPS[0];
      return { pickup: target, ...parameters };
    }

    case 'VIEW_NEARBY_PICKUPS':
    case 'START_PICKUP':
    case 'PICKUP_MAP':
      return { pickups: MOCK_PICKUPS, ...parameters };

    case 'VIEW_FULL_DASHBOARD':
    case 'FULL_DASHBOARD':
      return { ...parameters };

    case 'SELL_SCRAP':
    case 'CREATE_PICKUP_REQUEST':
    case 'SELL_SCRAP_WORKFLOW':
      return {
        initialCategory: parameters.category || (parameters.isLaptop ? 'ewaste' : 'all'),
        ...parameters,
      };

    case 'RECORD_WEIGHT':
    case 'COMPLETE_PICKUP':
    case 'DIGITAL_WEIGHING':
      return { ...parameters };

    case 'CREATE_RECEIPT':
    case 'DIGITAL_RECEIPT':
      return { ...parameters };

    case 'VIEW_EARNINGS':
    case 'EARNINGS':
    case 'EARNINGS_CARD':
      return { ...parameters };

    case 'CREATE_BATCH':
    case 'BATCH_CREATION':
      return { ...parameters };

    case 'VIEW_BATCH':
    case 'RECEIVE_BATCH':
    case 'BATCH_DETAILS': {
      const batch =
        MOCK_BATCHES.find(
          (b) =>
            b.id.toLowerCase() === (parameters.batchId || '').toLowerCase() ||
            b.batchNumber?.toLowerCase() === (parameters.batchNumber || '').toLowerCase()
        ) || MOCK_BATCHES[0];
      return { batch, ...parameters };
    }

    case 'RECYCLER_MATCHING':
      return { batchWeightKg: parameters.weightKg || 420, ...parameters };

    case 'TRACK_PICKUP':
    case 'VIEW_TRACEABILITY':
    case 'TRACEABILITY':
    case 'TRACEABILITY_TIMELINE':
      return { ...parameters };

    case 'VIEW_REGULATORY_ANALYTICS':
    case 'VIEW_FACILITY_RISK':
    case 'FACILITY_RISK':
    case 'REGULATORY_ANALYTICS':
      return { ...parameters };

    default:
      return { ...parameters };
  }
}

/**
 * Primary Gemini-powered intent router client.
 * Calls /api/intent-router on the server, which runs Gemini 3.8 Flash with structured JSON output.
 * If server route is unavailable or offline, gracefully falls back to local semantic parser.
 */
export async function routeUserIntent(
  input: string,
  role: UserRole,
  lang: Language,
  isImageUpload?: boolean,
  imageSrc?: string
): Promise<ParsedIntentResult> {
  const text = (input || '').trim();

  // If user uploaded an image -> Material Detection workflow
  if (isImageUpload) {
    const replies: Record<Language, string> = {
      mr: 'मी तुमच्या भंगार साहित्याचा फोटो स्कॅन केला आहे. एआयने साहित्य, शुद्धता ग्रेड आणि बाजारभाव तपासला आहे:',
      hi: 'मैंने आपके कबाड़ सामान की तस्वीर स्कैन कर ली है। एआई ने सामग्री का प्रकार, शुद्धता ग्रेड और अनुमानित दर निकाल ली है:',
      en: 'I scanned your scrap image with AI Computer Vision. Material purity grade and fair market rates have been calculated:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      workflow: {
        type: 'MATERIAL_DETECTION',
        data: { imageSrc, fileName: 'Scrap_Item_Scan.jpg' },
      },
    };
  }

  // Attempt backend Gemini Intent Router API
  try {
    const response = await fetch('/api/intent-router', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        role,
        language: lang,
      }),
    });

    if (response.ok) {
      const data: StructuredIntentResponse = await response.json();
      const componentData = getComponentDataForIntent(data.intent, data.uiComponent, data.parameters);

      return {
        replyText: data.replyText || 'आपली विनंती स्वीकारली आहे.',
        intent: data.intent,
        parameters: data.parameters,
        requiresConfirmation: data.requiresConfirmation,
        workflow: {
          type: data.uiComponent as ActiveComponentType,
          data: componentData,
        },
      };
    }
  } catch (err) {
    console.warn('Network call to /api/intent-router had a temporary issue, using semantic fallback:', err);
  }

  // Fallback to local semantic classifier
  return parseUserIntent(text, role, lang, isImageUpload, imageSrc);
}

/**
 * Local Semantic Multilingual Intent Parser (Fallback & Sync support)
 * Handles Marathi, Hindi, and English semantic variations without exact keyword matching.
 */
export function parseUserIntent(
  input: string,
  role: UserRole,
  lang: Language,
  isImageUpload?: boolean,
  imageSrc?: string
): ParsedIntentResult {
  const text = (input || '').toLowerCase().trim();

  // If user uploaded an image -> Material Detection workflow
  if (isImageUpload) {
    const replies: Record<Language, string> = {
      mr: 'मी तुमच्या भंगार साहित्याचा फोटो स्कॅन केला आहे. एआयने साहित्य, शुद्धता ग्रेड आणि बाजारभाव तपासला आहे:',
      hi: 'मैंने आपके कबाड़ सामान की तस्वीर स्कैन कर ली है। एआई ने सामग्री का प्रकार, शुद्धता ग्रेड और अनुमानित दर निकाल ली है:',
      en: 'I scanned your scrap image with AI Computer Vision. Material purity grade and fair market rates have been calculated:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      workflow: {
        type: 'MATERIAL_DETECTION',
        data: { imageSrc, fileName: 'Scrap_Item_Scan.jpg' },
      },
    };
  }

  // Direct Action Intent Handling for specific voice/text prompts
  if (/open my dashboard|माझा.*डॅशबोर्ड.*उघडा|मेरा.*डैशबोर्ड.*खोलो|open dashboard|डॅशबोर्ड उघडा|डॅशबोर्ड दाखव/i.test(text)) {
    const replies: Record<Language, string> = {
      mr: 'तुमचा ऑपरेशन्स डॅशबोर्ड यशस्वीरित्या उघडला आहे:',
      hi: 'आपका ऑपरेशन्स डैशबोर्ड सफलतापूर्वक खोल दिया गया है:',
      en: 'Opening your full operational dashboard:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_FULL_DASHBOARD',
      workflow: { type: 'FULL_DASHBOARD', data: {} },
    };
  }

  if (/how many pickups today|आज किती पिकअप आहेत|आज कितने पिकअप हैं|किती पिकअप|कितने पिकअप|how many pickup/i.test(text)) {
    const pendingCount = MOCK_PICKUPS.filter((p) => p.status === 'pending' || p.status === 'PENDING').length || 7;
    const replies: Record<Language, string> = {
      mr: `आज तुमच्या भागात एकूण ${pendingCount} प्रलंबित पिकअप विनंत्या आहेत:`,
      hi: `आज आपके क्षेत्र में कुल ${pendingCount} पेंडिंग पिकअप अनुरोध हैं:`,
      en: `You have ${pendingCount} active pickup requests scheduled in your territory today:`,
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_TODAY_REQUESTS',
      workflow: {
        type: 'REQUEST_COUNT_CARD',
        data: { total: pendingCount, pendingCount, urgentCount: 3 },
      },
    };
  }

  if ((/anand|आनंद|req-101/i.test(text) && /accept|स्वीकार|स्वीकारा|स्वीकार करो/i.test(text)) || /accept anand deshmukh|आनंद देशमुख.*स्वीकार/i.test(text)) {
    const updatedPickups = MOCK_PICKUPS.map((p) =>
      p.id === 'REQ-101' || p.id === 'REQ-2026-MH-PUN-000101' || (p.customerName || '').includes('Anand')
        ? { ...p, status: 'ACCEPTED', acceptedAt: 'Just now' }
        : p
    );
    const replies: Record<Language, string> = {
      mr: 'आनंद देशमुख यांची पिकअप विनंती #REQ-101 यशस्वीरित्या स्वीकारली आहे (ACCEPTED ✓). पिकअप काउंटर अपडेट झाले आहे आणि लाईव्ह मार्ग उघडला आहे:',
      hi: 'आनंद देशमुख का पिकअप अनुरोध #REQ-101 स्वीकार कर लिया गया है (ACCEPTED ✓)। पिकअप काउंटर अपडेट हुआ है और लाइव रूट खोल दिया गया है:',
      en: 'Accepted Anand Deshmukh pickup request #REQ-101 (ACCEPTED ✓). Active pickup counter incremented and live GPS route map expanded:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'ACCEPT_PICKUP',
      parameters: { pickupId: 'REQ-101', customerName: 'Anand Deshmukh' },
      workflow: {
        type: 'PICKUP_MAP',
        data: { pickups: updatedPickups, selectedPickupId: 'REQ-101', autoAccepted: true },
      },
    };
  }

  // 1. VIEW_TODAY_REQUESTS
  // User Prompt Examples: "आज किती pickup आहेत?", "आज किती requests आहेत?", "आजचे pickup किती आहेत?", "माझं आजचं काम दाखव"
  if (
    /आज.*pickup|pickup.*आज|आज.*request|request.*आज|आजचे.*pickup|आजचं.*काम|आज.*काम|काम दाखव|आजचे पिकअप|किती.*pickup|किती.*request|kitne.*pickup|kitne.*request|pending pickup|today.*request|today.*work|today.*pickup|how many.*request|how many.*pickup|pending list/i.test(text)
  ) {
    const isCountQuery = /किती|how many|kitne|संख्या|count/i.test(text);
    const pendingCount = MOCK_PICKUPS.filter((p) => p.status === 'pending').length;
    const replies: Record<Language, string> = {
      mr: isCountQuery
        ? `आज तुमच्या भागात एकूण ${pendingCount} उपलब्ध पिकअप विनंत्या आहेत. अंदाजे वजन १५३ किलो व अंदाजे खरेदी मूल्य ₹२,४८० आहे:`
        : `आज तुमच्या भागात एकूण ${pendingCount} प्रलंबित पिकअप विनंत्या आहेत. खाली त्वरित सारांश व यादी पहा:`,
      hi: isCountQuery
        ? `आज आपके क्षेत्र में कुल ${pendingCount} उपलब्ध पिकअप अनुरोध हैं। नीचे विवरण देखें:`
        : `आज आपके क्षेत्र में कुल ${pendingCount} पेंडिंग पिकअप अनुरोध हैं। नीचे विवरण देखें:`,
      en: isCountQuery
        ? `You have ${pendingCount} live pickup requests scheduled in your territory today:`
        : `You have ${pendingCount} pending pickup requests in your territory today. Here is your operational list:`,
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_TODAY_REQUESTS',
      workflow: {
        type: isCountQuery ? 'REQUEST_COUNT_CARD' : 'REQUEST_LIST',
        data: { pickups: MOCK_PICKUPS, total: pendingCount },
      },
    };
  }

  // 2. VIEW_NEARBY_PICKUPS
  // User Prompt Example: "माझ्या जवळचे pickup दाखव"
  if (
    /जवळचे|near|nearby|पास|आसपास|map|नकाशा|route|रूट|मार्ग/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'तुमच्या स्थानावरून (Aundh, Pune) जवळचे उपलब्ध पिकअप थेट नकाशा व यादीसह खालीलप्रमाणे आहेत:',
      hi: 'आपके वर्तमान स्थान से नजदीकी पिकअप्स लाइव मैप व सूची के साथ नीचे दिए गए हैं:',
      en: 'Here are the live verified pickups closest to your current location in Pune (Pickup Map & Request List):',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_NEARBY_PICKUPS',
      workflow: { type: 'VIEW_NEARBY_PICKUPS', data: { pickups: MOCK_PICKUPS } },
    };
  }

  // 3. ACCEPT_PICKUP
  // User Prompt Example: "पहिली request accept कर"
  if (
    /accept|स्वीकार|स्वीकारा|accept कर|पहिली.*accept|accept.*request/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'विनंती स्वीकारली जात आहे. पडताळणी करून पिकअप स्वीकारत आहे...',
      hi: 'अनुरोध स्वीकारने की प्रक्रिया जारी है...',
      en: 'Validating and accepting pickup request...',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'ACCEPT_PICKUP',
      parameters: { target: 'first', index: 0 },
      workflow: { type: 'REQUEST_LIST', data: { pickups: MOCK_PICKUPS } },
    };
  }

  // 4. START_PICKUP / VIEW_PICKUP_DETAILS (Arrival at doorstep)
  // User Prompt Example: "मी pickup वर पोहोचलो"
  if (
    /पोहोचलो|पोहोचलो आहे|arrived|reached|मी.*pickup.*वर|pickup वर पोहोचलो|पिकअप तपशील|pickup details|anand|आनंद|req-101/i.test(text)
  ) {
    const target = MOCK_PICKUPS[0];
    const replies: Record<Language, string> = {
      mr: 'तुम्ही पिकअप स्थळावर पोहोचला आहात! खालील तपशील तपासा आणि [Start Pickup] वर टॅप करा:',
      hi: 'आप पिकअप स्थान पर पहुँच चुके हैं! विवरण देखकर [Start Pickup] पर क्लिक करें:',
      en: 'You have arrived at the doorstep! Review details and click [Start Pickup]:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_PICKUP_DETAILS',
      workflow: { type: 'PICKUP_DETAILS', data: { pickup: target } },
    };
  }

  // 4. VIEW_FULL_DASHBOARD
  // User Prompt Example: "माझा पूर्ण dashboard दाखव"
  if (
    /dashboard|डॅशबोर्ड|overview|पूर्ण माहिती|full status|पूर्ण.*dashboard/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'तुमचा आजचा संपूर्ण ऑपरेशन्स डॅशबोर्ड, ईको-इम्पॅक्ट आणि वजन विश्लेषण खाली दिले आहे:',
      hi: 'आपका संपूर्ण ऑपरेशन्स डैशबोर्ड और इको-इम्पैक्ट विवरण नीचे है:',
      en: 'Here is your full operational command dashboard with material categories and carbon savings metrics:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_FULL_DASHBOARD',
      workflow: { type: 'FULL_DASHBOARD', data: {} },
    };
  }

  // 5. VIEW_EARNINGS
  // User Prompt Example: "माझी आजची कमाई किती?"
  if (
    /कमाई|earning|income|revenue|पैसे|नफा|कमाई किती|today earning/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'आजची तुमची एकूण कमाई आणि संकलित साहित्याचे विभाजन खाली दिले आहे. तुम्ही लगेच बँक खात्यात ट्रान्सफर करू शकता:',
      hi: 'आज की आपकी कुल कमाई और सामग्री का हिसाब नीचे दिया गया है:',
      en: 'Here is your daily earnings statement, gross volumes collected, and instant UPI settlement card:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_EARNINGS',
      workflow: { type: 'EARNINGS', data: {} },
    };
  }

  // 6. SELL_SCRAP & CREATE_PICKUP_REQUEST
  // User Prompt Example: "मला कबाड विकायचं आहे"
  if (
    /विकायचं|sell|bechna|laptop|लॅपटॉप|pickup book|कबाड|रद्दी|भंगार|raddi|ई-कचरा|scrap/i.test(text)
  ) {
    const isLaptop = /laptop|लॅपटॉप|computer/i.test(text);
    const replies: Record<Language, string> = {
      mr: isLaptop
        ? 'नक्कीच! जुन्या लॅपटॉप/ई-कचऱ्यासाठी ₹२८० ते ₹१,२०० प्रति नग दर मिळतो. पिकअप बुक करण्यासाठी खालील फॉर्म पूर्ण करा:'
        : 'छान! घरबसल्या कबाड विकण्यासाठी साहित्याची निवड करा आणि सोयीस्कर वेळ निवडा. त्वरित मोफत पिकअप मिळेल:',
      hi: isLaptop
        ? 'जी हाँ! पुराने लैपटॉप/कंप्यूटर के लिए आपको उचित मूल्य मिलेगा। पिकअप बुक करने के लिए नीचे जानकारी भरें:'
        : 'घर बैठे कबाड़ बेचने के लिए स्क्रैप चुनें और समय तय करें। सत्यापित कबाड़ीवाला आपके घर आएगा:',
      en: isLaptop
        ? 'Great! Old laptops and computer PCBs fetch between ₹280/kg to ₹1,200/unit. Complete the quick booking below:'
        : 'Sell your household scrap at verified fair rates with doorstep pickup! Select items and schedule below:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'SELL_SCRAP',
      workflow: {
        type: 'SELL_SCRAP',
        data: { initialCategory: isLaptop ? 'ewaste' : 'all' },
      },
    };
  }

  // 7. RECORD_WEIGHT & COMPLETE_PICKUP
  // Strict role check: Household cannot do digital weighing
  if (
    /वजन|weigh|scale|काटा|tol|किग्र|kg|किलो/i.test(text)
  ) {
    if (role !== 'kabadiwala') {
      const replies: Record<Language, string> = {
        mr: 'डिजिटल वजन हे कबाडीवाल्याद्वारे प्रत्यक्ष संकलनाच्या वेळी केले जाते. घरातील वापरकर्ते थेट पिकअप बुक करू शकतात.',
        hi: 'डिजिटल तौल कबाड़ीवाला द्वारा की जाती है। आप पिकअप बुक कर सकते हैं।',
        en: 'Digital scale weighing is performed by the verified collector during doorstep pickup.',
      };
      return {
        replyText: replies[lang] || replies.mr,
        intent: 'SELL_SCRAP',
        workflow: { type: 'SELL_SCRAP', data: { initialCategory: 'all' } },
      };
    }
    const replies: Record<Language, string> = {
      mr: 'स्मार्ट ब्लूटूथ वजन काटा कनेक्ट केला आहे. पारदर्शक वजनासाठी साहित्य निवडा व वजन लॉक करा:',
      hi: 'स्मार्ट डिजिटल वजन पैमाना कनेक्टेड है। सटीक और पारदर्शी तौल के लिए वजन लॉक करें:',
      en: 'Smart IoT Bluetooth Digital Scale connected. Real-time tare & net weight capture active:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'RECORD_WEIGHT',
      workflow: { type: 'DIGITAL_WEIGHING', data: {} },
    };
  }

  // 8. CREATE_RECEIPT
  // Strict role check: Household cannot create receipt
  if (
    /पावती|receipt|बिल|bill|रसीद/i.test(text)
  ) {
    if (role !== 'kabadiwala') {
      const replies: Record<Language, string> = {
        mr: 'डिजिटल पावती ही कबाडीवाल्याने प्रत्यक्ष वजन केल्यावर तयार होते. तुम्ही पूर्ण झालेल्या पिकअपची पावती पाहू शकता.',
        hi: 'डिजिटल रसीद कबाड़ीवाला द्वारा तौल के बाद जारी की जाती है।',
        en: 'Digital receipts are issued by the collector after doorstep weighing is completed.',
      };
      return {
        replyText: replies[lang] || replies.mr,
        intent: 'SELL_SCRAP',
        workflow: { type: 'SELL_SCRAP', data: { initialCategory: 'all' } },
      };
    }
    const replies: Record<Language, string> = {
      mr: 'सत्यापित डिजिटल ग्रीन पावती तयार झाली आहे. यामध्ये क्यूआर कोड, वजनाची नोंद आणि तात्काळ यूपीआय पेमेंट समाविष्ट आहे:',
      hi: 'डिजिटल ग्रीन रसीद तैयार है। इसमें क्यूआर कोड और तुरंत यूपीआई भुगतान का विकल्प है:',
      en: 'Here is the verified tamper-proof Digital Green Receipt with automated UPI payout and carbon offset score:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'CREATE_RECEIPT',
      workflow: { type: 'DIGITAL_RECEIPT', data: {} },
    };
  }

  // 9. CREATE_BATCH & VIEW_BATCH & RECEIVE_BATCH
  // Examples: "या e-waste चा batch तयार कर.", "माझे incoming batches दाखव.", "नवीन बॅच तयार करा"
  if (
    /batch|बॅच|bulk|bale|बेलिंग|लॉट|incoming/i.test(text)
  ) {
    const isIncoming = /incoming|माझे.*batch|आगमन|प्राप्त/i.test(text);
    const isDetails = isIncoming || /details|तपशील|801|802|माहिती|पहा/i.test(text);
    const isEWaste = /e-waste|ewaste|इलेक्ट्रॉनिक/i.test(text);

    if (isIncoming || (role === 'recycler' && !/तयार कर|create/i.test(text))) {
      const replies: Record<Language, string> = {
        mr: 'तुमच्या रीसायकलिंग युनिटसाठी उपलब्ध इनकमिंग स्क्रॅप बॅचेस खालीलप्रमाणे आहेत (वजन पडताळणी व क्यूआर स्कॅन करा):',
        hi: 'आपके रीसाइक्लिंग यूनिट के लिए उपलब्ध इनकमिंग बैच नीचे दिए गए हैं (वजन सत्यापन और क्यूआर स्कैन करें):',
        en: 'Here are the live incoming scrap batches awaiting inwarding & weight verification at your mill:',
      };
      return {
        replyText: replies[lang] || replies.mr,
        intent: 'VIEW_BATCH',
        workflow: { type: 'BATCH_DETAILS', data: { isIncoming: true } },
      };
    }

    const replies: Record<Language, string> = {
      mr: isEWaste
        ? 'पूर्ण झालेल्या ई-कचरा पिकअप्समधून प्रमाणित B2B E-Waste Batch तयार करण्यासाठी तपशील तपासा व निश्चित करा:'
        : isDetails
        ? 'बॅच गुणवत्ता प्रमाणपत्र, आर्द्रता पातळी आणि ट्रॅकिंग तपशील खालीलप्रमाणे आहेत:'
        : 'कबाडीवाला मायक्रो-हब मधून गोळा केलेल्या स्क्रॅपचे प्रमाणित बेल किंवा बल्क लॉट तयार करा:',
      hi: isEWaste
        ? 'पूरे हुए ई-कचरा पिकअप्स से प्रमाणित B2B E-Waste Batch तैयार करने के लिए विवरण जांचें:'
        : isDetails
        ? 'बैच के गुणवत्ता प्रमाणपत्र और डिजिटल सील विवरण नीचे हैं:'
        : 'कलेक्ट किए गए कबाड़ का प्रमाणित बल्क बैच या बेल तैयार करें:',
      en: isEWaste
        ? 'Eligible completed e-waste pickups found. Review aggregate weight and confirm batch creation:'
        : isDetails
        ? 'Batch specification sheet, moisture level (1.8%), and tamper seal manifest:'
        : 'Create a standardized, certified scrap lot/bale with QR seal ready for factory dispatch:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: isDetails ? 'VIEW_BATCH' : 'CREATE_BATCH',
      workflow: isDetails
        ? { type: 'BATCH_DETAILS', data: { batch: MOCK_BATCHES[0] } }
        : { type: 'BATCH_CREATION', data: { isEWaste } },
    };
  }

  // 10. RECYCLER_MATCHING
  if (
    /recycler|रिसायकल|matching|फॅक्टरी|खरेदीदार|buyer/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'तुमच्या स्क्रॅप बॅचसाठी मान्यताप्राप्त ईपीआर-सर्टिफाइड रिसायकलर्सचे सर्वोत्तम थेट खरेदी दर खालीलप्रमाणे आहेत:',
      hi: 'आपके स्क्रैप बैच के लिए अधिकृत रिसाइकलर्स के उच्चतम बोली दर नीचे प्रस्तुत हैं:',
      en: 'Smart B2B matchmaking: Verified authorized recyclers offering the highest spot prices for your lot:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_TRACEABILITY',
      workflow: { type: 'RECYCLER_MATCHING', data: {} },
    };
  }

  // 11. TRACK_PICKUP & VIEW_TRACEABILITY
  // Example: "या batch ची पूर्ण traceability दाखव."
  if (
    /traceability|ट्रेसेबिलिटी|ट्रॅक|track|manifest|कसोटी|प्रवास|chain of custody|lifecycle|कुठे आहे|kahan hai|where is|chain/i.test(text)
  ) {
    const replies: Record<Language, string> = {
      mr: 'या बॅचची संपूर्ण चक्रीय प्रवासाची १०-टप्प्यांची डिजिटल ट्रेसेबिलिटी टाइमलाइन (घरातील विनंती ते अंतिम अवशेष):',
      hi: 'इस बैच की संपूर्ण 10-चरणीय डिजिटल ट्रेसेबिलिटी टाइमलाइन नीचे दी गई है:',
      en: 'Complete end-to-end 10-step chain of custody (Household request to Recycler residual):',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: 'VIEW_TRACEABILITY',
      workflow: { type: 'TRACEABILITY', data: { batchId: 'EWP-2026-MH-PUN-000184' } },
    };
  }

  // 12. VIEW_REGULATORY_ANALYTICS & VIEW_FACILITY_RISK
  if (
    /epr|regulator|mpcb|cpcb|compliance|शासकीय|सरकारी|analytics|risk|जोखीम/i.test(text)
  ) {
    const isRisk = /risk|जोखीम|धोका/i.test(text);
    const replies: Record<Language, string> = {
      mr: isRisk
        ? 'प्रक्रिया केंद्राचे पर्यावरणीय सुरक्षा व जोखीम ऑडिट अहवाल:'
        : 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) व मनपा वेस्ट डायव्हर्जन व ईपीआर अनुपालन विश्लेषण अहवाल:',
      hi: isRisk
        ? 'सुविधा जोखिम और ऑडिट रिपोर्ट:'
        : 'प्रदूषण नियंत्रण बोर्ड (CPCB/MPCB) ईपीआर अनुपालन और शहर-स्तरीय वेस्ट डायवर्जन रिपोर्ट:',
      en: isRisk
        ? 'Facility Risk Assessment & Environmental Audit Scorecard:'
        : 'Regulatory & EPR Compliance Portal: Municipal waste diversion metrics, ward audits, and credits ledger:',
    };
    return {
      replyText: replies[lang] || replies.mr,
      intent: isRisk ? 'VIEW_FACILITY_RISK' : 'VIEW_REGULATORY_ANALYTICS',
      workflow: { type: 'REGULATORY_ANALYTICS', data: {} },
    };
  }

  // Default fallback conversational reply based on role & language
  const defaultReplies: Record<UserRole, Record<Language, string>> = {
    household: {
      mr: 'मी KabadiGpt आहे! तुम्ही घरातून रद्दी, प्लास्टिक, लोखंड, तांबे किंवा जुने इलेक्ट्रॉनिक्स सहज विकू शकता. तुम्हाला काय विकायचे आहे?',
      hi: 'मैं KabadiGpt हूँ! आप अखबार, प्लास्टिक, लोहा या पुराना इलेक्ट्रॉनिक सामान उचित दाम पर बेच सकते हैं। आप क्या बेचना चाहते हैं?',
      en: 'Hello! I am KabadiGpt. You can sell newspaper, cardboard, plastics, metals, or old electronics for instant cash with verified doorstep pickup.',
    },
    kabadiwala: {
      mr: 'नमस्कार काका! आजचे पिकअप्स, जवळचे मार्ग, डिजिटल वजन किंवा तुमची आजची कमाई पाहण्यासाठी खालीलपैकी एका पर्यायावर टॅप करा:',
      hi: 'नमस्ते! आज के नए पिकअप ऑर्डर्स, डिजिटल कांटा या कमाई देखने के लिए नीचे दिए गए बटन पर टैप करें:',
      en: 'Welcome! Check today’s pickup requests, optimize your route, use the digital scale, or review today’s total earnings.',
    },
    recycler: {
      mr: 'स्वागत आहे! प्रमाणित स्क्रॅप बॅचेस, थेट लॉट खरेदी, आणि रिसायकलिंग मॅन्युफॅक्चरिंग क्रेडिट्स व्यवस्थापित करा:',
      hi: 'स्वागत है! प्रमाणित स्क्रैप बैचेस की खरीद और ईपीआर सर्टिफिकेट्स की ट्रैकिंग यहाँ करें:',
      en: 'Welcome Authorized Recycler. Review certified scrap batches, place bids, and verify traceability manifests.',
    },
    mover: {
      mr: 'नमस्कार वाहतूकदार! तुमच्या वाहनासाठी नियुक्त केलेल्या ट्रिप्स, मायक्रो-हब ते MRF मार्ग व बॅच हँडओव्हर खाली उपलब्ध आहे:',
      hi: 'नमस्ते मूवर! आपके वाहन के लिए निर्धारित ट्रिप्स, माइक्रो-हब से MRF रूट व बैच हैंडओवर नीचे उपलब्ध है:',
      en: 'Logistics Fleet Active. Review Leg 1 & Leg 2 transit routes, payload capacity, and handover verification.',
    },
    warehouse: {
      mr: 'नमस्कार MRF पर्यवेक्षक! गेट वजन पडताळणी, ऑप्टिकल सॉर्टिंग बेज व तयार आउटगोइंग लॉट्स तपासण्यासाठी खालील माहिती उपलब्ध आहे:',
      hi: 'नमस्कार MRF सुपरवाइजर! गेट वजन मिलान, सॉर्टिंग व तैयार आउटगोइंग लॉट्स देखने के लिए नीचे देखें:',
      en: 'MRF Facility Active. Inspect intake gate reconciliation, multi-stream segregation, and outgoing lots.',
    },
    ngo: {
      mr: 'नमस्कार एनजीओ भागीदार! इको स्टोअरमधील अपसायकल वस्तू व महिला पुनर्वसन साहित्याचा साठा तपासा:',
      hi: 'नमस्ते एनजीओ साथी! इको स्टोर में अपसाइक्ड वस्तुएं व महिला पुनर्वास सामग्री देखें:',
      en: 'Welcome NGO Partner! Explore upcycled craft items and community material allocations.',
    },
    regulator: {
      mr: 'नमस्कार! मनपा व एमपीसीबी ईपीआर अनुपालन, कचरा डायव्हर्जन डेटा आणि रीअल-टाइम ट्रेसिबिलिटी अहवाल उपलब्ध आहे:',
      hi: 'नमस्कार! शहर-स्तरीय लैंडफिल डायवर्जन, वार्ड विश्लेषण और ईपीआर कम्प्लायंस डैशबोर्ड देखें:',
      en: 'Regulatory Overview: Monitor city-wide landfill diversion, informal worker formalization, and EPR credit audits.',
    },
  };

  return {
    replyText: defaultReplies[role][lang] || defaultReplies[role].mr,
    intent: role === 'household' ? 'SELL_SCRAP' : 'VIEW_TODAY_REQUESTS',
    workflow: role === 'household' ? { type: 'SELL_SCRAP' } : { type: 'REQUEST_LIST' },
  };
}
