import React, { useState } from 'react';
import {
  Building2,
  Recycle,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';
import { Language } from '../../types';

interface RecyclerOpsViewProps {
  lang: Language;
}

export const RecyclerOpsView: React.FC<RecyclerOpsViewProps> = ({ lang }) => {
  const content = {
    mr: {
      badge: 'अधिकृत औद्योगिक प्रक्रिया केंद्र',
      title: 'इकोप्लास्ट पॉलिमर्स लि. (चाकण MIDC)',
      subtitle: 'CPCB नोंदणी: CPCB-PWM-MH-0921 • मासिक क्षमता: १,२०० टन',
      eprBadge: 'EPR अनुपालित फॅक्टरी',
      pipelineTitle: 'सक्रिय प्रक्रिया पाइपलाइन: लॉट #LOT-PET-PUN-091 (४.८५ टन)',
      stageCurrent: 'टप्पा ४: एक्सट्रूजन',
      stages: [
        { no: 1, title: 'इनटेक तपासणी', desc: 'सील पडताळणी व NIR स्पेक्ट्रो शुद्धता विश्लेषण', done: true },
        { no: 2, title: 'वॉश व श्रेडिंग', desc: 'शून्य-प्रदूषण कॉस्टिक हॉट-वॉश व ऑप्टिकल सॉर्टिंग', done: true },
        { no: 3, title: 'थर्मल एक्सट्रूजन', desc: 'व्हॅक्यूम डिव्होलाटिलायझेशन व ट्विन-स्क्रू कंपाउंडिंग', done: true },
        { no: 4, title: 'पेलेटायझिंग व QA', desc: 'FDA/BIS प्रमाणित फूड-ग्रेड rPET ग्रॅन्यूल्स', done: true, current: true },
        { no: 5, title: 'EPR क्रेडिट जारी', desc: 'CPCB पोर्टलवर डिजिटल सर्टिफिकेट जनरेशन', done: false },
      ],
      outputTitle: 'पुनर्प्राप्त कच्चा माल उत्पादन लेजर',
      zeroLandfill: 'शून्य-कचरा प्रमाणपत्र',
      mintEprBtn: 'CPCB EPR क्रेडिट्स जारी करा',
    },
    hi: {
      badge: 'अधिकृत औद्योगिक प्रसंस्करण संयंत्र',
      title: 'इकोप्लास्ट पॉलिमर्स लि. (चाकण MIDC)',
      subtitle: 'CPCB पंजीकरण: CPCB-PWM-MH-0921 • मासिक क्षमता: 1,200 टन',
      eprBadge: 'EPR अनुपालित प्लांट',
      pipelineTitle: 'सक्रिय प्रोसेसिंग पाइपलाइन: लॉट #LOT-PET-PUN-091 (4.85 टन)',
      stageCurrent: 'चरण 4: एक्सट्रूज़न',
      stages: [
        { no: 1, title: 'इनटेक निरीक्षण', desc: 'सील जांच व NIR स्पेक्ट्रो शुद्धता विश्लेषण', done: true },
        { no: 2, title: 'धुलाई व श्रेडिंग', desc: 'शून्य-प्रदूषण कास्टिक हॉट-वॉश व ऑप्टिकल सॉर्टिंग', done: true },
        { no: 3, title: 'थर्मल एक्सट्रूज़न', desc: 'वैक्यूम डिवोलाटिलाइजेशन व कम्पाउंडिंग', done: true },
        { no: 4, title: 'पेलेटाइजिंग व QA', desc: 'FDA/BIS प्रमाणित फूड-ग्रेड rPET ग्रैन्यूल्स', done: true, current: true },
        { no: 5, title: 'EPR क्रेडिट जारी', desc: 'CPCB पोर्टल पर डिजिटल सर्टिफिकेट जनरेशन', done: false },
      ],
      outputTitle: 'पुनर्चक्रित कच्चा माल उत्पादन लेजर',
      zeroLandfill: 'शून्य-कचरा प्रमाणन',
      mintEprBtn: 'CPCB EPR क्रेडिट जारी करें',
    },
    en: {
      badge: 'Authorized Industrial Processor',
      title: 'EcoPlast Polymers Ltd (Chakan MIDC)',
      subtitle: 'CPCB Registration: CPCB-PWM-MH-0921 • Monthly Capacity: 1,200 Tons',
      eprBadge: 'EPR Compliant Facility',
      pipelineTitle: 'Active Processing Pipeline: Lot #LOT-PET-PUN-091 (4.85 Tons)',
      stageCurrent: 'Stage 4: Extrusion',
      stages: [
        { no: 1, title: 'Intake Inspection', desc: 'Seal check & NIR spectro purity analysis', done: true },
        { no: 2, title: 'Wash & Shred', desc: 'Zero-effluent caustic hot-wash & optical sorting', done: true },
        { no: 3, title: 'Thermal Extrusion', desc: 'Vacuum devolatilization & twin-screw compounding', done: true },
        { no: 4, title: 'Pelletizing & QA', desc: 'Food-grade rPET granules certified by FDA/BIS', done: true, current: true },
        { no: 5, title: 'EPR Credit Minting', desc: 'CPCB Portal digital certificate generation', done: false },
      ],
      outputTitle: 'Recovered Raw Material Output Ledger (This Cycle)',
      zeroLandfill: 'Zero-Landfill Certification',
      mintEprBtn: 'Mint CPCB EPR Certificate',
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

          <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
            <Award className="w-4 h-4 text-purple-600" />
            <span>{content.eprBadge}</span>
          </div>
        </div>
      </div>

      {/* 5-Stage Processing Pipeline */}
      <div className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {content.pipelineTitle}
          </h3>
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">
            {content.stageCurrent}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {content.stages.map((st) => (
            <div
              key={st.no}
              className={`p-3 rounded-xl border text-xs space-y-1 ${
                st.current
                  ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                  : st.done
                  ? 'bg-white border-purple-200 text-slate-700'
                  : 'bg-white border-purple-100 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Stage {st.no}</span>
                {st.done && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
              </div>
              <p className="font-bold text-slate-900">{st.title}</p>
              <p className="text-[11px] text-purple-700/80 leading-snug">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recovered Materials Ledger */}
      <div className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {content.outputTitle}
          </h3>
          <span className="text-xs text-purple-700/80 font-medium">{content.zeroLandfill}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1 text-xs">
            <span className="text-purple-700/80 font-medium">Food-Grade rPET Granules:</span>
            <div className="text-lg font-bold font-mono text-purple-900">4,620 kg (95.3% Yield)</div>
          </div>
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1 text-xs">
            <span className="text-purple-700/80 font-medium">Water & Residue Recovered:</span>
            <div className="text-lg font-bold font-mono text-slate-700">230 kg (Effluent Recycled)</div>
          </div>
          <div className="p-3.5 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1 text-xs">
            <span className="text-purple-700/80 font-medium">CPCB EPR Certificate:</span>
            <div className="text-sm font-bold font-mono text-emerald-700">#CPCB-2026-PET-8819</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => alert(lang === 'mr' ? 'EPR डिजिटल प्रमाणपत्र CPCB पोर्टलवर जनरेट झाले!' : lang === 'hi' ? 'EPR डिजिटल सर्टिफिकेट CPCB पोर्टल पर जारी हुआ!' : 'EPR Certificate minted!')}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            {content.mintEprBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
