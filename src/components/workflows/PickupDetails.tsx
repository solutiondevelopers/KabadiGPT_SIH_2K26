import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Scale,
  Navigation,
  Package,
  User,
  ShieldCheck,
  CheckCircle,
  Play,
  RefreshCw,
} from 'lucide-react';
import { Language, PickupRequest } from '../../types';
import { MOCK_PICKUPS } from '../../data/mockData';
import { startPickup } from '../../services/firebaseService';

interface PickupDetailsProps {
  lang: Language;
  pickup?: PickupRequest;
  onStartWeighing?: (pickup: PickupRequest) => void;
  onOpenMap?: () => void;
}

export const PickupDetails: React.FC<PickupDetailsProps> = ({
  lang,
  pickup = MOCK_PICKUPS[0],
  onStartWeighing,
  onOpenMap,
}) => {
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>(
    pickup.status?.toUpperCase() || 'ACCEPTED'
  );

  const content = {
    mr: {
      title: 'पिकअप तपशील व संपर्क (Pickup Details)',
      customer: 'विक्रेता ग्राहक',
      address: 'पत्ता',
      scheduled: 'वेळ स्लॉट',
      scrapItems: 'साहित्याची यादी',
      estWeight: 'अंदाजे वजन',
      estAmount: 'अंदाजे किंमत',
      startBtn: 'Start Pickup (पिकअप सुरू करा)',
      startWeigh: 'डिजिटल वजन सुरू करा (Digital Weighing)',
      navigate: 'मार्गदर्शक नकाशा',
      call: 'कॉल करा',
      verified: 'केवायसी सत्यापित नागरिक',
      arrivedNotice: 'तुम्ही ग्राहकाच्या दारात पोहोचला आहात. वजन सुरू करण्यासाठी खालील बटण दाबा.',
    },
    hi: {
      title: 'पिकअप विवरण व संपर्क (Pickup Details)',
      customer: 'नागरिक',
      address: 'पता',
      scheduled: 'समय स्लॉट',
      scrapItems: 'कबाड़ सामग्री',
      estWeight: 'अनुमानित वजन',
      estAmount: 'अनुमानित मूल्य',
      startBtn: 'Start Pickup (पिकअप शुरू करें)',
      startWeigh: 'डिजिटल तौल शुरू करें (Digital Weighing)',
      navigate: 'रूट नेविगेशन',
      call: 'कॉल करें',
      verified: 'केवाईसी सत्यापित नागरिक',
      arrivedNotice: 'आप ग्राहक के पते पर पहुँच चुके हैं। वजन शुरू करने के लिए नीचे क्लिक करें।',
    },
    en: {
      title: 'Pickup Details & Arrival',
      customer: 'Citizen',
      address: 'Address',
      scheduled: 'Time Slot',
      scrapItems: 'Declared Scrap Items',
      estWeight: 'Est. Weight',
      estAmount: 'Est. Payout',
      startBtn: 'Start Pickup',
      startWeigh: 'Open Digital Scale',
      navigate: 'Open Navigation',
      call: 'Call Citizen',
      verified: 'KYC Verified Household',
      arrivedNotice: 'Arrived at doorstep. Ready to start IoT digital weighing.',
    },
  }[lang];

  const handleStartPickup = async () => {
    setIsStarting(true);
    try {
      await startPickup(pickup.id);
      setCurrentStatus('IN_PROGRESS');
      if (onStartWeighing) {
        onStartWeighing({ ...pickup, status: 'IN_PROGRESS' });
      }
    } catch (e) {
      console.warn('Start pickup status update notice:', e);
      if (onStartWeighing) {
        onStartWeighing({ ...pickup, status: 'IN_PROGRESS' });
      }
    } finally {
      setIsStarting(false);
    }
  };

  const materialsList =
    pickup.materials || pickup.materialTypes || ['Old Newspaper', 'Cardboard', 'Plastics'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 my-2 max-w-xl font-sans">
      <div className="flex items-start justify-between mb-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold">
              {pickup.id}
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                currentStatus === 'IN_PROGRESS'
                  ? 'bg-blue-100 text-blue-900 border border-blue-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              {currentStatus}
            </span>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mt-1">
            {content.title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{content.verified}</span>
        </span>
      </div>

      {/* Arrival notice prompt */}
      <div className="mb-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>{content.arrivedNotice}</span>
      </div>

      {/* Customer Info Card */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {pickup.customerName || 'Anand Deshmukh'}
              </h4>
              <p className="text-xs text-slate-500 font-mono">{pickup.phone || '+91 98220 14829'}</p>
            </div>
          </div>
          <a
            href={`tel:${pickup.phone || '+919822014829'}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{content.call}</span>
          </a>
        </div>

        <div className="pt-2 border-t border-slate-200/80 flex items-start gap-2 text-xs text-slate-700">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{pickup.address || 'B-402, Rohan Nilay, Aundh, Pune - 411007'}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{pickup.slot || pickup.preferredPickupTime || 'Today, 5 PM - 7 PM'}</span>
          </div>
          <span className="text-emerald-700 font-bold font-mono">
            {pickup.distance || '0.8 km'}
          </span>
        </div>
      </div>

      {/* Declared Materials */}
      <div className="mb-3">
        <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          {content.scrapItems}
        </h4>
        <div className="space-y-1.5">
          {materialsList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60"
            >
              <div className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-800">{item}</span>
              </div>
              <span className="font-mono font-bold text-slate-900">
                ~{pickup.estimatedWeight || '12 kg'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA: [Start Pickup] button directly requested by user prompt */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <button
          onClick={handleStartPickup}
          disabled={isStarting}
          className="w-full sm:flex-1 min-h-[46px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
        >
          {isStarting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>{content.startBtn}</span>
            </>
          )}
        </button>

        {onOpenMap && (
          <button
            onClick={onOpenMap}
            className="w-full sm:w-auto min-h-[46px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-emerald-700" />
            <span>{content.navigate}</span>
          </button>
        )}
      </div>
    </div>
  );
};
