import React, { useState } from 'react';
import {
  Scale,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Language } from '../../types';

interface DigitalWeighingViewProps {
  lang: Language;
  onConfirmTransaction?: (receiptData: any) => void;
  onNavigateToBill?: () => void;
}

export const DigitalWeighingView: React.FC<DigitalWeighingViewProps> = ({
  lang,
  onConfirmTransaction,
  onNavigateToBill,
}) => {
  const [scaleConnected, setScaleConnected] = useState(true);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const content = {
    mr: {
      badge: 'प्रमाणित IoT डिजिटल वजन काटा',
      title: 'डिजिटल वजन व हमीभाव पडताळणी',
      subtitle: 'घरगुती प्राथमिक एआय अंदाज आणि ब्लूटूथ प्रमाणित काट्यावरील प्रत्यक्ष वजन यांची थेट तुलना.',
      scaleOnline: 'काटा BT-992 जोडला आहे',
      scaleOffline: 'काटा डिस्कनेक्ट झाला',
      tableCategory: 'साहित्य प्रकार',
      tableAiEst: 'एआय अंदाज',
      tableActual: 'प्रत्यक्ष वजन (काटा)',
      tableRate: 'हमीभाव दर',
      tableTotal: 'एकूण रक्कम',
      totalWeight: 'एकूण प्रत्यक्ष वजन:',
      totalPayout: 'एकूण देय रक्कम:',
      raiseDispute: 'वजन / दराबाबत तक्रार नोंदवा',
      confirmPay: 'वजन मान्य करून यूपीआय पेमेंट मिळवा',
      disputeTitle: 'तक्रार निवारण केंद्र',
      disputeDesc: 'जर वजन किंवा दर समाधानकारक वाटत नसेल, तर लगेच तक्रार नोंदवा. वरिष्ठ निरीक्षक १० मिनिटांत पडताळणी करतील.',
      disputePlaceholder: 'तक्रारीचे कारण लिहा...',
      cancelBtn: 'रद्द करा',
      submitDispute: 'तक्रार पाठवा',
    },
    hi: {
      badge: 'सत्यापित IoT डिजिटल कांटा',
      title: 'डिजिटल वजन व मूल्य सत्यापन',
      subtitle: 'घरेलू एआई अनुमान और ब्लूटूथ कांटे के वास्तविक वजन की लाइव तुलना।',
      scaleOnline: 'कांटा BT-992 कनेक्टेड',
      scaleOffline: 'कांटा डिस्कनेक्ट',
      tableCategory: 'सामग्री श्रेणी',
      tableAiEst: 'एआई अनुमान',
      tableActual: 'वास्तविक भार (कांटा)',
      tableRate: 'सरकारी दर',
      tableTotal: 'कुल राशि',
      totalWeight: 'कुल वास्तविक भार:',
      totalPayout: 'कुल देय राशि:',
      raiseDispute: 'भार / मूल्य विवाद दर्ज करें',
      confirmPay: 'वजन स्वीकार कर यूपीआई प्राप्त करें',
      disputeTitle: 'विवाद निवारण केंद्र',
      disputeDesc: 'यदि वजन या भाव में असंतोष हो तो तुरंत शिकायत दर्ज करें। वरिष्ठ निरीक्षक 10 मिनट में समाधान करेंगे।',
      disputePlaceholder: 'शिकायत का विवरण लिखें...',
      cancelBtn: 'रद्द करें',
      submitDispute: 'शिकायत भेजें',
    },
    en: {
      badge: 'Verified IoT Field Scale',
      title: 'Digital Weighing & Spot Price',
      subtitle: 'Comparing initial citizen AI estimate with certified Bluetooth scale tare weight.',
      scaleOnline: 'Scale BT-992 Online',
      scaleOffline: 'Scale Disconnected',
      tableCategory: 'Material Category',
      tableAiEst: 'AI Estimate',
      tableActual: 'Actual Weight (Scale)',
      tableRate: 'Spot Rate',
      tableTotal: 'Total Value',
      totalWeight: 'Total Actual Weight:',
      totalPayout: 'Total Payout Amount:',
      raiseDispute: 'Raise Tare Dispute',
      confirmPay: 'Confirm Weight & Receive UPI Payout',
      disputeTitle: 'Dispute Resolution Center',
      disputeDesc: 'If tare weight or spot pricing does not match expectations, lodge a quick complaint.',
      disputePlaceholder: 'Describe reason for dispute...',
      cancelBtn: 'Cancel',
      submitDispute: 'Submit Dispute',
    },
  }[lang];

  const [items, setItems] = useState<
    Array<{
      id: string;
      name: string;
      nameMr: string;
      nameHi: string;
      icon: string;
      estimatedKg: number;
      actualWeightKg: number;
      ratePerKg: number;
    }>
  >([
    {
      id: 'it-1',
      name: 'Old Newspaper (Raddi)',
      nameMr: 'जुनी रद्दी वर्तमानपत्रे',
      nameHi: 'पुराना अखबार (रद्दी)',
      icon: '📰',
      estimatedKg: 10.0,
      actualWeightKg: 15.2,
      ratePerKg: 14,
    },
    {
      id: 'it-2',
      name: 'Iron Scrap (Loha)',
      nameMr: 'लोखंड भंगार (लोहा)',
      nameHi: 'लोहा कबाड़',
      icon: '🔩',
      estimatedKg: 15.0,
      actualWeightKg: 13.2,
      ratePerKg: 30,
    },
    {
      id: 'it-3',
      name: 'PET Plastic Bottles',
      nameMr: 'प्लास्टिक बाटल्या (PET)',
      nameHi: 'प्लास्टिक की बोतलें (PET)',
      icon: '🧴',
      estimatedKg: 3.0,
      actualWeightKg: 3.8,
      ratePerKg: 18,
    },
  ]);

  const calculateTotalActualWeight = () => {
    return items.reduce((sum, item) => sum + item.actualWeightKg, 0);
  };

  const calculateTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.actualWeightKg * item.ratePerKg, 0);
  };

  const handleUpdateActualWeight = (id: string, newWeight: number) => {
    setItems(
      items.map((it) => (it.id === id ? { ...it, actualWeightKg: Math.max(0.1, newWeight) } : it))
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
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

          {/* Bluetooth Scale Status Pill */}
          <button
            onClick={() => setScaleConnected(!scaleConnected)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
              scaleConnected
                ? 'bg-purple-50 border-purple-300 text-purple-900'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            <Wifi className={`w-3.5 h-3.5 ${scaleConnected ? 'text-purple-600 animate-pulse' : 'text-rose-500'}`} />
            <span>{scaleConnected ? content.scaleOnline : content.scaleOffline}</span>
          </button>
        </div>

        {/* Live Weighed Items Table */}
        <div className="overflow-x-auto border border-purple-200 rounded-2xl bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-bold uppercase border-b border-purple-200 text-[11px]">
              <tr>
                <th className="p-3.5">{content.tableCategory}</th>
                <th className="p-3.5">{content.tableAiEst}</th>
                <th className="p-3.5">{content.tableActual}</th>
                <th className="p-3.5">{content.tableRate}</th>
                <th className="p-3.5 text-right">{content.tableTotal}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {items.map((it) => {
                const itemName = lang === 'mr' ? it.nameMr : lang === 'hi' ? it.nameHi : it.name;
                return (
                  <tr key={it.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-xl">{it.icon}</span>
                      <span>{itemName}</span>
                    </td>
                    <td className="p-3.5 text-purple-600 font-mono">~{it.estimatedKg} kg</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={it.actualWeightKg}
                          onChange={(e) =>
                            handleUpdateActualWeight(it.id, parseFloat(e.target.value) || 0)
                          }
                          className="w-20 px-2 py-1 bg-purple-50/60 border border-purple-300 rounded-lg text-slate-900 font-bold font-mono text-xs focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-slate-500 font-bold">kg</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-mono font-semibold">₹{it.ratePerKg}/kg</td>
                    <td className="p-3.5 text-right font-extrabold text-purple-700 font-mono text-sm">
                      ₹{(it.actualWeightKg * it.ratePerKg).toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-purple-50/90 font-bold border-t border-purple-200 text-slate-900">
              <tr>
                <td className="p-3.5">{content.totalWeight}</td>
                <td className="p-3.5 font-mono text-purple-600">~28.0 kg</td>
                <td className="p-3.5 font-mono text-purple-900 font-extrabold">
                  {calculateTotalActualWeight().toFixed(1)} kg
                </td>
                <td className="p-3.5 text-purple-600 font-medium">{content.totalPayout}</td>
                <td className="p-3.5 text-right text-base text-purple-700 font-extrabold font-mono">
                  ₹{calculateTotalAmount().toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setDisputeModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 border border-purple-200 hover:bg-purple-50 text-purple-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>{content.raiseDispute}</span>
          </button>

          <button
            onClick={() => {
              if (onNavigateToBill) onNavigateToBill();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{content.confirmPay}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dispute Modal */}
      {disputeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-purple-200 max-w-md w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>{content.disputeTitle}</span>
            </h3>
            <p className="text-xs text-slate-600">
              {content.disputeDesc}
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder={content.disputePlaceholder}
              className="w-full p-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDisputeModalOpen(false)}
                className="px-3.5 py-1.5 border border-purple-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                {content.cancelBtn}
              </button>
              <button
                onClick={() => {
                  alert(lang === 'mr' ? 'तक्रार नोंदवली गेली!' : lang === 'hi' ? 'शिकायत दर्ज की गई!' : 'Dispute filed successfully!');
                  setDisputeModalOpen(false);
                }}
                className="px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {content.submitDispute}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
