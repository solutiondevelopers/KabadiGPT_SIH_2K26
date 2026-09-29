import React, { useState } from 'react';
import {
  Package,
  Camera,
  Upload,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Info,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { SCRAP_RATES } from '../../data/mockData';
import { Language, ScrapRate } from '../../types';

interface SellScrapViewProps {
  lang: Language;
  onBookPickupSuccess?: (pickupData: any) => void;
  onNavigateToTracking?: () => void;
}

export const SellScrapView: React.FC<SellScrapViewProps> = ({
  lang,
  onBookPickupSuccess,
  onNavigateToTracking,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const content = {
    mr: {
      badge: 'घरगुती भंगार विक्री प्रक्रिया',
      title: 'भंगार विका व विल्हेवाट लावा',
      subtitle: 'हमीभाव, IoT डिजिटल वजन काटा व तात्काळ यूपीआय पेमेंट.',
      step1Name: '१. भंगार निवडा',
      step2Name: '२. अंदाज तपासा',
      step3Name: '३. पत्ता व वेळ',
      step4Name: '४. पावती व ट्रॅकिंग',
      aiClassifierTitle: 'तात्काळ एआय कचरा वर्गीकरण',
      aiVisionBadge: 'Gemini व्हिजन',
      aiClassifierDesc: 'भंगाराचा फोटो काढून प्रकार, गुणवत्ता व अंदाजे वजन आपोआप ओळखा.',
      uploadBtn: 'भंगाराचा फोटो अपलोड करा',
      aiAnalyzing: 'एआय व्हिजन साहित्याची रचना व घनता तपासत आहे...',
      selectCategories: 'विकू इच्छित असलेल्या साहित्याची निवड करा:',
      spotRatesPune: 'पुणे MIDC आजचे थेट हमीभाव दर',
      estQtyHeader: 'अंदाजे प्रमाण (किलोमध्ये):',
      approxKg: 'किलो',
      totalEstimated: 'एकूण अंदाजे वजन:',
      approxPayout: 'अंदाजे देय रक्कम:',
      reviewEstimateBtn: 'एआय अंदाजाचे पुनरावलोकन करा',
      transparentGuarantee: 'पारदर्शक हमीभाव खात्री: ',
      guaranteeDesc: 'खाली दर्शवलेली किंमत अंदाजे घनतेवर आधारित प्राथमिक अंदाज आहे. अंतिम रक्कम तुमच्या दारात कॅलिब्रेटेड ब्लूटूथ IoT वजन काट्यावर मोजून दिली जाईल.',
      tableMaterial: 'साहित्य प्रकार',
      tableQty: 'अंदाजे वजन',
      tableRate: 'हमीभाव दर',
      tableValue: 'अंदाजे मूल्य',
      tableTotal: 'एकूण अंदाजे',
      spotAvg: 'थेट सरासरी दर',
      backToSelection: 'मागे जा',
      proceedToAddress: 'पत्ता व वेळ स्लॉट निवडा',
      pickupAddress: 'पिकअप पत्ता:',
      gpsPin: 'जीपीएस स्थान: 18.5580° N, 73.8070° E (औंध, पुणे प्रभाग #४)',
      preferredDate: 'पसंतीची तारीख:',
      preferredSlot: 'पसंतीची वेळ:',
      instructions: 'कलेक्टरसाठी विशेष सूचना (पर्यायी):',
      placeholderInstructions: 'उदा. फ्लॅट ४०२ ची बेल वाजवा, भंगार बाल्कनीत ठेवले आहे',
      today: 'आज',
      tomorrow: 'उद्या',
      dayAfter: 'परवा',
      confirmBooking: 'डोअरस्टेप पिकअप निश्चित करा',
      reqCreated: 'विनंती #REQ-101 तयार झाली',
      scheduledSuccess: 'पिकअप यशस्वीरित्या शेड्यूल केले!',
      collectorAssigned: 'प्रमाणित कबाडीवाला रमेश शिंदे (पियाजिओ EV लोडर MH-12-RN-4890) तुमच्या पत्त्यासाठी नियुक्त करण्यात आले आहेत.',
      summaryAddress: 'पत्ता:',
      summarySlot: 'वेळ:',
      summaryItems: 'अंदाजे साहित्य:',
      indicativePayout: 'अंदाजे देय रक्कम:',
      trackCollectorMap: 'कलेक्टरला नकाशावर थेट ट्रॅक करा',
      bookAnother: 'दुसरा पिकअप बुक करा',
    },
    hi: {
      badge: 'घरेलू कबाड़ बिक्री प्रक्रिया',
      title: 'कबाड़ बेचें व निपटान करें',
      subtitle: 'उचित सरकारी भाव, IoT डिजिटल कांटा व तुरंत यूपीआई भुगतान।',
      step1Name: '1. कबाड़ चुनें',
      step2Name: '2. अनुमान देखें',
      step3Name: '3. पता व समय',
      step4Name: '4. रसीद व ट्रैकिंग',
      aiClassifierTitle: 'त्वरित एआई कचरा पहचान',
      aiVisionBadge: 'Gemini विजन',
      aiClassifierDesc: 'कबाड़ की फोटो खींचकर सामग्री, ग्रेड व वजन तुरंत पहचानें।',
      uploadBtn: 'कबाड़ फोटो अपलोड करें',
      aiAnalyzing: 'एआई विजन सामग्री संरचना व घनत्व की जांच कर रहा है...',
      selectCategories: 'बेचने हेतु कबाड़ श्रेणियों का चयन करें:',
      spotRatesPune: 'पुणे MIDC आज के बाजार भाव',
      estQtyHeader: 'अनुमानित मात्रा (किलो में):',
      approxKg: 'किग्रा',
      totalEstimated: 'कुल अनुमानित भार:',
      approxPayout: 'अनुमानित राशि:',
      reviewEstimateBtn: 'एआई अनुमान की समीक्षा करें',
      transparentGuarantee: 'पारदर्शी मूल्य गारंटी: ',
      guaranteeDesc: 'नीचे दर्शाई गई राशि सामान्य घनत्व पर आधारित एआई अनुमान है। अंतिम भुगतान आपके दरवाजे पर डिजिटल ब्लूटूथ कांटे से तौलकर किया जाएगा।',
      tableMaterial: 'सामग्री श्रेणी',
      tableQty: 'अनुमानित भार',
      tableRate: 'सरकारी भाव',
      tableValue: 'अनुमानित मूल्य',
      tableTotal: 'कुल अनुमानित',
      spotAvg: 'औसत सरकारी दर',
      backToSelection: 'पीछे जाएं',
      proceedToAddress: 'पता व समय स्लॉट चुनें',
      pickupAddress: 'पिकअप पता:',
      gpsPin: 'जीपीएस पिन: 18.5580° N, 73.8070° E (औंध, पुणे वार्ड #4)',
      preferredDate: 'पसंदीदा तारीख:',
      preferredSlot: 'पसंदीदा समय स्लॉट:',
      instructions: 'कलेक्टर के लिए निर्देश (वैकल्पिक):',
      placeholderInstructions: 'उदा. फ्लैट 402 की घंटी बजाएं, कबाड़ बालकनी में रखा है',
      today: 'आज',
      tomorrow: 'कल',
      dayAfter: 'परसों',
      confirmBooking: 'डोरस्टेप पिकअप बुक करें',
      reqCreated: 'अनुरोध #REQ-101 निर्मित',
      scheduledSuccess: 'पिकअप सफलतापूर्वक निर्धारित!',
      collectorAssigned: 'सत्यापित कबाड़ीवाला रमेश शिंदे (Piaggio EV लोडर MH-12-RN-4890) आपके पते के लिए नियुक्त किए गए हैं।',
      summaryAddress: 'पता:',
      summarySlot: 'समय:',
      summaryItems: 'सामग्री:',
      indicativePayout: 'अनुमानित भुगतान:',
      trackCollectorMap: 'कलेक्टर को मैप पर लाइव ट्रैक करें',
      bookAnother: 'दूसरा पिकअप बुक करें',
    },
    en: {
      badge: 'Household Scrap Flow',
      title: 'Sell & Dispose Scrap',
      subtitle: 'Fair spot market rates, IoT digital weighing scale & instant doorstep UPI payout.',
      step1Name: '1. Select Scrap',
      step2Name: '2. Review Estimate',
      step3Name: '3. Address & Slot',
      step4Name: '4. Confirmed & Track',
      aiClassifierTitle: 'Instant AI Waste Classifier',
      aiVisionBadge: 'Gemini Vision',
      aiClassifierDesc: 'Take a photo of your scrap pile to automatically identify materials, grade & estimated weight.',
      uploadBtn: 'Upload Scrap Photo',
      aiAnalyzing: 'AI Vision analyzing material composition and density...',
      selectCategories: 'Select scrap categories you wish to sell:',
      spotRatesPune: 'Daily Spot Rates Pune MIDC',
      estQtyHeader: 'Estimated Quantities (Approximate kg):',
      approxKg: 'kg',
      totalEstimated: 'Total Estimated:',
      approxPayout: 'Approx Payout:',
      reviewEstimateBtn: 'Review AI Estimate',
      transparentGuarantee: 'Transparent Pricing Guarantee: ',
      guaranteeDesc: 'Values shown below are purely an AI ESTIMATE based on typical densities. Final payout is calculated right at your doorstep using calibrated Bluetooth IoT digital weighing scales.',
      tableMaterial: 'Material Category',
      tableQty: 'Estimated Qty',
      tableRate: 'Govt Spot Rate',
      tableValue: 'Estimated Value',
      tableTotal: 'Estimated Total',
      spotAvg: 'Spot Avg',
      backToSelection: 'Back to Selection',
      proceedToAddress: 'Select Pickup Address & Slot',
      pickupAddress: 'Pickup Address:',
      gpsPin: 'GPS Pin: 18.5580° N, 73.8070° E (Aundh, Pune Ward #4)',
      preferredDate: 'Preferred Date:',
      preferredSlot: 'Preferred Time Slot:',
      instructions: 'Collector Instructions (Optional):',
      placeholderInstructions: 'e.g. Ring flat 402 bell, scrap kept on balcony',
      today: 'Today',
      tomorrow: 'Tomorrow',
      dayAfter: 'Day After',
      confirmBooking: 'Confirm Doorstep Booking',
      reqCreated: 'Request #REQ-101 Created',
      scheduledSuccess: 'Pickup Scheduled Successfully!',
      collectorAssigned: 'Verified Kabadiwala Ramesh Shinde (Piaggio EV Loader MH-12-RN-4890) has been assigned to your address.',
      summaryAddress: 'Address:',
      summarySlot: 'Slot:',
      summaryItems: 'Estimated Items:',
      indicativePayout: 'Indicative Payout:',
      trackCollectorMap: 'Track Collector Live on Map',
      bookAnother: 'Book Another Pickup',
    },
  }[lang];

  // Selected categories and estimated weights
  const [selectedMaterials, setSelectedMaterials] = useState<
    Array<{ rate: ScrapRate; approxKg: number }>
  >([
    { rate: SCRAP_RATES[0], approxKg: 10 },
    { rate: SCRAP_RATES[4], approxKg: 15 },
  ]);

  // Image AI detection state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiDetectedNote, setAiDetectedNote] = useState<string | null>(null);

  // Address & slot
  const [address, setAddress] = useState('B-402, Rohan Nilay, DP Road, Aundh, Pune - 411007');
  const [pickupDate, setPickupDate] = useState(content.today);
  const [pickupSlot, setPickupSlot] = useState('11:00 AM - 01:00 PM');
  const [userNotes, setUserNotes] = useState('Have around 2 boxes of newspaper and iron rods');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIsAiAnalyzing(true);
        setTimeout(() => {
          setIsAiAnalyzing(false);
          setAiDetectedNote(
            lang === 'mr'
              ? 'एआय व्हिजन ओळख: पुठ्ठा बॉक्सेस (~८ किलो), धातू भंगार (~१२ किलो) - ९४% अचूकता.'
              : lang === 'hi'
              ? 'एआई विजन पहचान: गत्ता बॉक्स (~8 किग्रा), लोहा कबाड़ (~12 किग्रा) - 94% सटीकता।'
              : 'AI Vision detected: Corrugated cardboard boxes (approx 8kg), Metal scrap (approx 12kg) with 94% confidence.'
          );
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateEstimatedTotal = () => {
    return selectedMaterials.reduce(
      (sum, item) => sum + item.approxKg * item.rate.ratePerKg,
      0
    );
  };

  const calculateTotalEstimatedWeight = () => {
    return selectedMaterials.reduce((sum, item) => sum + item.approxKg, 0);
  };

  const handleToggleMaterial = (rate: ScrapRate) => {
    const exists = selectedMaterials.find((m) => m.rate.id === rate.id);
    if (exists) {
      setSelectedMaterials(selectedMaterials.filter((m) => m.rate.id !== rate.id));
    } else {
      setSelectedMaterials([...selectedMaterials, { rate, approxKg: 5 }]);
    }
  };

  const handleUpdateKg = (rateId: string, kg: number) => {
    setSelectedMaterials(
      selectedMaterials.map((m) =>
        m.rate.id === rateId ? { ...m, approxKg: Math.max(1, kg) } : m
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Breadcrumb & Step progress */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              {content.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {content.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-700/80">
              {content.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50/70 border border-purple-200 rounded-xl p-1 text-xs font-semibold self-start sm:self-auto">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`px-2.5 py-1 rounded-lg flex items-center justify-center transition-colors text-xs font-bold ${
                  step === s
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                    : step > s
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-purple-400'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
            ))}
          </div>
        </div>

        {/* STEP 1: Select Waste Category or Upload Photo */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* AI Photo Recognition Box */}
            <div className="bg-gradient-to-br from-purple-50/80 via-white to-purple-100/40 border border-purple-200 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{content.aiClassifierTitle}</span>
                      <span className="text-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                        {content.aiVisionBadge}
                      </span>
                    </h4>
                    <p className="text-xs text-purple-700/90 mt-0.5">
                      {content.aiClassifierDesc}
                    </p>
                  </div>
                </div>

                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-purple-50 border border-purple-300 text-purple-900 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all hover:border-purple-500">
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span>{content.uploadBtn}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded photo preview & AI detected badge */}
              {uploadedImage && (
                <div className="mt-4 pt-3 border-t border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <img
                    src={uploadedImage}
                    alt="Scrap Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-purple-300 shadow-xs"
                  />
                  <div className="flex-1 text-xs">
                    {isAiAnalyzing ? (
                      <div className="flex items-center gap-2 text-purple-700 font-semibold">
                        <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
                        <span>{content.aiAnalyzing}</span>
                      </div>
                    ) : (
                      <div className="text-slate-800 bg-white/95 border border-purple-200 rounded-lg p-2.5 shadow-2xs">
                        <span className="font-bold text-purple-700">✓ AI Classification: </span>
                        {aiDetectedNote}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Select Material Categories */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {content.selectCategories}
                </h3>
                <span className="text-xs text-purple-600/90 font-medium">{content.spotRatesPune}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {SCRAP_RATES.map((rate) => {
                  const isSelected = selectedMaterials.some((m) => m.rate.id === rate.id);
                  const rateName = lang === 'mr' ? rate.nameMr : lang === 'hi' ? rate.nameHi : rate.name;
                  return (
                    <button
                      key={rate.id}
                      onClick={() => handleToggleMaterial(rate)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                        isSelected
                          ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                          : 'bg-white hover:bg-purple-50/50 border-purple-200/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{rate.icon}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">
                          {rateName}
                        </p>
                        <p className="text-[11px] font-bold text-purple-700 mt-0.5">
                          ₹{rate.ratePerKg} / {content.approxKg}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected items with weight adjustment */}
            {selectedMaterials.length > 0 && (
              <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  {content.estQtyHeader}
                </h4>
                <div className="space-y-2">
                  {selectedMaterials.map((item) => {
                    const itemName = lang === 'mr' ? item.rate.nameMr : lang === 'hi' ? item.rate.nameHi : item.rate.name;
                    return (
                      <div
                        key={item.rate.id}
                        className="bg-white border border-purple-200/80 rounded-lg p-2.5 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-lg">{item.rate.icon}</span>
                          <span className="text-xs font-semibold text-slate-900 truncate">
                            {itemName}
                          </span>
                          <span className="text-[11px] text-purple-600/80 font-medium">
                            (₹{item.rate.ratePerKg}/{content.approxKg})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 bg-purple-50 rounded-lg p-1 border border-purple-200">
                            <button
                              onClick={() => handleUpdateKg(item.rate.id, item.approxKg - 2)}
                              className="w-6 h-6 rounded bg-white font-bold text-purple-900 hover:bg-purple-100 flex items-center justify-center text-xs cursor-pointer shadow-2xs"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold px-2 text-slate-900">
                              ~{item.approxKg} {content.approxKg}
                            </span>
                            <button
                              onClick={() => handleUpdateKg(item.rate.id, item.approxKg + 2)}
                              className="w-6 h-6 rounded bg-white font-bold text-purple-900 hover:bg-purple-100 flex items-center justify-center text-xs cursor-pointer shadow-2xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-purple-700 w-16 text-right font-mono">
                            ≈ ₹{item.approxKg * item.rate.ratePerKg}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <div className="text-xs text-slate-600">
                {content.totalEstimated}{' '}
                <span className="font-bold text-slate-900">
                  {calculateTotalEstimatedWeight()} {content.approxKg}
                </span>{' '}
                • {content.approxPayout}{' '}
                <span className="font-bold text-purple-700">
                  ₹{calculateEstimatedTotal()}
                </span>
              </div>
              <button
                disabled={selectedMaterials.length === 0}
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>{content.reviewEstimateBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Review AI Estimation & Disclaimer */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{content.transparentGuarantee}</span>
                {content.guaranteeDesc}
              </div>
            </div>

            {/* Estimated Table */}
            <div className="overflow-x-auto border border-purple-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-purple-50/70 text-purple-900 font-bold uppercase border-b border-purple-200 text-[11px]">
                  <tr>
                    <th className="p-3">{content.tableMaterial}</th>
                    <th className="p-3">{content.tableQty}</th>
                    <th className="p-3">{content.tableRate}</th>
                    <th className="p-3 text-right">{content.tableValue}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100 bg-white">
                  {selectedMaterials.map((item) => {
                    const itemName = lang === 'mr' ? item.rate.nameMr : lang === 'hi' ? item.rate.nameHi : item.rate.name;
                    return (
                      <tr key={item.rate.id} className="hover:bg-purple-50/40">
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                          <span>{item.rate.icon}</span>
                          <span>{itemName}</span>
                        </td>
                        <td className="p-3 text-slate-600 font-mono">~{item.approxKg} {content.approxKg}</td>
                        <td className="p-3 text-slate-600 font-mono">₹{item.rate.ratePerKg}/{content.approxKg}</td>
                        <td className="p-3 text-right font-bold text-purple-700 font-mono">
                          ₹{item.approxKg * item.rate.ratePerKg}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-purple-50/90 font-bold border-t border-purple-200 text-slate-900">
                  <tr>
                    <td className="p-3">{content.tableTotal}</td>
                    <td className="p-3 font-mono">~{calculateTotalEstimatedWeight()} {content.approxKg}</td>
                    <td className="p-3 text-purple-600 font-medium">{content.spotAvg}</td>
                    <td className="p-3 text-right text-sm text-purple-700 font-mono">
                      ₹{calculateEstimatedTotal()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {content.backToSelection}
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{content.proceedToAddress}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Address & Preferred Slot */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                {content.pickupAddress}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-purple-600" />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-purple-50/50 focus:bg-white border border-purple-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-purple-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{content.gpsPin}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  {content.preferredDate}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[content.today, content.tomorrow, content.dayAfter].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPickupDate(d)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                        pickupDate === d
                          ? 'bg-purple-100 border-purple-500 text-purple-950 font-bold shadow-2xs'
                          : 'bg-white border-purple-200 text-slate-700 hover:bg-purple-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  {content.preferredSlot}
                </label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-purple-50/50 border border-purple-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-purple-500"
                >
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 01:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                  <option>04:00 PM - 06:30 PM</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-900">
                {content.instructions}
              </label>
              <input
                type="text"
                placeholder={content.placeholderInstructions}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-purple-50/50 focus:bg-white border border-purple-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {content.backToSelection}
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>{content.confirmBooking}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Request Confirmed & Live Status */}
        {step === 4 && (
          <div className="space-y-6 text-center py-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
                {content.reqCreated}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {content.scheduledSuccess}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                {content.collectorAssigned}
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="max-w-md mx-auto bg-purple-50/70 border border-purple-200 rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">{content.summaryAddress}</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                  {address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{content.summarySlot}</span>
                <span className="font-semibold text-slate-800">
                  {pickupDate}, {pickupSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{content.summaryItems}</span>
                <span className="font-semibold text-slate-800">
                  {selectedMaterials.length} {lang === 'mr' ? 'प्रकारचे साहित्य' : lang === 'hi' ? 'प्रकार की सामग्री' : 'materials'} (~{calculateTotalEstimatedWeight()} {content.approxKg})
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-purple-200 text-slate-900 font-bold">
                <span>{content.indicativePayout}</span>
                <span className="text-purple-700 font-mono">₹{calculateEstimatedTotal()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (onNavigateToTracking) onNavigateToTracking();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{content.trackCollectorMap}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-purple-50 border border-purple-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                {content.bookAnother}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
