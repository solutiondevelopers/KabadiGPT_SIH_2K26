import React, { useState } from 'react';
import {
  Layers,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Package,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_WAREHOUSE_STREAMS } from '../../data/mockData';

interface WarehouseOpsViewProps {
  lang: Language;
}

export const WarehouseOpsView: React.FC<WarehouseOpsViewProps> = ({ lang }) => {
  const [streams, setStreams] = useState(MOCK_WAREHOUSE_STREAMS);
  const [incomingWeight, setIncomingWeight] = useState(418.5);
  const [expectedWeight] = useState(420.0);

  const variancePercent = Math.abs((incomingWeight - expectedWeight) / expectedWeight) * 100;
  const isVarianceHigh = variancePercent > 3.0;

  const content = {
    mr: {
      badge: 'साहित्य पुनर्प्राप्ती केंद्र (MRF हब)',
      title: 'पुणे मध्यवर्ती MRF सॉर्टिंग केंद्र',
      subtitle: 'पर्यवेक्षक: महेंद्र गायकवाड • गेट #२ ऑप्टिकल NIR सॉर्टिंग व बेलिंग कॉम्प्रेसर सक्रिय',
      inventoryPill: 'सध्याचा साठा: १९.१६ टन',
      gateTitle: 'इनटेक गेट वजन पडताळणी (बॅच #PUN-BAL-2026-801)',
      tareActive: 'काटा सक्रिय',
      expectedWeight: 'अपेक्षित कलेक्टर वजन:',
      scaleReading: 'MRF प्रत्यक्ष काटा मोजणी:',
      varianceDelta: 'वजन तफावत (Variance):',
      mismatchFlag: '(तफावत जास्त - Flagged)',
      withinNorm: '(३% निकषाच्या आत ✓)',
      acceptIntake: 'वजन स्वीकारा व ऑप्टिकल सॉर्टरकडे पाठवा',
      streamsTitle: '५-प्रवाह साठा व शुद्धता ग्रेड',
    },
    hi: {
      badge: 'सामग्री पुनर्प्राप्ति केंद्र (MRF हब)',
      title: 'पुणे केंद्रीय MRF सॉर्टिंग स्टेशन',
      subtitle: 'पर्यवेक्षक: महेंद्र गायकवाड़ • गेट #2 ऑप्टिकल NIR सॉर्टिंग व बेलिंग एक्टिव',
      inventoryPill: 'वर्तमान स्टॉक: 19.16 टन',
      gateTitle: 'इनटेक गेट भार सत्यापन (बैच #PUN-BAL-2026-801)',
      tareActive: 'कांटा एक्टिव',
      expectedWeight: 'अपेक्षित कलेक्टर भार:',
      scaleReading: 'MRF कांटा वास्तविक भार:',
      varianceDelta: 'भार अंतर (Variance):',
      mismatchFlag: '(अंतर अधिक - Flagged)',
      withinNorm: '(3% मानक के भीतर ✓)',
      acceptIntake: 'भार स्वीकार कर ऑप्टिकल सॉर्टर को भेजें',
      streamsTitle: '5-धारा स्टॉक व शुद्धता ग्रेड',
    },
    en: {
      badge: 'Material Recovery Facility (MRF) Hub',
      title: 'Pune Central MRF & Sorting Station',
      subtitle: 'Supervisor: Mahendra Gaikwad • Gate #2 Optical NIR Sorting & Baling Press Active',
      inventoryPill: 'Current Inventory: 19.16 Tons',
      gateTitle: 'Intake Gate Reconciliation (Batch #PUN-BAL-2026-801)',
      tareActive: 'Tare Scale Active',
      expectedWeight: 'Expected Collector Weight:',
      scaleReading: 'MRF Gross Scale Reading:',
      varianceDelta: 'Variance Delta:',
      mismatchFlag: '(Mismatch Flagged)',
      withinNorm: '(Within 3% Norm)',
      acceptIntake: 'Accept Intake & Route to Optical Sorter',
      streamsTitle: '5-Stream Inventory & Purity Grades',
    },
  }[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
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

          <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold self-start sm:self-auto shadow-2xs">
            {content.inventoryPill}
          </div>
        </div>
      </div>

      {/* Intake Gate Weighbridge Scanner */}
      <div className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-600" />
            <span>{content.gateTitle}</span>
          </h3>
          <span className="font-mono text-xs font-bold text-purple-600/80">{content.tareActive}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-xs space-y-1">
            <span className="text-purple-700/80 font-medium">{content.expectedWeight}</span>
            <div className="text-lg font-bold font-mono text-slate-900">{expectedWeight} kg</div>
          </div>

          <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-xl text-xs space-y-1">
            <span className="text-purple-700/80 font-medium">{content.scaleReading}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                value={incomingWeight}
                onChange={(e) => setIncomingWeight(parseFloat(e.target.value) || 0)}
                className="w-24 px-2 py-0.5 bg-white border border-purple-300 rounded font-bold font-mono text-purple-900 text-sm"
              />
              <span className="text-slate-500 font-bold">kg</span>
            </div>
          </div>

          <div
            className={`p-3 border rounded-xl text-xs space-y-1 ${
              isVarianceHigh
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <span className="font-semibold">{content.varianceDelta}</span>
            <div className="text-lg font-bold font-mono">
              {variancePercent.toFixed(2)}% {isVarianceHigh ? content.mismatchFlag : content.withinNorm}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={() => alert(lang === 'mr' ? 'बॅच #PUN-BAL-2026-801 स्वीकारली गेली व बे #४ मध्ये स्टोअर केली.' : lang === 'hi' ? 'बैच स्वीकृत!' : 'Batch intake verified.')}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            {content.acceptIntake}
          </button>
        </div>
      </div>

      {/* Streams Inventory */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">{content.streamsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {streams.map((st, i) => (
            <div key={i} className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{st.materialType}</span>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded">
                  {st.purityGrade}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{st.currentStockKg} kg / {st.capacityKg} kg</span>
                <span className="font-bold text-purple-700 font-mono">₹{st.marketRateKg}/kg</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                  style={{ width: `${(st.currentStockKg / st.capacityKg) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
