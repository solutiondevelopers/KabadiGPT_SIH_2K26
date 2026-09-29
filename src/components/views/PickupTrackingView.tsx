import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Navigation,
  MessageCircle,
  AlertCircle,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../../types';

interface PickupTrackingViewProps {
  lang: Language;
  onStartWeighing?: () => void;
}

export const PickupTrackingView: React.FC<PickupTrackingViewProps> = ({
  lang,
  onStartWeighing,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3);

  const content = {
    mr: {
      telematicsBadge: 'थेट डोअरस्टेप टेलिमॅटिक्स',
      inProgressTitle: 'पिकअप #REQ-101 मार्गस्थ आहे',
      etaText: 'अंदाजे वेळ: ८ मिनिटे (११:१५ AM)',
      doorstepMarker: '🏠 तुमचा पत्ता (औंध, पुणे)',
      collectorMarker: 'रमेश (०.८ किमी अंतरावर)',
      microHubText: 'पुणे मायक्रो-हब #४ सेक्टर ए',
      collectorName: 'रमेश शिंदे',
      vehicleInfo: 'पियाजिओ EV लोडर • MH-12-RN-4890',
      ratingText: '४.९२ (४१२ डोअरस्टेप पिकअप्स)',
      callBtn: 'कलेक्टरला कॉल करा',
      weighingBtn: 'डिजिटल वजन सुरू करा',
      timelineTitle: 'कस्टडी टाइमलाइन व प्रगती:',
      timeline: [
        {
          step: 1,
          title: 'पिकअप विनंती नोंदवली',
          time: '१०:४५ AM',
          desc: 'अंदाजे २८ किलो भंगार (रोहन निलय, औंध) बुक केले',
          done: true,
        },
        {
          step: 2,
          title: 'कबाडीवाला नियुक्त व प्रमाणित',
          time: '१०:५० AM',
          desc: 'रमेश शिंदे (बॅज #४०८) यांनी तुमचा मार्ग स्वीकारला',
          done: true,
        },
        {
          step: 3,
          title: 'कलेक्टर येत आहे (थेट GPS)',
          time: '११:०५ AM',
          desc: 'चालक ०.८ किमी अंतरावर इलेक्ट्रिक लोडरने येत आहे',
          done: true,
          current: true,
        },
        {
          step: 4,
          title: 'दारात आगमन व IoT डिजिटल वजन',
          time: 'अंदाजे ११:१५ AM',
          desc: 'ब्लूटूथ प्रमाणित काट्याने प्रत्यक्ष वजन व हमीभाव पडताळणी',
          done: activeStep >= 4,
        },
        {
          step: 5,
          title: 'तात्काळ यूपीआय पेमेंट व डिजिटल पावती',
          time: 'प्रलंबित',
          desc: 'थेट बँक खात्यात रक्कम व ब्लॉकचेन कस्टडी पावती',
          done: activeStep >= 5,
        },
      ],
    },
    hi: {
      telematicsBadge: 'लाइव डोरस्टेप टेलीमैटिक्स',
      inProgressTitle: 'पिकअप #REQ-101 प्रगति पर है',
      etaText: 'अनुमानित समय: 8 मिनट (11:15 AM)',
      doorstepMarker: '🏠 आपका पता (औंध, पुणे)',
      collectorMarker: 'रमेश (0.8 किमी दूर)',
      microHubText: 'पुणे माइक्रो-हब #4 सेक्टर ए',
      collectorName: 'रमेश शिंदे',
      vehicleInfo: 'Piaggio EV लोडर • MH-12-RN-4890',
      ratingText: '4.92 (412 डोरस्टेप पिकअप्स)',
      callBtn: 'कलेक्टर को कॉल करें',
      weighingBtn: 'डिजिटल वजन शुरू करें',
      timelineTitle: 'कस्टडी टाइमलाइन व प्रगति:',
      timeline: [
        {
          step: 1,
          title: 'पिकअप अनुरोध दर्ज हुआ',
          time: '10:45 AM',
          desc: 'अनुमानित 28 किग्रा कबाड़ (रोहन निलय, औंध) बुक किया गया',
          done: true,
        },
        {
          step: 2,
          title: 'कबाड़ीवाला नियुक्त व सत्यापित',
          time: '10:50 AM',
          desc: 'रमेश शिंदे (बैज #408) ने आपका रूट स्वीकार किया',
          done: true,
        },
        {
          step: 3,
          title: 'कलेक्टर रास्ते में है (लाइव GPS)',
          time: '11:05 AM',
          desc: 'ड्राइवर 0.8 किमी दूर EV लोडर से आ रहा है',
          done: true,
          current: true,
        },
        {
          step: 4,
          title: 'दरवाजे पर आगमन व IoT डिजिटल वजन',
          time: 'अनुमानित 11:15 AM',
          desc: 'ब्लूटूथ कांटे से वजन व सरकारी मूल्य गणना',
          done: activeStep >= 4,
        },
        {
          step: 5,
          title: 'तुरंत यूपीआई भुगतान व डिजिटल रसीद',
          time: 'लंबित',
          desc: 'सीधे बैंक खाते में राशि व छेड़छाड़-मुक्त रसीद',
          done: activeStep >= 5,
        },
      ],
    },
    en: {
      telematicsBadge: 'Live Doorstep Telematics',
      inProgressTitle: 'Pickup #REQ-101 in Progress',
      etaText: 'ETA: 8 Mins (11:15 AM)',
      doorstepMarker: '🏠 Your Doorstep (Aundh)',
      collectorMarker: 'Ramesh (0.8 km)',
      microHubText: 'Pune Micro-Hub #4 Sector A',
      collectorName: 'Ramesh Shinde',
      vehicleInfo: 'Piaggio EV Commercial Loader • MH-12-RN-4890',
      ratingText: '4.92 • 412 Doorstep pickups',
      callBtn: 'Call Collector',
      weighingBtn: 'Start IoT Weighing',
      timelineTitle: 'Chain-of-Custody Timeline:',
      timeline: [
        {
          step: 1,
          title: 'Pickup Request Created',
          time: '10:45 AM',
          desc: 'Estimated 28 kg scrap booked at Rohan Nilay, Aundh',
          done: true,
        },
        {
          step: 2,
          title: 'Collector Assigned & Verified',
          time: '10:50 AM',
          desc: 'Ramesh Shinde (Badge #408) accepted your route',
          done: true,
        },
        {
          step: 3,
          title: 'Collector En Route (Live)',
          time: '11:05 AM',
          desc: 'Driver is 0.8 km away in Piaggio EV Loader (MH-12-RN-4890)',
          done: true,
          current: true,
        },
        {
          step: 4,
          title: 'Doorstep Arrival & Digital Weighing',
          time: 'Est. 11:15 AM',
          desc: 'IoT scale weighing & instant rate calculation',
          done: activeStep >= 4,
        },
        {
          step: 5,
          title: 'UPI Payout & Digital Bill',
          time: 'Pending',
          desc: 'Instant bank transfer & tamper-proof custody receipt',
          done: activeStep >= 5,
        },
      ],
    },
  }[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner Status */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                {content.telematicsBadge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {content.inProgressTitle}
            </h2>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl px-3.5 py-2 text-xs font-bold text-purple-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{content.etaText}</span>
          </div>
        </div>

        {/* Live Map Representation */}
        <div className="relative w-full h-64 sm:h-80 bg-purple-50/40 rounded-2xl overflow-hidden border border-purple-200 shadow-inner">
          <div className="absolute inset-0 bg-[#f8f5fd] flex items-center justify-center">
            <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ddd6fe" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path
                d="M 40 260 Q 200 200 380 180 T 700 80"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 40 260 Q 200 200 380 180 T 700 80"
                fill="none"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 280 190 Q 380 180 500 130"
                fill="none"
                stroke="#9333ea"
                strokeWidth="6"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />
            </svg>

            {/* Origin Citizen Marker */}
            <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-md mb-1 whitespace-nowrap">
                {content.doorstepMarker}
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-600 ring-4 ring-purple-200 flex items-center justify-center text-white shadow-lg">
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Collector Moving Vehicle Marker */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
              <div className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold rounded-lg shadow-md mb-1 whitespace-nowrap flex items-center gap-1">
                <Truck className="w-3 h-3" /> {content.collectorMarker}
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-600 ring-4 ring-purple-300 flex items-center justify-center text-white shadow-lg">
                <Truck className="w-4 h-4" />
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-purple-200 rounded-xl px-3 py-1.5 text-xs text-purple-900 font-semibold shadow-xs flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-purple-600" />
              <span>{content.microHubText}</span>
            </div>
          </div>
        </div>

        {/* Collector Information Card */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80"
              alt="Collector Ramesh Shinde"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-900">{content.collectorName}</h4>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-purple-700/80 mt-0.5">
                {content.vehicleInfo}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-amber-600 font-semibold">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800">{content.ratingText}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:+919822014829"
              className="flex-1 sm:flex-initial px-4 py-2 bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>{content.callBtn}</span>
            </a>
            <button
              onClick={() => {
                setActiveStep(4);
                if (onStartWeighing) onStartWeighing();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>{content.weighingBtn}</span>
            </button>
          </div>
        </div>

        {/* Pickup Status Timeline */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
            {content.timelineTitle}
          </h3>
          <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-200">
            {content.timeline.map((t) => (
              <div key={t.step} className="flex items-start gap-3.5 relative">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                    t.current
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white ring-4 ring-purple-200'
                      : t.done
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {t.done && !t.current ? '✓' : t.step}
                </div>
                <div className="flex-1 bg-white border border-purple-200/80 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{t.title}</h4>
                    <span className="text-[10px] text-purple-600/80 font-mono">{t.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
