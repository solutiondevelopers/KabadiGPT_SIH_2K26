import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  ArrowRight,
  Hammer,
  TreePine,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_UPCYCLING_PROJECTS } from '../../data/mockData';

interface WasteToBestViewProps {
  lang: Language;
}

export const WasteToBestView: React.FC<WasteToBestViewProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const content = {
    mr: {
      badge: 'सर्कुलर अपसायकलिंग स्टुडिओ',
      title: 'वेस्ट-टू-बेस्ट (कचऱ्यातून उत्कृष्ट कलाकृती)',
      subtitle: 'तुमच्या घरातील जुने टायर, ई-कचरा किंवा लोखंडी पाईप्स कुशल कारागिरांकडे पाठवून सुंदर वस्तूंमध्ये रूपांतरित करा.',
      scanTitle: 'एआय अपसायकलिंग डिझाइन जनरेटर',
      scanDesc: 'साहित्याचा फोटो अपलोड करा आणि एआय तुम्हाला शक्य असलेल्या कलाकृती सुचवेल.',
      uploadBtn: 'फोटो अपलोड करा',
      projectsTitle: 'प्रमाणित कारागिरांचे अपसायकलिंग प्रकल्प',
      serviceFee: 'कारागीर शुल्क:',
      estTime: 'अंदाजे वेळ:',
      orderBtn: 'अपसायकलिंग ऑर्डर द्या',
      projects: [
        {
          id: 'UP-1',
          title: 'जुने टायर ➔ सुंदर ऑटोमन स्टूल / कॉफी टेबल',
          input: '२ गाडीचे जुने टायर',
          output: 'सुंदर ज्यूट दोरीने गुंडाळलेला गादी असलेला स्टूल',
          artisan: 'स्वच्छकारीगर स्टुडिओ, पुणे',
          fee: 650,
          days: '४ दिवस',
          impact: '३२ किलो कचरा वाचवला • १४ किलो CO2 घटवला',
        },
        {
          id: 'UP-2',
          title: 'जुने मदरबोर्ड व कीबोर्ड ➔ सायबरपंक टेबल घड्याळ',
          input: '१ संगणक मदरबोर्ड / २ जुने लॅपटॉप',
          output: 'रेझिन डिझाइन क्वार्ट्ज घड्याळ व कोस्टर्स',
          artisan: 'ई-आर्टिसन लॅब, बंगळुरू',
          fee: 480,
          days: '३ दिवस',
          impact: '१.८ किलो ई-कचऱ्याचे सुरक्षित अपसायकलिंग',
        },
        {
          id: 'UP-3',
          title: 'लोखंडी ग्रिल्स व पाईप्स ➔ जिओमेट्रिक फ्लॉवर स्टँड',
          input: '१०-१५ किलो लोखंडी पट्ट्या/ग्रिल्स',
          output: 'पावडर-कोटेड अँटी-रस्ट ३-मजली फ्लॉवर स्टँड',
          artisan: 'महाराष्ट्र मेटल क्राफ्टर्स, पुणे MIDC',
          fee: 550,
          days: '५ दिवस',
          impact: '१८ किलो लोखंडाचा पुनर्वापर',
        },
      ],
    },
    hi: {
      badge: 'सर्कुलर अपसाइक्लिंग स्टूडियो',
      title: 'वेस्ट-टू-बेस्ट (कचरे से अनुपम कृति)',
      subtitle: 'अपने पुराने टायर, ई-कचरा या लोहे के पाइप्स को कुशल कारीगरों द्वारा सुंदर उपयोगी वस्तुओं में बदलें।',
      scanTitle: 'एआई अपसाइक्लिंग डिजाइन जनरेटर',
      scanDesc: 'सामग्री की फोटो अपलोड करें और एआई आपको बेहतरीन विकल्प सुझाएगा।',
      uploadBtn: 'फोटो अपलोड करें',
      projectsTitle: 'सत्यापित कारीगरों के अपसाइक्लिंग प्रोजेक्ट्स',
      serviceFee: 'कारीगर शुल्क:',
      estTime: 'अनुमानित समय:',
      orderBtn: 'अपसाइक्लिंग ऑर्डर दें',
      projects: [
        {
          id: 'UP-1',
          title: 'पुराने टायर ➔ स्टाइलिश ओटोमन स्टूल / कॉफी टेबल',
          input: '2 पुराने रबर टायर',
          output: 'जूट रस्सी व कुशन से बना प्रीमियम स्टूल',
          artisan: 'स्वच्छकारीगर स्टूडियो, पुणे',
          fee: 650,
          days: '4 दिन',
          impact: '32 किग्रा कचरा लैंडफिल से बचाया',
        },
        {
          id: 'UP-2',
          title: 'पुराने मदरबोर्ड व कीबोर्ड ➔ टेबल घड़ी व कोस्टर्स',
          input: '1 कंप्यूटर मदरबोर्ड / 2 लैपटॉप',
          output: 'रेसिन क्वार्ट्ज घड़ी व 4 कोस्टर्स',
          artisan: 'ई-आर्टिसन लैब, बेंगलुरु',
          fee: 480,
          days: '3 दिन',
          impact: '1.8 किग्रा हानिकारक ई-कचरा सुरक्षित',
        },
        {
          id: 'UP-3',
          title: 'लोहे की ग्रिल्स व पाइप्स ➔ ज्यामितीय गार्डन प्लांट स्टैंड',
          input: '10-15 किग्रा लोहा कबाड़',
          output: 'पाउडर कोटेड 3-टियर प्लांट स्टैंड',
          artisan: 'महाराष्ट्र मेटल क्राफ्टर्स, पुणे',
          fee: 550,
          days: '5 दिन',
          impact: '18 किग्रा लोहे का पुनर्चक्रण',
        },
      ],
    },
    en: {
      badge: 'Circular Upcycling Studio',
      title: 'Waste-to-Best Upcycling Studio',
      subtitle: 'Turn discarded tyres, e-waste, and metal pipes into bespoke home decor crafted by verified artisans.',
      scanTitle: 'Instant AI Upcycling Designer',
      scanDesc: 'Upload a picture of raw scrap to get generative DIY & artisan fabrication concepts.',
      uploadBtn: 'Upload Scrap Photo',
      projectsTitle: 'Verified Artisan Upcycling Projects',
      serviceFee: 'Craftsman Fee:',
      estTime: 'Est. Turnaround:',
      orderBtn: 'Order Upcycling Pickup',
      projects: [
        {
          id: 'UP-1',
          title: 'Discarded Tyres ➔ Modern Ottoman Seater / Table',
          input: '2 Car / Scooter Tyres',
          output: 'Upholstered Round Seater with Braided Jute Rope',
          artisan: 'SwachhKarigar Upcycling Studio, Pune',
          fee: 650,
          days: '4 days',
          impact: '32 kg Landfill Diversion • 14 kg CO2 Abated',
        },
        {
          id: 'UP-2',
          title: 'Old Motherboards ➔ Cyberpunk Quartz Desk Clock',
          input: '1 Desktop Motherboard or 2 Laptops',
          output: 'Quartz Desk Clock + 4 Bio-Resin Circuit Coasters',
          artisan: 'E-Artisan Circular Lab, Bangalore',
          fee: 480,
          days: '3 days',
          impact: '1.8 kg Hazardous E-Waste Diverted Safely',
        },
        {
          id: 'UP-3',
          title: 'Metal Scrap Grills ➔ Botanical Garden Planter Stand',
          input: '10-15 kg Mild Steel Bars / Grills',
          output: 'Powder-Coated Tiered Botanical Plant Stand',
          artisan: 'Maharashtra Metal Crafters Hub, Pune',
          fee: 550,
          days: '5 days',
          impact: '18 kg Iron Re-purposed with zero foundry emissions',
        },
      ],
    },
  }[lang];

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

          <button
            onClick={() => alert(lang === 'mr' ? 'कॅमेरा सुरू करत आहे...' : lang === 'hi' ? 'कैमरा शुरू हो रहा है...' : 'Opening camera...')}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Camera className="w-4 h-4" />
            <span>{content.uploadBtn}</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">{content.projectsTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.projects.map((p) => (
            <div key={p.id} className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">{p.days}</span>
                  <Hammer className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{p.title}</h4>
                <div className="p-2.5 bg-purple-50/60 border border-purple-100 rounded-xl text-[11px] space-y-1">
                  <p><span className="font-bold text-purple-900/70">Input:</span> {p.input}</p>
                  <p><span className="font-bold text-purple-900/70">Artisan:</span> {p.artisan}</p>
                </div>
                <p className="text-[10px] text-emerald-700 font-semibold">{p.impact}</p>
              </div>

              <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-700/80 font-medium">{content.serviceFee}</span>
                  <p className="text-sm font-extrabold text-purple-900 font-mono">₹{p.fee}</p>
                </div>
                <button
                  onClick={() => alert(lang === 'mr' ? 'अपसायकलिंग ऑर्डर बुक केली!' : lang === 'hi' ? 'अपसाइक्लिंग ऑर्डर बुक हुआ!' : 'Upcycling order placed!')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  {content.orderBtn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
