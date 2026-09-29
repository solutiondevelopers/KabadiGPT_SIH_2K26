import React from 'react';
import {
  FileText,
  Download,
  Share2,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Building2,
  Calendar,
  Network,
  Award,
} from 'lucide-react';
import { Language } from '../../types';

interface DigitalBillsViewProps {
  lang: Language;
  onNavigateToJourney?: () => void;
}

export const DigitalBillsView: React.FC<DigitalBillsViewProps> = ({
  lang,
  onNavigateToJourney,
}) => {
  const content = {
    mr: {
      badge: 'शासकीय प्रमाणित डिजिटल कर पावती',
      title: 'डिजिटल इनव्हॉइस व बॅच मॅनिफेस्ट',
      downloadPdf: 'पीडीएफ डाउनलोड करा',
      shareBtn: 'शेअर करा',
      appSubtitle: 'महाराष्ट्र चक्रीय कचरा व्यवस्थापन व ट्रेसेबिलिटी रजिस्ट्री',
      paidBadge: 'UPI द्वारे पूर्ण भरणा',
      invoiceNo: 'पावती #KAB-2026-0891',
      dateText: 'तारीख: २७ सप्टेंबर २०२६ • ११:३२ AM',
      customerLabel: 'ग्राहक / विक्रेता:',
      collectorLabel: 'प्रमाणित कबाडीवाला (संग्राहक):',
      tableItem: 'साहित्य व तपशील',
      tableRate: 'हमीभाव दर',
      tableWeight: 'वजन (किलो)',
      tableAmount: 'रक्कम',
      item1: 'जुनी रद्दी वर्तमानपत्रे (Newsprint Bales)',
      item2: 'लोखंड भंगार (Heavy Melting Scrap HMS-1)',
      item3: 'PET प्लास्टिक बाटल्या (Clean Crushed)',
      subtotal: 'उपएकूण:',
      serviceFee: 'प्लॅटफॉर्म व पिकअप शुल्क:',
      freeZero: 'मोफत (₹०.००)',
      totalPaid: 'एकूण जमा झालेली रक्कम:',
      pointsBonus: '+८५ ग्रीन ई-पॉइंट्स जमा झाले!',
      viewJourneyBtn: 'या कचऱ्याचा संपूर्ण प्रवास (ट्रेसेबिलिटी) पाहा',
      tamperSealText: 'डिजिटल कस्टडी सील #TS-9924-MH • ब्लॉकचेन हॅश प्रमाणित',
    },
    hi: {
      badge: 'सरकारी प्रमाणित डिजिटल टैक्स रसीद',
      title: 'डिजिटल इनवॉइस व बैच मैनिफेस्ट',
      downloadPdf: 'पीडीएफ डाउनलोड करें',
      shareBtn: 'शेयर करें',
      appSubtitle: 'महाराष्ट्र चक्रीय अपशिष्ट प्रबंधन व ट्रेसेबिलिटी रजिस्ट्री',
      paidBadge: 'UPI द्वारा सफल भुगतान',
      invoiceNo: 'रसीद #KAB-2026-0891',
      dateText: 'दिनांक: 27 सितंबर 2026 • 11:32 AM',
      customerLabel: 'ग्राहक / विक्रेता:',
      collectorLabel: 'सत्यापित कबाड़ीवाला (संग्राहक):',
      tableItem: 'सामग्री विवरण',
      tableRate: 'सरकारी दर',
      tableWeight: 'भार (किग्रा)',
      tableAmount: 'राशि',
      item1: 'पुराना रद्दी अखबार (Newsprint Bales)',
      item2: 'लोहा कबाड़ (Heavy Melting Scrap HMS-1)',
      item3: 'PET प्लास्टिक बोतलें (Clean Crushed)',
      subtotal: 'उप-योग:',
      serviceFee: 'प्लेटफॉर्म व पिकअप शुल्क:',
      freeZero: 'निःशुल्क (₹0.00)',
      totalPaid: 'कुल प्राप्त राशि:',
      pointsBonus: '+85 ग्रीन ई-पॉइंट्स खाते में जुड़े!',
      viewJourneyBtn: 'इस कबाड़ की पूरी यात्रा (ट्रेसेबिलिटी) देखें',
      tamperSealText: 'डिजिटल कस्टडी सील #TS-9924-MH • ब्लॉकचेन हैश सत्यापित',
    },
    en: {
      badge: 'Certified Tax Receipt',
      title: 'Digital Invoice & Manifest',
      downloadPdf: 'Download PDF',
      shareBtn: 'Share',
      appSubtitle: 'Maharashtra Circular Waste & Traceability Registry',
      paidBadge: 'PAID VIA UPI',
      invoiceNo: 'Invoice #KAB-2026-0891',
      dateText: 'Date: 27 Sep 2026 • 11:32 AM',
      customerLabel: 'Customer / Seller:',
      collectorLabel: 'Certified Collector:',
      tableItem: 'Material Description',
      tableRate: 'Spot Rate',
      tableWeight: 'Weight (kg)',
      tableAmount: 'Amount',
      item1: 'Old Newspaper (Newsprint Bales)',
      item2: 'Iron Scrap (Heavy Melting Scrap HMS-1)',
      item3: 'PET Plastic Bottles (Clean Crushed)',
      subtotal: 'Subtotal:',
      serviceFee: 'Platform & Doorstep Handling Fee:',
      freeZero: 'FREE (₹0.00)',
      totalPaid: 'Total Payout Received:',
      pointsBonus: '+85 Green E-Points Credited!',
      viewJourneyBtn: 'View Waste Journey & Traceability',
      tamperSealText: 'Digital Tamper-Proof Seal #TS-9924-MH • Blockchain Hash Verified',
    },
  }[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Top Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            {content.badge}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {content.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(lang === 'mr' ? 'पीडीएफ पावती डाउनलोड झाली.' : lang === 'hi' ? 'पीडीएफ रसीद डाउनलोड हुई।' : 'PDF Bill downloaded.')}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{content.downloadPdf}</span>
          </button>
          <button
            onClick={() => alert(lang === 'mr' ? 'व्हॉट्सअ‍ॅपवर पावती पाठवली.' : lang === 'hi' ? 'व्हाट्सएप पर रसीद भेजी गई।' : 'Receipt shared via WhatsApp.')}
            className="px-4 py-2 bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>{content.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Official Digital Invoice Card */}
      <div className="bg-white/95 backdrop-blur-md border border-purple-200/80 rounded-3xl p-6 sm:p-8 shadow-sm shadow-purple-500/5 space-y-6 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-purple-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-purple-500/20">
              K
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Kabadiwala<span className="text-purple-600">GPT</span>
              </h3>
              <p className="text-xs text-purple-700/80 font-medium">
                {content.appSubtitle}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                GSTIN: 27AABCK9921E1ZQ • MPCB Auth #MH-PWM-2026-992
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
              {content.paidBadge}
            </span>
            <p className="text-xs font-mono font-bold text-slate-900">
              {content.invoiceNo}
            </p>
            <p className="text-[11px] text-slate-500">
              {content.dateText}
            </p>
          </div>
        </div>

        {/* Parties Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/60 border border-purple-200 rounded-2xl p-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-purple-900/60 uppercase tracking-wider text-[10px]">
              {content.customerLabel}
            </span>
            <p className="font-bold text-slate-900">Anand Deshmukh</p>
            <p className="text-slate-600">B-402, Rohan Nilay, Aundh, Pune - 411007</p>
            <p className="text-purple-700 font-mono">Phone: +91 98220 14829</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-purple-900/60 uppercase tracking-wider text-[10px]">
              {content.collectorLabel}
            </span>
            <p className="font-bold text-slate-900">Ramesh Shinde (Badge #408)</p>
            <p className="text-slate-600">Piaggio EV Loader (MH-12-RN-4890)</p>
            <p className="text-purple-700 font-mono">Aundh Ward Micro-Hub #4</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto border border-purple-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/80 text-purple-900 font-bold uppercase border-b border-purple-200 text-[11px]">
              <tr>
                <th className="p-3">{content.tableItem}</th>
                <th className="p-3">{content.tableRate}</th>
                <th className="p-3">{content.tableWeight}</th>
                <th className="p-3 text-right">{content.tableAmount}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 bg-white font-medium">
              <tr>
                <td className="p-3 text-slate-900 font-semibold">{content.item1}</td>
                <td className="p-3 font-mono">₹14.00 / kg</td>
                <td className="p-3 font-mono">15.2 kg</td>
                <td className="p-3 text-right font-mono font-bold text-purple-900">₹212.80</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-900 font-semibold">{content.item2}</td>
                <td className="p-3 font-mono">₹30.00 / kg</td>
                <td className="p-3 font-mono">13.2 kg</td>
                <td className="p-3 text-right font-mono font-bold text-purple-900">₹396.00</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-900 font-semibold">{content.item3}</td>
                <td className="p-3 font-mono">₹18.00 / kg</td>
                <td className="p-3 font-mono">3.8 kg</td>
                <td className="p-3 text-right font-mono font-bold text-purple-900">₹68.40</td>
              </tr>
            </tbody>
            <tfoot className="bg-purple-50/70 border-t border-purple-200 text-xs">
              <tr>
                <td colSpan={3} className="p-3 font-semibold text-slate-600 text-right">{content.subtotal}</td>
                <td className="p-3 text-right font-mono font-bold text-slate-900">₹677.20</td>
              </tr>
              <tr>
                <td colSpan={3} className="p-3 font-semibold text-slate-600 text-right">{content.serviceFee}</td>
                <td className="p-3 text-right font-semibold text-emerald-600">{content.freeZero}</td>
              </tr>
              <tr className="border-t-2 border-purple-200 text-sm font-extrabold text-slate-900 bg-purple-100/50">
                <td colSpan={3} className="p-3 text-right text-purple-950">{content.totalPaid}</td>
                <td className="p-3 text-right font-mono text-purple-700 text-base">₹677.20</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* E-Points Bonus Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-purple-950">{content.pointsBonus}</p>
              <p className="text-[11px] text-purple-700">{content.tamperSealText}</p>
            </div>
          </div>
        </div>

        {/* Journey Navigation Button */}
        <button
          onClick={() => {
            if (onNavigateToJourney) onNavigateToJourney();
          }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-purple-500/20 cursor-pointer"
        >
          <Network className="w-4 h-4" />
          <span>{content.viewJourneyBtn}</span>
        </button>
      </div>
    </div>
  );
};
