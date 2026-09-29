import React from 'react';
import {
  X,
  ShieldCheck,
  Star,
  MapPin,
  Truck,
  Phone,
  Scale,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';

interface RightContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  contextType?: 'collector' | 'batch' | 'impact' | 'receipt';
}

export const RightContextPanel: React.FC<RightContextPanelProps> = ({
  isOpen,
  onClose,
  lang,
  contextType = 'collector',
}) => {
  if (!isOpen) return null;

  const content = {
    mr: {
      panelHeader: 'थेट ऑपरेशन्स माहिती',
      assignedCollector: 'नियुक्त प्रमाणित कबाडीवाला',
      verifiedBadge: 'शासकीय प्रमाणित',
      vehicleTitle: 'वाहन माहिती:',
      vehicleDesc: 'पियाजिओ EV कमर्शियल लोडर (MH-12-RN-4890)',
      hubTitle: 'मायक्रो-हब:',
      hubDesc: 'औंध प्रभाग केंद्र #४, पुणे',
      ratingText: '४.९२ (४१२ पूर्ण पिकअप्स)',
      callBtn: 'कलेक्टरला थेट कॉल करा',
      rateCardTitle: 'आजचे पुणे हमीभाव दर',
      paperRate: 'रद्दी कागद / वर्तमानपत्रे: ₹१४/किलो',
      metalRate: 'लोखंड भंगार: ₹३०/किलो',
      plasticRate: 'PET बाटल्या: ₹१८/किलो',
      copperRate: 'तांबे वायर: ₹४६०/किलो',
      guaranteeNote: 'सर्व दर MPCB व स्थानिक बाजार हमीभावाने निश्चित केलेले आहेत.',
    },
    hi: {
      panelHeader: 'लाइव ऑपरेशन्स जानकारी',
      assignedCollector: 'नियुक्त सत्यापित कबाड़ीवाला',
      verifiedBadge: 'सरकारी सत्यापित',
      vehicleTitle: 'वाहन जानकारी:',
      vehicleDesc: 'Piaggio EV कमर्शियल लोडर (MH-12-RN-4890)',
      hubTitle: 'माइक्रो-हब:',
      hubDesc: 'औंध वार्ड केंद्र #4, पुणे',
      ratingText: '4.92 (412 पूर्ण पिकअप्स)',
      callBtn: 'कलेक्टर को कॉल करें',
      rateCardTitle: 'आज के पुणे सरकारी भाव',
      paperRate: 'रद्दी अखबार: ₹14/किग्रा',
      metalRate: 'लोहा कबाड़: ₹30/किग्रा',
      plasticRate: 'PET बोतलें: ₹18/किग्रा',
      copperRate: 'तांबा तार: ₹460/किग्रा',
      guaranteeNote: 'सभी दरें MPCB व स्थानीय बाजार समिति द्वारा निर्धारित हैं।',
    },
    en: {
      panelHeader: 'Live Operations Context',
      assignedCollector: 'Assigned Verified Collector',
      verifiedBadge: 'Govt Verified',
      vehicleTitle: 'Vehicle Spec:',
      vehicleDesc: 'Piaggio EV Commercial Loader (MH-12-RN-4890)',
      hubTitle: 'Micro-Hub:',
      hubDesc: 'Aundh Ward Center #4, Pune',
      ratingText: '4.92 • 412 Completed Pickups',
      callBtn: 'Call Collector Directly',
      rateCardTitle: 'Today’s Spot Market Rates',
      paperRate: 'Newspaper (Raddi): ₹14/kg',
      metalRate: 'Iron Scrap: ₹30/kg',
      plasticRate: 'PET Bottles: ₹18/kg',
      copperRate: 'Copper Wire: ₹460/kg',
      guaranteeNote: 'Calibrated Bluetooth IoT weighing scales used on-site.',
    },
  }[lang];

  return (
    <aside className="w-80 border-l border-purple-200/80 bg-white/90 backdrop-blur-md p-4 flex flex-col justify-between hidden xl:flex shrink-0 overflow-y-auto shadow-sm shadow-purple-500/5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {content.panelHeader}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-purple-900 hover:bg-purple-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Collector Profile Card */}
        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
            {content.assignedCollector}
          </span>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80"
              alt="Collector Ramesh Shinde"
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/30"
            />
            <div>
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-bold text-slate-900">Ramesh Shinde</h4>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-[11px] text-purple-700/80 font-semibold">{content.verifiedBadge}</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-1 border-t border-purple-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400">{content.vehicleTitle}</span>
              <p className="font-semibold text-slate-800 text-[11px]">{content.vehicleDesc}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400">{content.hubTitle}</span>
              <p className="font-semibold text-slate-800 text-[11px]">{content.hubDesc}</p>
            </div>
          </div>

          <a
            href="tel:+919822014829"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{content.callBtn}</span>
          </a>
        </div>

        {/* Spot Rate Quick Reference */}
        <div className="p-3.5 bg-white border border-purple-200 rounded-2xl space-y-2 shadow-2xs text-xs">
          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-purple-600" />
            <span>{content.rateCardTitle}</span>
          </h4>
          <div className="space-y-1 text-[11px] text-slate-700">
            <p className="flex justify-between"><span>📰 {content.paperRate.split(':')[0]}</span> <span className="font-bold text-purple-900">₹14/kg</span></p>
            <p className="flex justify-between"><span>🔩 {content.metalRate.split(':')[0]}</span> <span className="font-bold text-purple-900">₹30/kg</span></p>
            <p className="flex justify-between"><span>🧴 {content.plasticRate.split(':')[0]}</span> <span className="font-bold text-purple-900">₹18/kg</span></p>
            <p className="flex justify-between"><span>⚡ {content.copperRate.split(':')[0]}</span> <span className="font-bold text-purple-900">₹460/kg</span></p>
          </div>
          <p className="text-[10px] text-purple-700/80 pt-1 border-t border-purple-100">
            {content.guaranteeNote}
          </p>
        </div>
      </div>
    </aside>
  );
};
