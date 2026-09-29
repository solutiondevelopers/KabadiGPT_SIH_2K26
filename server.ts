import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Supported intents exactly matching system requirements
export const SUPPORTED_INTENTS = [
  'VIEW_TODAY_REQUESTS',
  'VIEW_NEARBY_PICKUPS',
  'VIEW_PICKUP_DETAILS',
  'VIEW_FULL_DASHBOARD',
  'ACCEPT_PICKUP',
  'START_PICKUP',
  'RECORD_WEIGHT',
  'COMPLETE_PICKUP',
  'CREATE_RECEIPT',
  'VIEW_EARNINGS',
  'SELL_SCRAP',
  'CREATE_PICKUP_REQUEST',
  'TRACK_PICKUP',
  'CREATE_BATCH',
  'VIEW_BATCH',
  'RECEIVE_BATCH',
  'VIEW_TRACEABILITY',
  'VIEW_REGULATORY_ANALYTICS',
  'VIEW_FACILITY_RISK',
] as const;

export type SupportedIntent = typeof SUPPORTED_INTENTS[number];

// Mapping intents to DynamicWorkspace UI components
export const INTENT_UI_MAP: Record<SupportedIntent, string> = {
  VIEW_TODAY_REQUESTS: 'REQUEST_LIST',
  VIEW_NEARBY_PICKUPS: 'PICKUP_MAP',
  VIEW_PICKUP_DETAILS: 'PICKUP_DETAILS',
  VIEW_FULL_DASHBOARD: 'FULL_DASHBOARD',
  ACCEPT_PICKUP: 'REQUEST_LIST',
  START_PICKUP: 'PICKUP_MAP',
  RECORD_WEIGHT: 'DIGITAL_WEIGHING',
  COMPLETE_PICKUP: 'DIGITAL_WEIGHING',
  CREATE_RECEIPT: 'DIGITAL_RECEIPT',
  VIEW_EARNINGS: 'EARNINGS',
  SELL_SCRAP: 'SELL_SCRAP',
  CREATE_PICKUP_REQUEST: 'SELL_SCRAP',
  TRACK_PICKUP: 'TRACEABILITY',
  CREATE_BATCH: 'BATCH_CREATION',
  VIEW_BATCH: 'BATCH_DETAILS',
  RECEIVE_BATCH: 'BATCH_DETAILS',
  VIEW_TRACEABILITY: 'TRACEABILITY',
  VIEW_REGULATORY_ANALYTICS: 'REGULATORY_ANALYTICS',
  VIEW_FACILITY_RISK: 'REGULATORY_ANALYTICS',
};

// Semantic fallback for multilingual classification (Marathi, Hindi, English)
function semanticFallbackClassification(text: string, role?: string, lang?: string): {
  intent: SupportedIntent;
  parameters: Record<string, any>;
  requiresConfirmation: boolean;
  uiComponent: string;
  replyText: string;
} {
  const t = (text || '').toLowerCase().trim();
  const currentLang = lang || 'mr';

  // 1. VIEW_TODAY_REQUESTS & REQUEST_COUNT_CARD
  // Examples: "आज किती pickup आहेत?", "आज किती requests आहेत?", "आजचे pickup किती आहेत?", "माझं आजचं काम दाखव"
  if (
    /आज.*pickup|pickup.*आज|आज.*request|request.*आज|आजचे.*pickup|आजचं.*काम|आज.*काम|काम दाखव|आजचे पिकअप|किती.*pickup|किती.*request|kitne.*pickup|kitne.*request|pending pickup|today.*request|today.*work|today.*pickup|how many.*request|how many.*pickup|pending list/i.test(t)
  ) {
    const isCountQuery = /किती|how many|kitne|संख्या|count/i.test(t);
    const replies: Record<string, string> = {
      mr: isCountQuery
        ? 'आजच्या उपलब्ध पिकअप विनंत्या आणि अंदाजे कमाई सारांश खाली दिला आहे:'
        : 'आजच्या प्रलंबित पिकअप विनंत्या खालीलप्रमाणे आहेत:',
      hi: isCountQuery
        ? 'आज के उपलब्ध पिकअप अनुरोध और अनुमानित कमाई का सारांश नीचे है:'
        : 'आज के पेंडिंग पिकअप अनुरोध नीचे दिए गए हैं:',
      en: isCountQuery
        ? "Here is today's pickup count, pending volume, and estimated buy value:"
        : 'Here are your pending pickup requests for today:',
    };
    return {
      intent: 'VIEW_TODAY_REQUESTS',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: isCountQuery ? 'REQUEST_COUNT_CARD' : 'REQUEST_LIST',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 2. VIEW_NEARBY_PICKUPS
  // Example: "माझ्या जवळचे pickup दाखव", "Show pickups near me"
  if (
    /जवळचे|near|nearby|पास|आसपास|map|नकाशा|route|रूट|मार्ग/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'तुमच्या स्थानाजवळचे उपलब्ध पिकअप्स थेट नकाशा व यादीसह खालीलप्रमाणे आहेत:',
      hi: 'आपके नजदीकी पिकअप्स लाइव मैप व सूची के साथ नीचे दिए गए हैं:',
      en: 'Here are the pickup requests nearest to your current location (Route Map & Request List):',
    };
    return {
      intent: 'VIEW_NEARBY_PICKUPS',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'VIEW_NEARBY_PICKUPS',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 3. ACCEPT_PICKUP
  // Example: "पहिली request accept कर", "request accept कर", "स्वीकार कर"
  if (
    /accept|स्वीकार|स्वीकारा|accept कर|पहिली.*accept|accept.*request/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'विनंती स्वीकारण्याची प्रक्रिया सुरू आहे. पडताळणी करून पिकअप स्वीकारत आहे...',
      hi: 'अनुरोध स्वीकारने की प्रक्रिया जारी है...',
      en: 'Validating and accepting pickup request...',
    };
    return {
      intent: 'ACCEPT_PICKUP',
      parameters: { target: 'first', index: 0 },
      requiresConfirmation: false,
      uiComponent: 'REQUEST_LIST',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 4. START_PICKUP / VIEW_PICKUP_DETAILS
  // Example: "मी pickup वर पोहोचलो", "मी पोहोचलो", "arrived at pickup", "reached pickup"
  if (
    /पोहोचलो|पोहोचलो आहे|arrived|reached|मी.*pickup.*वर|pickup वर पोहोचलो|पिकअप तपशील|pickup details/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'तुम्ही पिकअप स्थळावर पोहोचला आहात! खालील तपशील तपासा आणि [Start Pickup] वर टॅप करा:',
      hi: 'आप पिकअप स्थान पर पहुँच चुके हैं! विवरण देखकर [Start Pickup] पर क्लिक करें:',
      en: 'You have arrived at the doorstep! Review details and click [Start Pickup]:',
    };
    return {
      intent: 'VIEW_PICKUP_DETAILS',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'PICKUP_DETAILS',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 5. VIEW_EARNINGS
  // Example: "माझी आजची कमाई किती?"
  if (
    /कमाई|earning|income|revenue|पैसे|रुपये|किती.*मिळाले|faida|munafa|daily payout|कमाई किती/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'तुमचा आजचा एकूण जमा, नफा आणि डिजिटल युपीआय सेटलमेंट सारांश खालीलप्रमाणे आहे:',
      hi: 'आपकी आज की कुल कमाई और डिजिटल हिसाब नीचे दिया गया है:',
      en: 'Here is your daily earnings statement and instant UPI payout summary:',
    };
    return {
      intent: 'VIEW_EARNINGS',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'EARNINGS',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 6. SELL_SCRAP
  // Example: "मला कबाड विकायचं आहे", "माझ्याकडे जुना laptop आहे"
  if (
    /विकायचं|bechna|sell|scrap.*sell|कबाड|रद्दी|भंगार|जुना.*लॅपटॉप|laptop|computer|घरातून कबाड|sell scrap/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'घरोघरी स्क्रॅप पिकअपसाठी साहित्याची निवड करा आणि सोयीस्कर वेळ निश्चित करा:',
      hi: 'घर बैठे कबाड़ बेचने के लिए सामग्री चुनें और पिकअप का समय तय करें:',
      en: 'Schedule your doorstep scrap pickup with verified rates and transparent weighing:',
    };
    return {
      intent: 'SELL_SCRAP',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'SELL_SCRAP',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 7. VIEW_FULL_DASHBOARD
  // Example: "माझा पूर्ण dashboard दाखव"
  if (
    /dashboard|डॅशबोर्ड|पूर्ण.*dashboard|full dashboard|overview|संपूर्ण|आढावा/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'संपूर्ण ऑपरेशन्स डॅशबोर्ड, वजन सारांश आणि ईको-इम्पॅक्ट विश्लेषण खाली दिले आहे:',
      hi: 'संपूर्ण ऑपरेशन्स डैशबोर्ड और पर्यावरण प्रभाव रिपोर्ट नीचे दी गई है:',
      en: 'Here is your full operational command dashboard and circular impact scorecard:',
    };
    return {
      intent: 'VIEW_FULL_DASHBOARD',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'FULL_DASHBOARD',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 8. RECORD_WEIGHT & COMPLETE_PICKUP
  // Supports voice input e.g. "5 किलो e-waste", "3 किलो copper", "12 kilo paper"
  if (
    /वजन|weight|scale|weighing|काटा|तारा|किग्र|kg|किलो|kilo/i.test(t)
  ) {
    if (role === 'household') {
      const replies: Record<string, string> = {
        mr: 'डिजिटल वजन हे कबाडीवाल्याद्वारे प्रत्यक्ष पिकअपच्या वेळी केले जाते. घरातील वापरकर्ते अंदाजित वजन नोंदवून पिकअप बुक करू शकतात.',
        hi: 'डिजिटल तौल कबाड़ीवाला द्वारा की जाती है। आप पिकअप बुक कर सकते हैं।',
        en: 'Digital weighing is performed by the verified collector at doorstep. You can book a pickup request.',
      };
      return {
        intent: 'SELL_SCRAP',
        parameters: {},
        requiresConfirmation: false,
        uiComponent: 'SELL_SCRAP',
        replyText: replies[currentLang] || replies.mr,
      };
    }

    // Extract material and weight parameters if present
    const weightMatch = t.match(/(\d+(\.\d+)?)/);
    const weightVal = weightMatch ? parseFloat(weightMatch[1]) : 5.0;
    let detectedMaterial = 'Scrap';
    if (/copper|तांबे|तांबा/i.test(t)) detectedMaterial = 'Copper';
    else if (/e-waste|ewaste|tv|laptop|इलेक्ट्रॉनिक/i.test(t)) detectedMaterial = 'E-Waste';
    else if (/paper|रद्दी|कागद|अखबार/i.test(t)) detectedMaterial = 'Paper';
    else if (/aluminium|aluminum|अ‍ॅल्युमिनियम/i.test(t)) detectedMaterial = 'Aluminium';
    else if (/metal|iron|लोखंड|लोहा/i.test(t)) detectedMaterial = 'Metal';
    else if (/plastic|प्लॅस्टिक|प्लास्टिक/i.test(t)) detectedMaterial = 'Plastic';

    const replies: Record<string, string> = {
      mr: `स्मार्ट ब्लूटूथ वजन काटा स्क्रीन सक्रिय झाली आहे. (${weightVal} किलो ${detectedMaterial}):`,
      hi: `स्मार्ट ब्लूटूथ डिजिटल कांटा सक्रिय है (${weightVal} किलो ${detectedMaterial}):`,
      en: `Smart Bluetooth digital scale connected. Recording ${weightVal} kg of ${detectedMaterial}:`,
    };
    return {
      intent: 'RECORD_WEIGHT',
      parameters: { weight: weightVal, material: detectedMaterial },
      requiresConfirmation: false,
      uiComponent: 'DIGITAL_WEIGHING',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 9. CREATE_RECEIPT
  // Example: "Digital receipt तयार करू?", "पावती बनवा", "पावती दाखवा"
  if (
    /पावती|receipt|बिल|bill|रसीद|invoice/i.test(t)
  ) {
    if (role === 'household') {
      const replies: Record<string, string> = {
        mr: 'डिजिटल पावती कबाडीवाल्याने प्रत्यक्ष वजन पूर्ण केल्यावर तयार होते. तुम्ही पूर्ण झालेल्या पिकअपची पावती पाहू शकता.',
        hi: 'डिजिटल रसीद कबाड़ीवाला द्वारा तौल के बाद जारी की जाती है।',
        en: 'The digital receipt is generated by the collector after digital weighing at doorstep.',
      };
      return {
        intent: 'SELL_SCRAP',
        parameters: {},
        requiresConfirmation: false,
        uiComponent: 'SELL_SCRAP',
        replyText: replies[currentLang] || replies.mr,
      };
    }

    const replies: Record<string, string> = {
      mr: 'सत्यापित डिजिटल ग्रीन पावती आणि यूपीआय पेमेंट सेटलमेंट स्क्रीन तयार आहे:',
      hi: 'डिजिटल ग्रीन रसीद और यूपीआई भुगतान स्क्रीन तैयार है:',
      en: 'Verified digital green receipt and automated UPI settlement voucher ready:',
    };
    return {
      intent: 'CREATE_RECEIPT',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'DIGITAL_RECEIPT',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 10. CREATE_BATCH & VIEW_BATCH & RECEIVE_BATCH
  // Examples: "या e-waste चा batch तयार कर.", "माझे incoming batches दाखव.", "नवीन बॅच तयार करा"
  if (
    /बॅच|batch|bale|गाठ|लॉट|lot|dispatch|incoming/i.test(t)
  ) {
    const isIncoming = /incoming|माझे.*batch|आगमन|प्राप्त/i.test(t);
    const isDetails = isIncoming || /details|तपशील|801|802|माहिती|पहा/i.test(t);
    const isEWaste = /e-waste|ewaste|इलेक्ट्रॉनिक/i.test(t);

    if (isIncoming || (role === 'recycler' && !/तयार कर|create/i.test(t))) {
      const replies: Record<string, string> = {
        mr: 'तुमच्या रीसायकलिंग युनिटसाठी उपलब्ध इनकमिंग स्क्रॅप बॅचेस खालीलप्रमाणे आहेत (वजन पडताळणी व क्यूआर स्कॅन करा):',
        hi: 'आपके रीसाइक्लिंग यूनिट के लिए उपलब्ध इनकमिंग बैच नीचे दिए गए हैं (वजन सत्यापन और क्यूआर स्कैन करें):',
        en: 'Here are the live incoming scrap batches awaiting inwarding & weight verification at your mill:',
      };
      return {
        intent: 'VIEW_BATCH',
        parameters: { isIncoming: true },
        requiresConfirmation: false,
        uiComponent: 'BATCH_DETAILS',
        replyText: replies[currentLang] || replies.mr,
      };
    }

    const replies: Record<string, string> = {
      mr: isEWaste
        ? 'पूर्ण झालेल्या ई-कचरा पिकअप्समधून प्रमाणित B2B E-Waste Batch तयार करण्यासाठी तपशील तपासा व निश्चित करा:'
        : 'नवीन प्रमाणित स्क्रॅप बेल बॅच तयार करा:',
      hi: isEWaste
        ? 'पूरे हुए ई-कचरा पिकअप्स से प्रमाणित B2B E-Waste Batch तैयार करने के लिए विवरण जांचें:'
        : 'नया प्रमाणित स्क्रैप बैच बनाएँ:',
      en: isEWaste
        ? 'Eligible completed e-waste pickups found. Review aggregate weight and confirm batch creation:'
        : 'Create a standardized scrap bale / consignment batch:',
    };

    return {
      intent: isDetails ? 'VIEW_BATCH' : 'CREATE_BATCH',
      parameters: { material: isEWaste ? 'e-waste' : 'all' },
      requiresConfirmation: false,
      uiComponent: isDetails ? 'BATCH_DETAILS' : 'BATCH_CREATION',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 11. VIEW_TRACEABILITY & TRACK_PICKUP
  // Example: "या batch ची पूर्ण traceability दाखव.", "ट्रेसेबिलिटी साखळी दाखवा"
  if (
    /traceability|ट्रेसेबिलिटी|ट्रॅक|track|manifest|कसोटी|साखळी|कुठे आहे|kahan hai|where is|chain/i.test(t)
  ) {
    const replies: Record<string, string> = {
      mr: 'या बॅचची संपूर्ण चक्रीय प्रवासाची १०-टप्प्यांची डिजिटल ट्रेसेबिलिटी टाइमलाइन (घरातील विनंती ते अंतिम अवशेष):',
      hi: 'इस बैच की संपूर्ण 10-चरणीय डिजिटल ट्रेसेबिलिटी टाइमलाइन नीचे दी गई है:',
      en: 'Complete end-to-end 10-step chain of custody (Household request to Recycler residual):',
    };
    return {
      intent: 'VIEW_TRACEABILITY',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'TRACEABILITY',
      replyText: replies[currentLang] || replies.mr,
    };
  }

  // 10. VIEW_REGULATORY_ANALYTICS & VIEW_FACILITY_RISK
  if (
    /regulatory|analytics|mpcb|cpcb|नियमन|शासकीय|compliance|landfill|लँडफिल|risk|जोखीम/i.test(t)
  ) {
    const isRisk = /risk|जोखीम|धोका|hazard/i.test(t);
    return {
      intent: isRisk ? 'VIEW_FACILITY_RISK' : 'VIEW_REGULATORY_ANALYTICS',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'REGULATORY_ANALYTICS',
      replyText: isRisk
        ? 'रीसायकलर प्रक्रिया केंद्राचे पर्यावरणीय जोखीम व ऑडिट विश्लेषण:'
        : 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) व मनपा ईपीआर अनुपालन विश्लेषण अहवाल:',
    };
  }

  // Default fallback depending on role
  if (role === 'household') {
    return {
      intent: 'SELL_SCRAP',
      parameters: {},
      requiresConfirmation: false,
      uiComponent: 'SELL_SCRAP',
      replyText: currentLang === 'mr'
        ? 'कबाड विक्रीसाठी साहित्याची निवड करा आणि घरपोच मोफत पिकअप बुक करा:'
        : 'कबाड़ बेचने के लिए सामग्री का चयन करें:',
    };
  }

  return {
    intent: 'VIEW_TODAY_REQUESTS',
    parameters: {},
    requiresConfirmation: false,
    uiComponent: 'REQUEST_LIST',
    replyText: currentLang === 'mr'
      ? 'आजच्या पिकअप विनंत्या आणि कार्यसूची खालीलप्रमाणे आहे:'
      : 'आज के पिकअप अनुरोध और कार्यसूची नीचे उपलब्ध है:',
  };
}

// Intent Router API endpoint with Gemini Semantic Classification
app.post('/api/intent-router', async (req: Request, res: Response) => {
  const { message, role, language } = req.body;
  const userText = (message || '').trim();
  const currentLang = language || 'mr';
  const userRole = role || 'kabadiwala';

  if (!userText) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  // Check for API key at invocation time to pick up dynamic or runtime env vars
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are the primary Semantic Intent Router for KabadiGPT — a digital waste management, circular economy, and doorstep scrap collection platform.
Your job is to classify the user's natural-language request into EXACTLY ONE of the supported structured intents.

SUPPORTED INTENTS:
1. VIEW_TODAY_REQUESTS (e.g., "आज किती requests आहेत?", "आज किती pickup आहेत?", "आजचे pickup किती आहेत?", "माझं आजचं काम दाखव", "Show today requests")
2. VIEW_NEARBY_PICKUPS (e.g., "माझ्या जवळचे pickup दाखव", "Show pickups near me", "Show route map")
3. VIEW_PICKUP_DETAILS (e.g., "मी pickup वर पोहोचलो", "पिकअप तपशील दाखव", "Show details of customer Anand", "REQ-101")
4. VIEW_FULL_DASHBOARD (e.g., "माझा पूर्ण dashboard दाखव", "Show my full dashboard")
5. ACCEPT_PICKUP (e.g., "पहिली request accept कर", "मी हे काम स्वीकारतो", "Accept pickup")
6. START_PICKUP (e.g., "मी pickup वर पोहोचलो", "पिकअप सुरू करा", "Start pickup")
7. RECORD_WEIGHT (e.g., "5 किलो e-waste", "3 किलो copper", "12 kilo paper", "कचरा वजन करा", "Open scale")
8. COMPLETE_PICKUP (e.g., "पिकअप पूर्ण करा", "Mark pickup complete")
9. CREATE_RECEIPT (e.g., "Digital receipt तयार करू?", "हो पावती बनवा", "पावती दाखवा", "Generate digital receipt")
10. VIEW_EARNINGS (e.g., "माझी आजची कमाई किती?", "आजचे पैसे किती?", "Show earnings")
11. SELL_SCRAP (e.g., "मला कबाड विकायचं आहे", "घरबसल्या रद्दी विकायची आहे", "I want to sell scrap")
12. CREATE_PICKUP_REQUEST (e.g., "नवीन पिकअप बुक करा", "Create pickup request")
13. TRACK_PICKUP (e.g., "माझा पिकअप कुठे आहे?", "Track pickup status")
14. CREATE_BATCH (e.g., "नवीन बॅच तयार करा", "Create scrap bale batch")
15. VIEW_BATCH (e.g., "बॅच तपशील दाखवा", "View batch PUN-BAL-801")
16. RECEIVE_BATCH (e.g., "बॅच प्राप्त झाली", "Acknowledge batch delivery")
17. VIEW_TRACEABILITY (e.g., "ट्रेसेबिलिटी साखळी दाखवा", "Inspect traceability manifest")
18. VIEW_REGULATORY_ANALYTICS (e.g., "नियामक विश्लेषण दाखव", "Show MPCB landfill diversion report")
19. VIEW_FACILITY_RISK (e.g., "फॅसिलिटी रिस्क ऑडिट", "Inspect recycler facility risk and EPR credits")

CRITICAL RULES:
- Understand Marathi (मराठी), Hindi (हिंदी), and English with high semantic accuracy.
- DO NOT rely on exact phrase matching. Understand semantic intent.
- Map the intent to the corresponding uiComponent:
  VIEW_TODAY_REQUESTS -> If asking for request count/stats ("आज किती pickup आहेत?"), use "REQUEST_COUNT_CARD", otherwise "REQUEST_LIST"
  VIEW_NEARBY_PICKUPS -> "VIEW_NEARBY_PICKUPS" (renders both PickupMap and RequestList)
  VIEW_PICKUP_DETAILS -> "PICKUP_DETAILS"
  VIEW_FULL_DASHBOARD -> "FULL_DASHBOARD"
  ACCEPT_PICKUP -> "REQUEST_LIST"
  START_PICKUP -> "PICKUP_DETAILS"
  RECORD_WEIGHT -> "DIGITAL_WEIGHING"
  COMPLETE_PICKUP -> "DIGITAL_WEIGHING"
  CREATE_RECEIPT -> "DIGITAL_RECEIPT"
  VIEW_EARNINGS -> "EARNINGS"
  SELL_SCRAP -> "SELL_SCRAP"
  CREATE_PICKUP_REQUEST -> "SELL_SCRAP"
  TRACK_PICKUP -> "TRACEABILITY"
  CREATE_BATCH -> "BATCH_CREATION"
  VIEW_BATCH -> "BATCH_DETAILS"
  RECEIVE_BATCH -> "BATCH_DETAILS"
  VIEW_TRACEABILITY -> "TRACEABILITY"
  VIEW_REGULATORY_ANALYTICS -> "REGULATORY_ANALYTICS"
  VIEW_FACILITY_RISK -> "REGULATORY_ANALYTICS"

Output strictly conforming JSON. Provide a natural, localized conversational reply in ${currentLang}.`;

      const prompt = `User role: ${userRole}
User language: ${currentLang}
User message: "${userText}"

Classify into structured JSON:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              intent: {
                type: Type.STRING,
                description: 'The classified structured intent name from SUPPORTED_INTENTS',
              },
              parameters: {
                type: Type.OBJECT,
                description: 'Extracted parameters from the message such as material, weight, pickupId',
              },
              requiresConfirmation: {
                type: Type.BOOLEAN,
                description: 'Whether the action requires explicit user confirmation before applying',
              },
              uiComponent: {
                type: Type.STRING,
                description: 'The DynamicWorkspace component key to render',
              },
              replyText: {
                type: Type.STRING,
                description: 'Natural, polite, localized conversational reply in user language',
              },
            },
            required: ['intent', 'parameters', 'requiresConfirmation', 'uiComponent'],
          },
        },
      });

      const rawText = response.text?.trim() || '{}';
      const parsed = JSON.parse(rawText);

      let validIntent = parsed.intent as SupportedIntent;
      if (!SUPPORTED_INTENTS.includes(validIntent)) {
        const match = SUPPORTED_INTENTS.find((i) => i.toLowerCase() === (validIntent || '').toLowerCase());
        validIntent = match || 'VIEW_TODAY_REQUESTS';
      }

      // Backend role authorization enforcement:
      // Digital weighing and receipt creation must NOT belong to household
      if (
        userRole === 'household' &&
        (validIntent === 'RECORD_WEIGHT' || validIntent === 'COMPLETE_PICKUP' || validIntent === 'CREATE_RECEIPT')
      ) {
        return res.json({
          intent: 'SELL_SCRAP',
          parameters: {},
          requiresConfirmation: false,
          uiComponent: 'SELL_SCRAP',
          replyText:
            currentLang === 'mr'
              ? 'डिजिटल वजन आणि पावती ही कबाडीवाल्याची जबाबदारी आहे. घरातील वापरकर्ते स्क्रॅप पिकअप बुक करू शकतात किंवा पूर्ण झालेली पावती पाहू शकतात.'
              : currentLang === 'hi'
              ? 'डिजिटल तौल और रसीद कबाड़ीवाला द्वारा की जाती है। आप पिकअप बुक कर सकते हैं या अंतिम रसीद देख सकते हैं।'
              : 'Digital scale weighing and receipt generation are performed by the Kabadiwala during doorstep pickup. Households can book scrap pickups or view completed receipts.',
        });
      }

      const uiComponent = INTENT_UI_MAP[validIntent] || parsed.uiComponent || 'REQUEST_LIST';

      return res.json({
        intent: validIntent,
        parameters: parsed.parameters || {},
        requiresConfirmation: !!parsed.requiresConfirmation,
        uiComponent,
        replyText: parsed.replyText || 'आपली विनंती प्रक्रिया केली आहे.',
      });
    } catch (err: any) {
      console.warn('Gemini intent classification fallback engaged:', err?.message || err);
      const fallback = semanticFallbackClassification(userText, userRole, currentLang);
      return res.json(fallback);
    }
  }

  // If Gemini API key not yet set, use semantic multilingual classifier
  const fallback = semanticFallbackClassification(userText, userRole, currentLang);
  return res.json(fallback);
});

// Setup Vite dev server or static dist serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: Number(port) },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // SPA HTML transform fallback for Vite middleware
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`KabadiGPT Full-Stack Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
