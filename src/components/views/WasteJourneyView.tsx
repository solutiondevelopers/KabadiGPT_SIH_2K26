import React, { useState } from 'react';
import {
  Network,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Truck,
  Building2,
  Recycle,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types';

interface WasteJourneyViewProps {
  lang: Language;
}

export const WasteJourneyView: React.FC<WasteJourneyViewProps> = ({ lang }) => {
  const [searchBatchId, setSearchBatchId] = useState('PUN-BAL-2026-801');
  const [expandedStep, setExpandedStep] = useState<number | null>(3);

  const toggleStep = (stepNo: number) => {
    setExpandedStep(expandedStep === stepNo ? null : stepNo);
  };

  const content = {
    mr: {
      badge: 'चक्रीय अर्थव्यवस्थेची कस्टडी शृंखला',
      title: 'कचरा प्रवास व डिजिटल ट्रेसेबिलिटी',
      subtitle: 'दारापासून ते प्रमाणित रिसायकलिंग प्लांट व CPCB EPR ग्रीन क्रेडिटपर्यंतचा पारदर्शक प्रवास.',
      cpcbBadge: 'CPCB EPR प्रमाणित',
      searchPlaceholder: 'बॅच आयडी शोधा (उदा. PUN-BAL-2026-801)...',
      trackBtn: 'बॅच ट्रॅक करा',
      steps: [
        {
          stepNumber: 1,
          title: 'घरातून भंगार संकलन व डिजिटल वजन',
          location: 'औंध, पुणे',
          actor: 'नागरिक: आनंद देशमुख ➔ कबाडीवाला: रमेश शिंदे',
          timestamp: '२७ सप्टें २०२६, १०:१४ AM',
          status: 'completed',
          hash: '0x8f2a...c491 (डिजिटल काट्याने मोजणी प्रमाणित)',
          details: 'एकूण २८.४ किलो (१५.२ किलो रद्दी कागद, १३.२ किलो लोखंड). ₹५२० थेट बँक खात्यात वर्ग.',
        },
        {
          stepNumber: 2,
          title: 'मायक्रो-हब सॉर्टिंग व बेलिंग प्रक्रिया',
          location: 'औंध प्रभाग संकलन केंद्र #४',
          actor: 'पर्यवेक्षक: महेंद्र गायकवाड',
          timestamp: '२७ सप्टें २०२६, ०१:४५ PM',
          status: 'completed',
          hash: '0x1b4e...789d (बॅच मॅनिफेस्ट PUN-BAL-801)',
          details: 'ऑप्टिकल NIR सेपरेशन + हायड्रॉलिक कॉम्प्रेशन. ४२० किलो प्रमाणित बेल्स (आर्द्रता १.८%).',
        },
        {
          stepNumber: 3,
          title: 'सुरक्षित वाहतूक व थेट जीपीएस टेलिमॅटिक्स',
          location: 'पुणे बायपास ➔ चाकण MIDC',
          actor: 'वाहतूक: MH-12-RN-4890 (EV Commercial Loader)',
          timestamp: '२७ सप्टें २०२६, ०४:३० PM',
          status: 'active',
          hash: '0x94cc...aa12 (डिजिटल सील #TS-9924-MH)',
          details: 'थेट तापमान, आर्द्रता व सील सेन्सर टेलिमॅटिक्स सुरू. अंदाजे आगमन ४२ मिनिटांत.',
        },
        {
          stepNumber: 4,
          title: 'अधिकृत रिसायकलिंग प्लांट इनटेक व प्रक्रिया',
          location: 'इकोप्लास्ट पॉलिमर्स लि., चाकण MIDC',
          actor: 'प्लांट इंजिनिअर: राजेश सोनावणे',
          timestamp: 'अपेक्षित २७ सप्टें २०२६, ०६:०० PM',
          status: 'upcoming',
          hash: 'इनटेक पडताळणी प्रलंबित',
          details: 'हॉट-वॉश फ्लेक्स एक्सट्रूजन ➔ फूड-ग्रेड rPET ग्रॅन्यूल्स निर्मिती.',
        },
        {
          stepNumber: 5,
          title: 'CPCB / MPCB डिजिटल EPR क्रेडिट जारी',
          location: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ पोर्टल',
          actor: 'नियामक व ब्रँड EPR ऑफसेटिंग',
          timestamp: 'सायकल पूर्ण होताच',
          status: 'upcoming',
          hash: 'EPR-MH-2026-CERT-9041',
          details: 'प्लास्टिक कचरा व्यवस्थापन नियमांनुसार FMCG ब्रँडसाठी प्रमाणित ग्रीन क्रेडिट्स.',
        },
      ],
    },
    hi: {
      badge: 'चक्रीय अर्थव्यवस्था कस्टडी श्रृंखला',
      title: 'कचरा यात्रा व डिजिटल ट्रेसेबिलिटी',
      subtitle: 'घर से प्रमाणित रीसाइक्लिंग प्लांट व CPCB EPR ग्रीन क्रेडिट तक की पारदर्शी यात्रा।',
      cpcbBadge: 'CPCB EPR सत्यापित',
      searchPlaceholder: 'बैच आईडी खोजें (उदा. PUN-BAL-2026-801)...',
      trackBtn: 'बैच ट्रैक करें',
      steps: [
        {
          stepNumber: 1,
          title: 'घर से कबाड़ संकलन व डिजिटल वजन',
          location: 'औंध, पुणे',
          actor: 'नागरिक: आनंद देशमुख ➔ कबाड़ीवाला: रमेश शिंदे',
          timestamp: '27 सित 2026, 10:14 AM',
          status: 'completed',
          hash: '0x8f2a...c491 (कांटा सत्यापन पूर्ण)',
          details: 'कुल 28.4 किग्रा (15.2 किग्रा रद्दी कागज, 13.2 किग्रा लोहा)। ₹520 तुरंत यूपीआई द्वारा प्राप्त।',
        },
        {
          stepNumber: 2,
          title: 'माइक्रो-हब सॉर्टिंग व बेलिंग प्रक्रिया',
          location: 'औंध वार्ड संकलन केंद्र #4',
          actor: 'पर्यवेक्षक: महेंद्र गायकवाड़',
          timestamp: '27 सित 2026, 01:45 PM',
          status: 'completed',
          hash: '0x1b4e...789d (बैच मैनिफेस्ट PUN-BAL-801)',
          details: 'ऑप्टिकल NIR सेपरेशन + हाइड्रोलिक कम्प्रेशन। 420 किग्रा प्रमाणित बेल (नमी 1.8%)।',
        },
        {
          stepNumber: 3,
          title: 'सुरक्षित परिवहन व लाइव जीपीएस टेलीमैटिक्स',
          location: 'पुणे बाईपास ➔ चाकण MIDC',
          actor: 'लॉजिस्टिक्स: MH-12-RN-4890 (EV कमर्शियल लोडर)',
          timestamp: '27 सित 2026, 04:30 PM',
          status: 'active',
          hash: '0x94cc...aa12 (डिजिटल सील #TS-9924-MH)',
          details: 'लाइव तापमान, नमी व सील सेंसर सक्रिय। अनुमानित आगमन 42 मिनट में।',
        },
        {
          stepNumber: 4,
          title: 'अधिकृत रीसाइक्लिंग प्लांट इनटेक व प्रसंस्करण',
          location: 'इकोप्लास्ट पॉलिमर्स लि., चाकण MIDC',
          actor: 'प्लांट इंजीनियर: राजेश सोनावणे',
          timestamp: 'अपेक्षित 27 सित 2026, 06:00 PM',
          status: 'upcoming',
          hash: 'इनटेक सत्यापन लंबित',
          details: 'हॉट-वॉश फ्लेक्स एक्सट्रूज़न ➔ फूड-ग्रेड rPET ग्रैन्यूल्स निर्माण।',
        },
        {
          stepNumber: 5,
          title: 'CPCB / MPCB डिजिटल EPR क्रेडिट निर्गमन',
          location: 'महाराष्ट्र प्रदूषण नियंत्रण बोर्ड पोर्टल',
          actor: 'नियामक व ब्रांड EPR ऑफसेटिंग',
          timestamp: 'चक्र समापन पर',
          status: 'upcoming',
          hash: 'EPR-MH-2026-CERT-9041',
          details: 'प्लास्टिक अपशिष्ट प्रबंधन नियमों के तहत ब्रांड्स हेतु प्रमाणित ग्रीन क्रेडिट।',
        },
      ],
    },
    en: {
      badge: 'Circular Economy Chain of Custody',
      title: 'Waste Journey & Traceability',
      subtitle: 'Auditable lifecycle from household doorstep to certified processor & EPR credit minting.',
      cpcbBadge: 'CPCB EPR Certified',
      searchPlaceholder: 'Search Batch ID (e.g. PUN-BAL-2026-801 or KB-2026-000128)...',
      trackBtn: 'Track Batch',
      steps: [
        {
          stepNumber: 1,
          title: 'Household Scrap Collection',
          location: 'Aundh, Pune',
          actor: 'Citizen: Anand Deshmukh ➔ Collector: Ramesh Shinde',
          timestamp: '27 Sep 2026, 10:14 AM',
          status: 'completed',
          hash: '0x8f2a...c491 (Digital Weighing Verified)',
          details: '28.4 kg total (15.2 kg raddi paper, 13.2 kg iron grills). Instant UPI ₹520 credited.',
        },
        {
          stepNumber: 2,
          title: 'Micro-Hub Aggregation & AI Sorting',
          location: 'Aundh Ward Collection Center #4',
          actor: 'Supervisor: Mahendra Gaikwad',
          timestamp: '27 Sep 2026, 01:45 PM',
          status: 'completed',
          hash: '0x1b4e...789d (Batch Manifest PUN-BAL-801)',
          details: 'Optical NIR separation + hydraulic compression into 420 kg certified bales with moisture 1.8%.',
        },
        {
          stepNumber: 3,
          title: 'Secure Transit & GPS Manifest',
          location: 'Pune Bypass ➔ Chakan MIDC',
          actor: 'Logistics: MH-12-RN-4890 (EV Commercial Loader)',
          timestamp: '27 Sep 2026, 04:30 PM',
          status: 'active',
          hash: '0x94cc...aa12 (Tamper-proof Seal #TS-9924-MH)',
          details: 'Live temperature, humidity & tamper sensor telematics active. Estimated arrival in 42 mins.',
        },
        {
          stepNumber: 4,
          title: 'Authorized Recycler Intake & Processing',
          location: 'EcoPlast Polymers Ltd, Chakan MIDC',
          actor: 'Plant Engineer: Rajesh Sonawane',
          timestamp: 'Expected 27 Sep 2026, 06:00 PM',
          status: 'upcoming',
          hash: 'Pending Intake Verification',
          details: 'Hot-wash flakes extrusion ➔ food-grade rPET granules. Certified zero-effluent process.',
        },
        {
          stepNumber: 5,
          title: 'CPCB / MPCB Digital EPR Credit Minting',
          location: 'Maharashtra Pollution Control Board Portal',
          actor: 'Regulator / Brand EPR Offsetting',
          timestamp: 'Pending Cycle Close',
          status: 'upcoming',
          hash: 'EPR-MH-2026-CERT-9041',
          details: 'Digital verifiable green credit assigned to FMCG Brand partners fulfilling Plastic Waste Management Rules 2026.',
        },
      ],
    },
  }[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Search & Manifest ID banner */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Award className="w-4 h-4 text-purple-600" />
              <span>{content.cpcbBadge}</span>
            </span>
          </div>
        </div>

        {/* Batch ID Search input */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchBatchId}
              onChange={(e) => setSearchBatchId(e.target.value)}
              placeholder={content.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs bg-purple-50/50 focus:bg-white border border-purple-200 rounded-xl font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => alert(`Manifest loaded for Batch #${searchBatchId}`)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
          >
            {content.trackBtn}
          </button>
        </div>
      </div>

      {/* Vertical Lifecycle Journey Stepper */}
      <div className="space-y-4">
        {content.steps.map((step, idx) => {
          const isExpanded = expandedStep === step.stepNumber;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div
              key={step.stepNumber || idx}
              className={`bg-white/95 backdrop-blur-sm border rounded-2xl transition-all duration-200 overflow-hidden ${
                isActive
                  ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md shadow-purple-500/10'
                  : 'border-purple-200/80 shadow-2xs hover:border-purple-300'
              }`}
            >
              {/* Step Header */}
              <div
                onClick={() => toggleStep(step.stepNumber || 1)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.stepNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      {isActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-[#e4fb52] text-slate-950 uppercase border border-lime-300">
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-purple-700/80 mt-0.5">{step.location} • {step.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-purple-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-purple-100 bg-purple-50/40 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-white border border-purple-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold uppercase text-purple-900/60">Custody Actor:</span>
                      <p className="font-semibold text-slate-900">{step.actor}</p>
                    </div>
                    <div className="p-3 bg-white border border-purple-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold uppercase text-purple-900/60">Blockchain Hash / Seal:</span>
                      <p className="font-mono text-purple-700 truncate">{step.hash}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-purple-200 rounded-xl">
                    <span className="text-[10px] font-bold uppercase text-purple-900/60 block mb-1">Telemetry & Audit Log:</span>
                    <p className="text-slate-700">{step.details}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
