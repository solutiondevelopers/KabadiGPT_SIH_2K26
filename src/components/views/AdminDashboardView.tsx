import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Building2,
  ShieldCheck,
  TrendingUp,
  FileText,
  Search,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_ANOMALY_ALERTS } from '../../data/mockData';

interface AdminDashboardViewProps {
  lang: Language;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ lang }) => {
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    type: string;
    severity: string;
    title: string;
    description: string;
    batchId?: string;
    facilityName: string;
    timestamp: string;
    status: 'INVESTIGATING' | 'FLAGGED' | 'RESOLVED';
  }>>(MOCK_ANOMALY_ALERTS);

  const content = {
    mr: {
      badge: 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) नियामक पोर्टल',
      title: 'राज्यस्तरीय चक्रीय अर्थव्यवस्था व ऑडिट डॅशबोर्ड',
      subtitle: 'सर्व ६ संकलन पातळ्यांवरील थेट फॉरेन्सिक ऑडिट, वजन तफावत व डिजिटल सील तपासणी.',
      auditorBadge: 'MPCB अधिकृत ऑडिटर',
      stat1Title: 'मासिक गोळा केलेला कचरा',
      stat1Sub: '९४.२% प्रक्रिया पूर्ण',
      stat2Title: 'सक्रिय प्रमाणित कबाडीवाले',
      stat2Sub: '३४२ वाहने जीपीएसने ट्रॅक',
      stat3Title: 'जारी केलेले EPR क्रेडिट्स',
      stat3Sub: '१४२ FMCG ब्रँड्स ऑफसेट',
      alertsTitle: 'एआय सुरक्षा व फसवणूक नियंत्रण (Anomaly Alerts)',
      auditTrailTitle: 'थेट ब्लॉकचेन कस्टडी ऑडिट लेजर',
      resolveBtn: 'तक्रार सोडवा (Resolve)',
      resolvedBadge: 'सोडवले ✓',
    },
    hi: {
      badge: 'महाराष्ट्र प्रदूषण नियंत्रण बोर्ड (MPCB) नियामक पोर्टल',
      title: 'राज्यस्तरीय चक्रीय अर्थव्यवस्था व ऑडिट डैशबोर्ड',
      subtitle: 'सभी 6 स्तरों पर लाइव फोरेंसिक ऑडिट, भार विसंगति व डिजिटल सील सत्यापन।',
      auditorBadge: 'MPCB अधिकृत ऑडिटर',
      stat1Title: 'मासिक संकलित अपशिष्ट',
      stat1Sub: '94.2% प्रसंस्करण पूर्ण',
      stat2Title: 'सक्रिय सत्यापित कबाड़ीवाले',
      stat2Sub: '342 वाहन जीपीएस से जुड़े',
      stat3Title: 'निर्गमित EPR क्रेडिट्स',
      stat3Sub: '142 FMCG ब्रांड्स ऑफसेट',
      alertsTitle: 'एआई सुरक्षा व विसंगति अलर्ट्स (Anomaly Alerts)',
      auditTrailTitle: 'लाइव ब्लॉकचेन कस्टडी ऑडिट लेजर',
      resolveBtn: 'शिकायत हल करें (Resolve)',
      resolvedBadge: 'हल किया ✓',
    },
    en: {
      badge: 'Maharashtra Pollution Control Board (MPCB) Regulatory Portal',
      title: 'Statewide Circular Economy & Audit Dashboard',
      subtitle: 'Real-time forensic chain of custody, tare discrepancy monitoring & tamper seal fraud watch.',
      auditorBadge: 'MPCB Certified Auditor',
      stat1Title: 'Monthly Diverted Scrap',
      stat1Sub: '94.2% processing yield',
      stat2Title: 'Verified Field Collectors',
      stat2Sub: '342 GPS telematics active',
      stat3Title: 'EPR Credits Minted',
      stat3Sub: '142 FMCG brand offsets',
      alertsTitle: 'AI Anomaly & Fraud Watchdog Alerts',
      auditTrailTitle: 'Live Custody Blockchain Ledger',
      resolveBtn: 'Resolve Alert',
      resolvedBadge: 'Resolved ✓',
    },
  }[lang];

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'RESOLVED' as const } : a))
    );
    alert(lang === 'mr' ? `अलर्ट #${id} सोडवला गेला!` : lang === 'hi' ? `अलर्ट #${id} हल हुआ!` : `Alert #${id} resolved!`);
  };

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

          <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>{content.auditorBadge}</span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-100">
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.stat1Title}</span>
            <p className="text-xl font-extrabold text-slate-900 font-mono">1,420.8 Tons</p>
            <p className="text-[10px] text-emerald-700 font-semibold">{content.stat1Sub}</p>
          </div>
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.stat2Title}</span>
            <p className="text-xl font-extrabold text-purple-900 font-mono">1,842 Agents</p>
            <p className="text-[10px] text-purple-700 font-semibold">{content.stat2Sub}</p>
          </div>
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.stat3Title}</span>
            <p className="text-xl font-extrabold text-indigo-700 font-mono">9,420 EPR-MT</p>
            <p className="text-[10px] text-indigo-700 font-semibold">{content.stat3Sub}</p>
          </div>
        </div>
      </div>

      {/* Anomaly Alerts List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>{content.alertsTitle}</span>
        </h3>

        <div className="space-y-3">
          {alerts.map((al) => {
            const isResolved = al.status === 'RESOLVED';
            return (
              <div
                key={al.id}
                className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        al.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {al.severity}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{al.title}</h4>
                  </div>
                  <span className="text-[11px] text-slate-400">{al.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100">
                  {al.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono font-bold text-purple-700">
                    {al.facilityName} ({al.batchId || 'N/A'})
                  </span>

                  {isResolved ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {content.resolvedBadge}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleResolve(al.id)}
                      className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      {content.resolveBtn}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
