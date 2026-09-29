import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Gift,
  TreePine,
  CloudRain,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_EPOINTS_REWARDS } from '../../data/mockData';

interface EPointsViewProps {
  lang: Language;
}

export const EPointsView: React.FC<EPointsViewProps> = ({ lang }) => {
  const [points, setPoints] = useState(840);
  const [redeemedId, setRedeemedId] = useState<string | null>(null);

  const content = {
    mr: {
      badge: 'चक्रीय बक्षिसे व ग्रीन इम्पॅक्ट',
      title: 'ई-पॉइंट्स व पर्यावरण प्रभाव लेजर',
      subtitle: 'भंगार पुनर्वापरासाठी मिळवलेले पॉइंट्स डिस्काउंट व्हाउचर्स किंवा झाडे लावण्यासाठी वापरा.',
      balanceTitle: 'सक्रिय ई-पॉइंट्स शिल्लक',
      ptsUnit: 'पॉइंट्स',
      impact1Title: 'जमिनीवर जाणारा कचरा वाचवला',
      impact2Title: 'कार्बन डायऑक्साइड उत्सर्जन घटवले',
      impact3Title: 'झाडे दत्तक घेतली',
      catalogTitle: 'उपलब्ध रिवॉर्ड व्हाउचर्स',
      redeemBtn: 'रिडीम करा',
      redeemedBtn: 'रिडीम केले ✓',
      rewards: [
        { id: 'RWD-1', title: '₹१५० सेंद्रिय किराणा व्हाउचर', brand: 'BigBasket Organic / Nature Basket', pts: 300 },
        { id: 'RWD-2', title: '₹२५० ग्रीन EV प्रवास पास', brand: 'BluSmart EV Cabs & Yulu Bikes', pts: 500 },
        { id: 'RWD-3', title: 'CPCB प्रमाणित ग्रीन सिटीझन वृक्षारोपण', brand: 'महाराष्ट्र शासन व SayTrees', pts: 200 },
        { id: 'RWD-4', title: '₹५०० इको-स्टोअर गिफ्ट कार्ड', brand: 'KabadiwalaGPT सर्कुलर स्टोअर', pts: 900 },
      ],
    },
    hi: {
      badge: 'चक्रीय पुरस्कार व ग्रीन इम्पैक्ट',
      title: 'ई-पॉइंट्स व पर्यावरण प्रभाव लेजर',
      subtitle: 'कबाड़ रिसाइक्लिंग से अर्जित पॉइंट्स को डिस्काउंट वाउचर या पौधारोपण में उपयोग करें।',
      balanceTitle: 'सक्रिय ई-पॉइंट्स बैलेंस',
      ptsUnit: 'पॉइंट्स',
      impact1Title: 'लैंडफिल से बचाया गया कचरा',
      impact2Title: 'CO2 उत्सर्जन कम किया',
      impact3Title: 'पेड़ लगाए गए',
      catalogTitle: 'उपलब्ध रिवॉर्ड वाउचर्स',
      redeemBtn: 'रिडीम करें',
      redeemedBtn: 'रिडीम किया ✓',
      rewards: [
        { id: 'RWD-1', title: '₹150 जैविक किराना वाउचर', brand: 'BigBasket Organic / Nature Basket', pts: 300 },
        { id: 'RWD-2', title: '₹250 ग्रीन EV राइड पास', brand: 'BluSmart EV Cabs & Yulu Bikes', pts: 500 },
        { id: 'RWD-3', title: 'CPCB प्रमाणित ग्रीन सिटीजन वृक्षारोपण', brand: 'महाराष्ट्र सरकार व SayTrees', pts: 200 },
        { id: 'RWD-4', title: '₹500 इको-स्टोर गिफ्ट कार्ड', brand: 'KabadiwalaGPT सर्कुलर स्टोर', pts: 900 },
      ],
    },
    en: {
      badge: 'Circular Rewards & Green Impact',
      title: 'E-Points & Green Impact Ledger',
      subtitle: 'Earned from diverting scrap into certified supply chains. Redeem for eco rewards.',
      balanceTitle: 'Active E-Points Balance',
      ptsUnit: 'Points',
      impact1Title: 'Landfill Diverted',
      impact2Title: 'CO2 Abated',
      impact3Title: 'Trees Planted',
      catalogTitle: 'Available Reward Vouchers',
      redeemBtn: 'Redeem',
      redeemedBtn: 'Redeemed ✓',
      rewards: [
        { id: 'RWD-1', title: '₹150 Off Organic Grocery Voucher', brand: 'BigBasket Organic / Nature Basket', pts: 300 },
        { id: 'RWD-2', title: '₹250 Green Ride Discount Pass', brand: 'BluSmart EV Cabs & Yulu Bikes', pts: 500 },
        { id: 'RWD-3', title: 'CPCB Certified Citizen Tree Certificate', brand: 'SayTrees India & Govt of Maharashtra', pts: 200 },
        { id: 'RWD-4', title: '₹500 EcoStore Gift Card', brand: 'KabadiwalaGPT Circular Store', pts: 900 },
      ],
    },
  }[lang];

  const handleRedeem = (id: string, cost: number) => {
    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setRedeemedId(id);
      alert(lang === 'mr' ? 'व्हाउचर यशस्वीरित्या रिडीम केले! कोड तुमच्या व्हॉट्सअ‍ॅपवर पाठवला आहे.' : lang === 'hi' ? 'वाउचर सफलतापूर्वक रिडीम हुआ! कोड व्हाट्सएप पर भेजा गया।' : 'Reward voucher redeemed successfully! Code sent to your WhatsApp.');
    } else {
      alert(lang === 'mr' ? 'अपुरा ई-पॉइंट्स बॅलन्स आहे.' : lang === 'hi' ? 'अपर्याप्त ई-पॉइंट्स बैलेंस।' : 'Insufficient points.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
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

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-4 flex items-center gap-3 shadow-md shadow-purple-500/20">
            <Award className="w-8 h-8 text-[#e4fb52]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-200">{content.balanceTitle}</p>
              <p className="text-2xl font-extrabold">{points} <span className="text-sm font-semibold">{content.ptsUnit}</span></p>
            </div>
          </div>
        </div>

        {/* 3 Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-100">
          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.impact1Title}</span>
            <p className="text-xl font-extrabold text-slate-900 font-mono">148.5 kg</p>
          </div>
          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.impact2Title}</span>
            <p className="text-xl font-extrabold text-emerald-700 font-mono">96.2 kg CO2</p>
          </div>
          <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
            <span className="text-xs text-purple-700/80 font-semibold">{content.impact3Title}</span>
            <p className="text-xl font-extrabold text-purple-900 font-mono">4 🌲</p>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">{content.catalogTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {content.rewards.map((r) => {
            const isRedeemed = redeemedId === r.id;
            return (
              <div key={r.id} className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">{r.pts} {content.ptsUnit}</span>
                    <Gift className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{r.title}</h4>
                  <p className="text-xs text-purple-700/80 mt-0.5">{r.brand}</p>
                </div>
                <button
                  disabled={points < r.pts || isRedeemed}
                  onClick={() => handleRedeem(r.id, r.pts)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isRedeemed
                      ? 'bg-emerald-100 text-emerald-800'
                      : points >= r.pts
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 opacity-60'
                  }`}
                >
                  {isRedeemed ? content.redeemedBtn : content.redeemBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
