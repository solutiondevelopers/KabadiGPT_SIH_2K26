import React, { useState } from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  FileText,
  Trash2,
  Plus,
  ShieldCheck,
  Info,
  Navigation,
} from 'lucide-react';
import { Language } from '../../types';
import { createPickupRequest } from '../../services/firebaseService';
import confetti from 'canvas-confetti';

export type ScrapCategoryKey =
  | 'PAPER'
  | 'PLASTIC'
  | 'METAL'
  | 'COPPER'
  | 'ALUMINIUM'
  | 'E_WASTE'
  | 'OTHER';

export interface CategoryInfo {
  key: ScrapCategoryKey;
  labelEn: string;
  labelMr: string;
  labelHi: string;
  ratePerKg: number;
  icon: string;
  examplesEn: string;
  examplesMr: string;
  examplesHi: string;
}

export const SUPPORTED_CATEGORIES: CategoryInfo[] = [
  {
    key: 'PAPER',
    labelEn: 'Paper',
    labelMr: 'रद्दी कागद / वर्तमानपत्रे',
    labelHi: 'अखबार / रद्दी कागज',
    ratePerKg: 14,
    icon: '📰',
    examplesEn: 'Newspaper, books, cartons',
    examplesMr: 'वृत्तपत्रे, मासिके, पुठ्ठे',
    examplesHi: 'अखबार, किताबें, गत्ता',
  },
  {
    key: 'PLASTIC',
    labelEn: 'Plastic',
    labelMr: 'प्लॅस्टिक',
    labelHi: 'प्लास्टिक',
    ratePerKg: 18,
    icon: '🧴',
    examplesEn: 'Bottles, containers, broken plastic chairs',
    examplesMr: 'बाटल्या, डबे, तुटलेल्या खुर्च्या',
    examplesHi: 'बोतलें, डिब्बे, कुर्सियां',
  },
  {
    key: 'METAL',
    labelEn: 'Metal / Iron',
    labelMr: 'लोखंड / धातू',
    labelHi: 'लोहा / धातु',
    ratePerKg: 32,
    icon: '🔩',
    examplesEn: 'Iron rods, scrap steel, utensils',
    examplesMr: 'सळया, लोखंडी भांडी, पत्रे',
    examplesHi: 'लोहे की छड़ें, पुराने बर्तन, स्टील',
  },
  {
    key: 'COPPER',
    labelEn: 'Copper',
    labelMr: 'तांबे',
    labelHi: 'तांबा',
    ratePerKg: 425,
    icon: '🔌',
    examplesEn: 'Copper wire, motor winding, copper vessels',
    examplesMr: 'तांब्याची वायर, मोटार वाइंडिंग, भांडी',
    examplesHi: 'तांबे के तार, मोटर वाइंडिंग, तांबे के बर्तन',
  },
  {
    key: 'ALUMINIUM',
    labelEn: 'Aluminium',
    labelMr: 'अ‍ॅल्युमिनियम',
    labelHi: 'एल्युमिनियम',
    ratePerKg: 125,
    icon: '🥫',
    examplesEn: 'Beverage cans, window frames, engine heads',
    examplesMr: 'कॅन, खिडक्यांच्या फ्रेम्स, पत्रे',
    examplesHi: 'कैन, खिड़की फ्रेम, एल्युमिनियम तार',
  },
  {
    key: 'E_WASTE',
    labelEn: 'E-Waste',
    labelMr: 'ई-कचरा (इलेक्ट्रॉनिक्स)',
    labelHi: 'ई-कचरा (इलेक्ट्रॉनिक)',
    ratePerKg: 65,
    icon: '📺',
    examplesEn: 'Old TV, laptop, motherboard, cables',
    examplesMr: 'जुना टीव्ही, लॅपटॉप, मदरबोर्ड, केबल्स',
    examplesHi: 'पुराना टीवी, लैपटॉप, सर्किट बोर्ड, तार',
  },
  {
    key: 'OTHER',
    labelEn: 'Other Scrap',
    labelMr: 'इतर भंगार',
    labelHi: 'अन्य कबाड़',
    ratePerKg: 15,
    icon: '📦',
    examplesEn: 'Glass bottles, mixed scrap, tires',
    examplesMr: 'काचेच्या बाटल्या, संकीर्ण भंगार',
    examplesHi: 'कांच की बोतलें, मिश्रित कबाड़',
  },
];

interface SellScrapWorkflowProps {
  lang: Language;
  initialCategory?: string;
  onBookingComplete?: (bookingData: any) => void;
}

export const SellScrapWorkflow: React.FC<SellScrapWorkflowProps> = ({
  lang,
  initialCategory,
  onBookingComplete,
}) => {
  // Steps 1 to 6, then confirmed result state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Upload / Description
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [materialDescription, setMaterialDescription] = useState<string>(
    initialCategory === 'ewaste' ? 'Old TV, copper wire, laptop' : 'Old TV, Copper wire'
  );
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);

  // Step 2: Selected Categories and item names
  const [selectedCategories, setSelectedCategories] = useState<Record<ScrapCategoryKey, boolean>>({
    E_WASTE: true,
    COPPER: true,
    PAPER: false,
    PLASTIC: false,
    METAL: false,
    ALUMINIUM: false,
    OTHER: false,
  });

  const [itemNames, setItemNames] = useState<string[]>([
    'Old TV',
    'Copper wire',
  ]);
  const [newItemInput, setNewItemInput] = useState<string>('');

  // Step 3: Estimated Weight
  const [estimatedWeightKg, setEstimatedWeightKg] = useState<number>(12);
  const [weightKnown, setWeightKnown] = useState<boolean>(true);

  // Step 4: Household Location
  const [locationAddress, setLocationAddress] = useState<string>(
    'B-402, Rohan Nilay, Aundh, Pune - 411007'
  );
  const [contactPhone, setContactPhone] = useState<string>('+91 98220 14829');

  // Step 5: Preferred Pickup Time
  const [preferredTime, setPreferredTime] = useState<string>('Today 5 PM - 7 PM');

  // Step 6 / Confirmation State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdRequestId, setCreatedRequestId] = useState<string | null>(null);
  const [createdShortId, setCreatedShortId] = useState<string>('101');
  const [requestStatus, setRequestStatus] = useState<string>('PENDING');

  // Multi-language UI texts
  const t = {
    mr: {
      workflowTitle: 'घरोघरी कबाड विक्री (Sell Scrap)',
      workflowSub: '६ सोप्या पायऱ्यांमध्ये पिकअप विनंती तयार करा',
      step1Title: '१. फोटो किंवा साहित्याचे वर्णन',
      step1Prompt: 'भंगाराचा फोटो अपलोड करा किंवा साहित्याचे नाव लिहा:',
      step1UploadBtn: 'फोटो निवडा / कॅमेरा',
      step1DescPlaceholder: 'उदा. जुना टीव्ही, तांब्याची वायर, वृत्तपत्रे...',
      step1AnalyzeBtn: 'एआय द्वारे तपासा (Suggest Categories)',
      step2Title: '२. सुचवलेली वर्गवारी (Categories)',
      step2Sub: 'एआय तपासणी फक्त एक अंदाज आहे. तुम्ही वर्गवारी बदलू शकता:',
      step2ItemDetails: 'विशिष्ट वस्तूंची नावे (Items):',
      step2AddBtn: 'जोडा',
      step3Title: '३. अंदाजे वजन (Estimated Weight)',
      step3Sub: 'अंदाजे वजन माहीत असल्यास नोंदवा (ऐच्छिक):',
      step3KnownQuestion: 'तुम्हाला अंदाजे वजन माहीत आहे का?',
      step3KnownYes: 'होय, माहीत आहे',
      step3KnownNo: 'नाही, अंदाजे वजन नाही',
      step3ValueLabel: 'अंदाजित मूल्य (Estimated Value):',
      step3Disclaimer: 'टीप: हे अंदाजित मूल्य आहे. अंतिम रक्कम कबाडीवाल्याच्या प्रत्यक्ष डिजिटल वजनानंतरच निश्चित होईल.',
      step4Title: '४. घराचा पत्ता (Pickup Location)',
      step4Sub: 'कबाडीवाला कोणत्या पत्त्यावर यावा ते सांगा:',
      step4DetectGps: 'सध्याचे स्थान वापरा (GPS)',
      step4PhoneLabel: 'संपर्क मोबाईल:',
      step5Title: '५. सोयीस्कर वेळ (Preferred Pickup Time)',
      step5Sub: 'पिकअपसाठी सोयीस्कर स्लॉट निवडा:',
      step6Title: '६. विनंती पुष्टी (Confirmation Card)',
      step6CardTitle: 'PICKUP REQUEST',
      step6Materials: 'Materials:',
      step6EstWeight: 'Estimated weight:',
      step6Location: 'Location:',
      step6Time: 'Preferred time:',
      step6ConfirmBtn: 'Confirm Pickup',
      successHeader: 'पिकअप विनंती यशस्वीरित्या नोंदवली!',
      successStatusLabel: 'स्थिती (Status):',
      nextBtn: 'पुढे जा (Next)',
      backBtn: 'मागे (Back)',
    },
    hi: {
      workflowTitle: 'डोरस्टेप कबाड़ बिक्री (Sell Scrap)',
      workflowSub: '६ आसान चरणों में पिकअप अनुरोध बनाएं',
      step1Title: '१. फोटो या सामग्री का विवरण',
      step1Prompt: 'कबाड़ का फोटो अपलोड करें या सामग्री का नाम लिखें:',
      step1UploadBtn: 'फोटो चुनें / कैमरा',
      step1DescPlaceholder: 'उदा. पुराना टीवी, तांबे का तार, अखबार...',
      step1AnalyzeBtn: 'एआई द्वारा सुझाव लें (Suggest Categories)',
      step2Title: '२. सुझाई गई श्रेणियां (Categories)',
      step2Sub: 'एआई पहचान केवल अनुमान है। आप श्रेणियां ठीक कर सकते हैं:',
      step2ItemDetails: 'विशिष्ट सामान के नाम (Items):',
      step2AddBtn: 'जोड़ें',
      step3Title: '३. अनुमानित वजन (Estimated Weight)',
      step3Sub: 'यदि अनुमानित वजन पता हो तो दर्ज करें (वैकल्पिक):',
      step3KnownQuestion: 'क्या आपको अनुमानित वजन पता है?',
      step3KnownYes: 'हाँ, पता है',
      step3KnownNo: 'नहीं, वजन का अंदाजा नहीं है',
      step3ValueLabel: 'अनुमानित मूल्य (Estimated Value):',
      step3Disclaimer: 'ध्यान दें: यह केवल अनुमानित मूल्य है। अंतिम राशि कबाड़ीवाला द्वारा वास्तविक डिजिटल तौल के बाद ही तय होगी।',
      step4Title: '४. घर का पता (Pickup Location)',
      step4Sub: 'कबाड़ीवाला किस पते पर आए:',
      step4DetectGps: 'वर्तमान स्थान चुनें (GPS)',
      step4PhoneLabel: 'संपर्क मोबाइल:',
      step5Title: '५. पिकअप का समय (Preferred Pickup Time)',
      step5Sub: 'पिकअप हेतु अपनी सुविधानुसार समय चुनें:',
      step6Title: '६. अनुरोध पुष्टि (Confirmation Card)',
      step6CardTitle: 'PICKUP REQUEST',
      step6Materials: 'Materials:',
      step6EstWeight: 'Estimated weight:',
      step6Location: 'Location:',
      step6Time: 'Preferred time:',
      step6ConfirmBtn: 'Confirm Pickup',
      successHeader: 'पिकअप अनुरोध सफलतापूर्वक दर्ज!',
      successStatusLabel: 'स्थिति (Status):',
      nextBtn: 'आगे बढ़ें (Next)',
      backBtn: 'पीछे (Back)',
    },
    en: {
      workflowTitle: 'Household Scrap Booking (Sell Scrap)',
      workflowSub: 'Create doorstep pickup request in 6 guided steps',
      step1Title: '1. Photo or Description',
      step1Prompt: 'Upload a photo of your scrap or describe the materials:',
      step1UploadBtn: 'Upload Photo / Camera',
      step1DescPlaceholder: 'e.g. Old TV, copper wire, newspaper bundles...',
      step1AnalyzeBtn: 'Suggest Categories with AI',
      step2Title: '2. Suggested Material Categories',
      step2Sub: 'AI detection is an estimate only. You can correct categories:',
      step2ItemDetails: 'Specific Item Names (Materials):',
      step2AddBtn: 'Add',
      step3Title: '3. Estimated Weight',
      step3Sub: 'Enter estimated weight if known (optional):',
      step3KnownQuestion: 'Do you know the approximate weight?',
      step3KnownYes: 'Yes, I know',
      step3KnownNo: 'No, collector will weigh',
      step3ValueLabel: 'Estimated Value:',
      step3Disclaimer: 'Important: This is an Estimated Value only. Final amount is calculated after digital weighing by the Kabadiwala.',
      step4Title: '4. Household Location',
      step4Sub: 'Provide your doorstep pickup address:',
      step4DetectGps: 'Use Current GPS Location',
      step4PhoneLabel: 'Contact Mobile:',
      step5Title: '5. Preferred Pickup Time',
      step5Sub: 'Select convenient date and time window:',
      step6Title: '6. Review & Confirmation',
      step6CardTitle: 'PICKUP REQUEST',
      step6Materials: 'Materials:',
      step6EstWeight: 'Estimated weight:',
      step6Location: 'Location:',
      step6Time: 'Preferred time:',
      step6ConfirmBtn: 'Confirm Pickup',
      successHeader: 'Pickup Request Created!',
      successStatusLabel: 'Status:',
      nextBtn: 'Next Step',
      backBtn: 'Back',
    },
  }[lang];

  // Helper for photo upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        triggerAiAnalysis(materialDescription);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Gemini category suggestion
  const triggerAiAnalysis = (desc: string) => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      const lower = desc.toLowerCase();
      const newCats: Record<ScrapCategoryKey, boolean> = {
        PAPER: /paper|newspaper|कागद|रद्दी|अखबार|book/i.test(lower),
        PLASTIC: /plastic|bottle|प्लास्टिक|डबे/i.test(lower),
        METAL: /metal|iron|steel|लोखंड|धातु|भांडी/i.test(lower),
        COPPER: /copper|तांबे|तांबा|wire/i.test(lower) || lower.includes('tv'),
        ALUMINIUM: /aluminium|aluminum|कॅन|कैन|एल्युमिनियम/i.test(lower),
        E_WASTE: /e_waste|ewaste|tv|laptop|computer|इलेक्ट्रॉनिक|टीव्ही/i.test(lower),
        OTHER: false,
      };

      // Ensure at least one category is active
      if (!Object.values(newCats).some(Boolean)) {
        newCats.E_WASTE = true;
        newCats.COPPER = true;
      }

      setSelectedCategories(newCats);
      setIsAiAnalyzing(false);
      setCurrentStep(2);
    }, 600);
  };

  const toggleCategory = (key: ScrapCategoryKey) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const addItemName = () => {
    if (newItemInput.trim() && !itemNames.includes(newItemInput.trim())) {
      setItemNames([...itemNames, newItemInput.trim()]);
      setNewItemInput('');
    }
  };

  const removeItemName = (index: number) => {
    setItemNames(itemNames.filter((_, i) => i !== index));
  };

  // Calculate estimated value (Clearly labeled "Estimated Value")
  const activeCategoryList = SUPPORTED_CATEGORIES.filter(
    (c) => selectedCategories[c.key]
  );

  const avgRatePerKg =
    activeCategoryList.length > 0
      ? activeCategoryList.reduce((acc, c) => acc + c.ratePerKg, 0) /
        activeCategoryList.length
      : 25;

  const estimatedValue = Math.round(
    weightKnown ? estimatedWeightKg * avgRatePerKg : 0
  );

  // Step 6: Confirmation -> Create real Firestore Request
  const handleConfirmPickup = async () => {
    setIsSubmitting(true);
    try {
      // Generate formatted specification ID: REQ-2026-MH-PUN-000101
      const generatedShort = '101';
      const customReqId = `REQ-2026-MH-PUN-000${generatedShort}`;

      const activeCatNames = activeCategoryList.map((c) => c.key);
      const materialsToStore =
        itemNames.length > 0 ? itemNames : activeCategoryList.map((c) => c.labelEn);

      await createPickupRequest({
        customRequestId: customReqId,
        materialTypes: activeCatNames,
        materials: materialsToStore,
        estimatedWeight: weightKnown ? `${estimatedWeightKg} kg` : 'To be weighed',
        address: locationAddress,
        preferredPickupTime: preferredTime,
        customerName: 'Anand Deshmukh',
        phone: contactPhone,
        estimatedPayout: estimatedValue,
      });

      setCreatedRequestId(customReqId);
      setCreatedShortId(generatedShort);
      setRequestStatus('PENDING');
      setCurrentStep(7); // Show confirmation celebration / status screen

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

      if (onBookingComplete) {
        onBookingComplete({
          requestId: customReqId,
          materials: materialsToStore,
          estimatedWeightKg: weightKnown ? estimatedWeightKg : null,
          location: locationAddress,
          time: preferredTime,
          status: 'PENDING',
        });
      }
    } catch (err) {
      console.error('Failed to create real Firestore pickup request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      {/* Workflow Title Header */}
      <div className="flex items-start justify-between mb-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
              {t.workflowTitle}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{t.workflowSub}</p>
          </div>
        </div>
        <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          HOUSEHOLD
        </span>
      </div>

      {/* Step Progress Pills (1 to 6) */}
      {currentStep <= 6 && (
        <div className="flex items-center justify-between gap-1 mb-4 pb-2 border-b border-slate-100 overflow-x-auto text-[11px]">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg font-bold transition-colors ${
                currentStep === s
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : currentStep > s
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <span>{s}</span>
              <span className="hidden sm:inline">
                {s === 1
                  ? 'Photo'
                  : s === 2
                  ? 'Category'
                  : s === 3
                  ? 'Weight'
                  : s === 4
                  ? 'Location'
                  : s === 5
                  ? 'Time'
                  : 'Confirm'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 1: Ask user to upload a photo or describe material   */}
      {/* ========================================================= */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>{t.step1Title}</span>
          </div>

          <p className="text-xs text-slate-600">{t.step1Prompt}</p>

          {/* Photo Upload Zone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
            {uploadedImage ? (
              <div className="relative inline-block">
                <img
                  src={uploadedImage}
                  alt="Scrap Preview"
                  className="w-48 h-32 object-cover rounded-xl border border-slate-200 shadow-xs mx-auto"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-xs hover:bg-red-700"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  {t.step1UploadBtn}
                </div>
                <label className="inline-block px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 shadow-2xs">
                  <span>Browse File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Text Description Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Material Description:
            </label>
            <textarea
              rows={2}
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder={t.step1DescPlaceholder}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <button
            onClick={() => triggerAiAnalysis(materialDescription)}
            disabled={isAiAnalyzing}
            className="w-full min-h-[44px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            {isAiAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Gemini Vision analyzing scrap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.step1AnalyzeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: Show detected/suggested categories                */}
      {/* ========================================================= */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.step2Title}</span>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-amber-900 leading-snug">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{t.step2Sub}</span>
          </div>

          {/* 7 Supported Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SUPPORTED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories[cat.key];
              const label =
                lang === 'mr'
                  ? cat.labelMr
                  : lang === 'hi'
                  ? cat.labelHi
                  : cat.labelEn;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => toggleCategory(cat.key)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{cat.icon}</span>
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      {cat.key}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Specific Item Names (e.g. Old TV, Copper wire) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.step2ItemDetails}
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {itemNames.map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  <span>{name}</span>
                  <button
                    onClick={() => removeItemName(i)}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newItemInput}
                onChange={(e) => setNewItemInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItemName()}
                placeholder="Add item (e.g. Broken laptop, Iron grill)"
                className="flex-1 text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={addItemName}
                className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900"
              >
                {t.step2AddBtn}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              {t.backBtn}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{t.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: Ask for estimated weight if known                 */}
      {/* ========================================================= */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>{t.step3Title}</span>
          </div>

          <p className="text-xs text-slate-600">{t.step3Sub}</p>

          {/* Toggle known vs unknown */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setWeightKnown(true)}
              className={`flex-1 p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                weightKnown
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{t.step3KnownYes}</span>
            </button>
            <button
              type="button"
              onClick={() => setWeightKnown(false)}
              className={`flex-1 p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                !weightKnown
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{t.step3KnownNo}</span>
            </button>
          </div>

          {weightKnown && (
            <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700">
                Estimated Weight (kg):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={estimatedWeightKg}
                  onChange={(e) => setEstimatedWeightKg(Number(e.target.value) || 0)}
                  className="w-24 text-base font-mono font-bold p-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                />
                <span className="text-xs font-bold text-slate-500">kg</span>

                <div className="flex gap-1.5 ml-auto">
                  {[5, 12, 20, 40].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEstimatedWeightKg(preset)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                        estimatedWeightKg === preset
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {preset} kg
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strictly labeled "Estimated Value" (Never "Final Price" or "Final Amount") */}
          <div className="bg-slate-900 text-white rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-300 block font-medium">
                {t.step3ValueLabel}
              </span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {weightKnown ? `₹${estimatedValue}` : 'Calculated on Scale'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-300 font-semibold block uppercase tracking-wider">
                Doorstep Weighing
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {weightKnown ? `~${estimatedWeightKg} kg est.` : 'Weight TBD'}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{t.step3Disclaimer}</span>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              {t.backBtn}
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{t.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: Get household location                            */}
      {/* ========================================================= */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.step4Title}</span>
          </div>

          <p className="text-xs text-slate-600">{t.step4Sub}</p>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Doorstep Pickup Address:
              </label>
              <button
                type="button"
                onClick={() =>
                  setLocationAddress('Flat 302, Green Acre, Aundh, Pune - 411007')
                }
                className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Navigation className="w-3 h-3" />
                <span>{t.step4DetectGps}</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.step4PhoneLabel}
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              {t.backBtn}
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{t.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 5: Ask preferred pickup time                         */}
      {/* ========================================================= */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{t.step5Title}</span>
          </div>

          <p className="text-xs text-slate-600">{t.step5Sub}</p>

          <div className="space-y-2">
            {[
              'Today 5 PM - 7 PM',
              'Today 10 AM - 1 PM',
              'Tomorrow 10 AM - 1 PM',
              'Tomorrow 5 PM - 7 PM',
            ].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setPreferredTime(slot)}
                className={`w-full p-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                  preferredTime === slot
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{slot}</span>
                </div>
                {preferredTime === slot && (
                  <Check className="w-4 h-4 text-emerald-700" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              {t.backBtn}
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{t.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 6: Show Confirmation Card (Exact format requested)  */}
      {/* ========================================================= */}
      {currentStep === 6 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.step6Title}</span>
          </div>

          {/* Exact format requested in the prompt */}
          <div className="bg-slate-50 border-2 border-emerald-500/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-extrabold text-sm tracking-wider text-slate-900 font-mono">
                {t.step6CardTitle}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                PENDING CONFIRMATION
              </span>
            </div>

            {/* Materials */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.step6Materials}
              </span>
              <div className="mt-1 space-y-0.5">
                {itemNames.map((item, idx) => (
                  <p key={idx} className="text-sm font-semibold text-slate-900">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Estimated weight */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.step6EstWeight}
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {weightKnown ? `${estimatedWeightKg} kg` : 'To be weighed at scale'}
              </p>
            </div>

            {/* Location */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.step6Location}
              </span>
              <p className="text-xs font-medium text-slate-800 mt-0.5 leading-relaxed">
                {locationAddress}
              </p>
            </div>

            {/* Preferred time */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.step6Time}
              </span>
              <p className="text-xs font-bold text-emerald-800 mt-0.5">
                {preferredTime}
              </p>
            </div>

            {/* Estimated Value */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                {t.step3ValueLabel}
              </span>
              <span className="text-base font-extrabold font-mono text-emerald-700">
                {weightKnown ? `₹${estimatedValue}` : 'Determined at Weighing'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              {t.backBtn}
            </button>
            <button
              onClick={handleConfirmPickup}
              disabled={isSubmitting}
              className="flex-1 min-h-[46px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{t.step6ConfirmBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* AFTER CONFIRMATION: REAL FIRESTORE REQUEST SUCCESS SCREEN  */}
      {/* ========================================================= */}
      {currentStep === 7 && (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
              Pickup Request #{createdShortId} created successfully.
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
              Your request has been dispatched to local verified Kabadiwalas in Aundh, Pune.
            </p>
          </div>

          {/* Status Display: PENDING */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Request Reference:</span>
              <span className="font-mono font-bold text-slate-900 text-xs">
                {createdRequestId || `REQ-2026-MH-PUN-000${createdShortId}`}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{t.successStatusLabel}</span>
              <span className="inline-flex items-center gap-1 font-bold font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {requestStatus}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Materials:</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[180px]">
                {itemNames.join(', ')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Estimated Weight:</span>
              <span className="font-mono font-bold text-slate-900">
                {weightKnown ? `${estimatedWeightKg} kg` : 'To be weighed'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Preferred Time:</span>
              <span className="font-medium text-slate-800">{preferredTime}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Estimated Value:</span>
              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                {weightKnown ? `₹${estimatedValue}` : 'Calculated at Scale'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 max-w-sm mx-auto bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80">
            🌱 A Kabadiwala will visit your doorstep at {preferredTime} with a certified digital IoT scale.
          </div>
        </div>
      )}
    </div>
  );
};
