import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Navigation,
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { Language } from '../types';

interface PickupMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  pickupId?: string;
  customerName?: string;
  address?: string;
}

export const PickupMapModal: React.FC<PickupMapModalProps> = ({
  isOpen,
  onClose,
  lang,
  pickupId = 'REQ-101',
  customerName = 'Anand Deshmukh',
  address = 'B-402, Rohan Nilay, Aundh, Pune',
}) => {
  if (!isOpen) return null;

  const content = {
    mr: {
      title: 'लाइव्ह जीपीएस रूट व नेव्हिगेशन',
      subtitle: 'कलेक्टर वर्तमान स्थान ते घरगुती पिकअप पत्ता (औंध, पुणे)',
      eta: 'अंदाजे वेळ: ७ मिनिटे (२.४ किमी)',
      customer: 'ग्राहक:',
      collector: 'कलेक्टर:',
      warehouse: 'MRF गोदाम:',
      turnByTurn: 'टर्न-बाय-टर्न दिशा:',
      steps: [
        '१. औंध प्रभाग हब #४ वरून एनसीसी रोडकडे वळा (०.४ किमी)',
        '२. डीपी रोडवर सरळ पुढे जा (१.२ किमी)',
        '३. रोहन निलय गेट क्रमांक २ जवळ पोहोचा',
      ],
      close: 'बंद करा',
      acceptAndNavigate: 'पिकअप स्वीकारले व नेव्हिगेट करा',
    },
    hi: {
      title: 'लाइव जीपीएस रूट व नेविगेशन',
      subtitle: 'कलेक्टर वर्तमान स्थान से घरेलू पिकअप पता (औंध, पुणे)',
      eta: 'अनुमानित समय: 7 मिनट (2.4 किमी)',
      customer: 'ग्राहक:',
      collector: 'कलेक्टर:',
      warehouse: 'MRF वेयरहाउस:',
      turnByTurn: 'टर्न-बाय-टर्न नेविगेशन:',
      steps: [
        '1. औंध वार्ड हब #4 से एनसीसी रोड की ओर मुड़ें (0.4 किमी)',
        '2. डीपी रोड पर सीधे आगे बढ़ें (1.2 किमी)',
        '3. रोहन निलय गेट नंबर 2 के पास पहुंचें',
      ],
      close: 'बंद करें',
      acceptAndNavigate: 'पिकअप स्वीकार करें व नेविगेट करें',
    },
    en: {
      title: 'Live GPS Route & Navigation',
      subtitle: 'Collector Real-Time Telematics & Routing Corridor',
      eta: 'Live ETA: 7 Mins (2.4 km remaining)',
      customer: 'Customer:',
      collector: 'Collector:',
      warehouse: 'Warehouse Hub:',
      turnByTurn: 'Turn-by-Turn Navigation:',
      steps: [
        '1. Depart Aundh Ward Hub #4 toward DP Road (0.4 km)',
        '2. Continue straight on DP Road past Bremen Chowk (1.2 km)',
        '3. Arrive at Rohan Nilay Gate #2 for doorstep weighing',
      ],
      close: 'Close Map',
      acceptAndNavigate: 'Accept & Open Live Route',
    },
  }[lang];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-purple-200 max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50/70 via-white to-purple-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{content.title}</h3>
              <p className="text-xs text-purple-700/80">{content.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-900 hover:bg-purple-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Map View */}
        <div className="relative w-full h-72 sm:h-80 bg-[#f8f5fd] overflow-hidden border-b border-purple-100">
          <svg className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridMap" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#e2d9f3" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridMap)" />
            {/* Route Polyline */}
            <path
              d="M 60 220 Q 180 140 320 160 T 580 80"
              fill="none"
              stroke="#9333ea"
              strokeWidth="6"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </svg>

          {/* Warehouse Pin */}
          <div className="absolute top-1/4 left-16 flex flex-col items-center">
            <div className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded shadow mb-1">
              🏭 MRF Hub
            </div>
            <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">
              📍
            </div>
          </div>

          {/* Collector Pin */}
          <div className="absolute top-1/2 left-1/3 flex flex-col items-center animate-bounce">
            <div className="px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded shadow mb-1">
              🛵 Ramesh (0.8 km)
            </div>
            <div className="w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs shadow-md">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Customer Pin */}
          <div className="absolute top-16 right-20 flex flex-col items-center">
            <div className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold rounded shadow mb-1">
              🏠 {customerName}
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-md">
              <MapPin className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Live ETA Floating Pill */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold text-purple-900 shadow-md flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600 animate-spin" />
            <span>{content.eta}</span>
          </div>
        </div>

        {/* Turn-by-turn Navigation Details */}
        <div className="p-4 sm:p-5 space-y-4 bg-purple-50/40">
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
              {content.turnByTurn}
            </h4>
            <div className="space-y-1 text-xs text-slate-700 font-medium bg-white p-3 rounded-xl border border-purple-200/80 shadow-2xs">
              {content.steps.map((st, i) => (
                <p key={i} className="py-0.5">{st}</p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-purple-200 hover:bg-purple-50 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              {content.close}
            </button>
            <button
              onClick={() => {
                alert(lang === 'mr' ? 'पिकअप यशस्वीरित्या स्वीकारले! जीपीएस नेव्हिगेशन सुरू झाले.' : lang === 'hi' ? 'पिकअप स्वीकार किया गया!' : 'Pickup accepted! Live navigation route active.');
                onClose();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{content.acceptAndNavigate}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
